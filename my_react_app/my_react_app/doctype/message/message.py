# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import frappe
from frappe.model.document import Document
from frappe.utils import now


class Message(Document):
	def before_insert(self):
		if not self.created_at:
			self.created_at = now()
		if not self.sender:
			self.sender = frappe.session.user
		if self.chat:
			# Check if this will be the first message in the chat
			# Use cached query for better performance
			existing_count = frappe.db.count("Message", {"chat": self.chat}, cache=True)
			self._is_first_message = (existing_count == 0)
		else:
			self._is_first_message = False
	
	def after_insert(self):
		"""Trigger webhook when message is created (asynchronously)"""
		try:
			from my_react_app.my_react_app.utils.n8n_webhooks import trigger_message_created_webhook, trigger_start_chat_webhook
			# Enqueue webhooks as background jobs to avoid blocking the response
			message_name = self.name
			is_first = getattr(self, '_is_first_message', False)
			
			# Always trigger message created webhook (async)
			frappe.enqueue(
				trigger_message_created_webhook,
				message_name=message_name,
				queue='short',
				timeout=300,
				now=False
			)
			
			# If first message, also trigger start chat webhook (async)
			if is_first:
				frappe.enqueue(
					trigger_start_chat_webhook,
					message_name=message_name,
					queue='short',
					timeout=300,
					now=False
				)
		except Exception as e:
			frappe.logger().error(f"Failed to enqueue message webhooks: {str(e)}")
	
	def on_update(self):
		"""Trigger webhook when message is updated (asynchronously)"""
		try:
			from my_react_app.my_react_app.utils.n8n_webhooks import trigger_message_updated_webhook
			# Enqueue webhook as background job to avoid blocking
			frappe.enqueue(
				trigger_message_updated_webhook,
				message_name=self.name,
				queue='short',
				timeout=300,
				now=False
			)
		except Exception as e:
			frappe.logger().error(f"Failed to enqueue message updated webhook: {str(e)}")


@frappe.whitelist()
def create_message(chat, content, message_type="User", sender=None):
	"""Create a new message in a chat"""
	if not sender:
		sender = frappe.session.user
	
	message = frappe.get_doc({
		"doctype": "Message",
		"chat": chat,
		"content": content,
		"sender": sender,
		"message_type": message_type
	})
	message.insert(ignore_permissions=True)
	return message.as_dict()


@frappe.whitelist()
def get_messages(chat):
	"""Get all messages for a chat"""
	messages = frappe.get_all(
		"Message",
		filters={"chat": chat},
		fields=["name", "content", "sender", "message_type", "created_at"],
		order_by="created_at asc"
	)
	return messages

