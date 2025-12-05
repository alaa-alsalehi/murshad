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
		# Update chat's updated_at when a new message is added
		if self.chat:
			chat = frappe.get_doc("Chat", self.chat)
			chat.updated_at = now()
			chat.save(ignore_permissions=True)
			
			# Check if this will be the first message in the chat
			existing_count = frappe.db.count("Message", {"chat": self.chat})
			self._is_first_message = (existing_count == 0)
		else:
			self._is_first_message = False
	
	def after_insert(self):
		"""Trigger webhook when message is created"""
		try:
			from my_react_app.my_react_app.utils.n8n_webhooks import trigger_message_created_webhook, trigger_start_chat_webhook
			# Check if this is the first message (start chat)
			if getattr(self, '_is_first_message', False):
				trigger_start_chat_webhook(self)
			# Always trigger message created webhook
			trigger_message_created_webhook(self)
		except Exception as e:
			frappe.logger().error(f"Failed to trigger message webhooks: {str(e)}")
	
	def on_update(self):
		"""Trigger webhook when message is updated"""
		try:
			from my_react_app.my_react_app.utils.n8n_webhooks import trigger_message_updated_webhook
			trigger_message_updated_webhook(self)
		except Exception as e:
			frappe.logger().error(f"Failed to trigger message updated webhook: {str(e)}")


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

