# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import frappe
from frappe.model.document import Document
from frappe.utils import now


class Chat(Document):
	def before_insert(self):
		if not self.created_at:
			self.created_at = now()
		if not self.updated_at:
			self.updated_at = now()

	def before_save(self):
		self.updated_at = now()


@frappe.whitelist()
def create_chat(title, user=None, description=None):
	"""Create a new chat"""
	if not user:
		user = frappe.session.user
	
	chat = frappe.get_doc({
		"doctype": "Chat",
		"title": title,
		"user": user,
		"status": "Active",
		"description": description
	})
	chat.insert(ignore_permissions=True)
	return chat.as_dict()


@frappe.whitelist()
def get_chats(user=None):
	"""Get all chats for a user"""
	if not user:
		user = frappe.session.user
	
	chats = frappe.get_all(
		"Chat",
		filters={"user": user},
		fields=["name", "title", "status", "created_at", "updated_at", "description"],
		order_by="updated_at desc"
	)
	return chats


@frappe.whitelist()
def get_chat(chat_name):
	"""Get a specific chat with its messages"""
	chat = frappe.get_doc("Chat", chat_name)
	
	# Get messages for this chat
	messages = frappe.get_all(
		"Message",
		filters={"chat": chat_name},
		fields=["name", "content", "sender", "message_type", "created_at"],
		order_by="created_at asc"
	)
	
	return {
		"chat": chat.as_dict(),
		"messages": messages
	}


@frappe.whitelist()
def update_chat_status(chat_name, status):
	"""Update chat status"""
	chat = frappe.get_doc("Chat", chat_name)
	chat.status = status
	chat.save(ignore_permissions=True)
	return chat.as_dict()


@frappe.whitelist()
def update_chat_title(chat_name, title):
	"""Update chat title"""
	chat = frappe.get_doc("Chat", chat_name)
	chat.title = title
	chat.save(ignore_permissions=True)
	return chat.as_dict()

