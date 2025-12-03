# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import frappe
from frappe import _
from frappe.utils.password import get_decrypted_password


def validate_api_key():
	"""Validate API key from request headers"""
	api_key = frappe.get_request_header("X-API-Key")
	api_secret = frappe.get_request_header("X-API-Secret")
	
	if not api_key:
		frappe.throw(_("API Key is required"), frappe.AuthenticationError)
	
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n:
		frappe.throw(_("n8n integration is not enabled"), frappe.PermissionError)
	
	if settings.api_key != api_key:
		frappe.throw(_("Invalid API Key"), frappe.AuthenticationError)
	
	if api_secret:
		decrypted_secret = settings.get_api_secret()
		if decrypted_secret and decrypted_secret != api_secret:
			frappe.throw(_("Invalid API Secret"), frappe.AuthenticationError)
	
	return True


@frappe.whitelist(allow_guest=True)
def n8n_create_chat(title, user=None, description=None):
	"""Create a chat via n8n (with API key authentication)"""
	validate_api_key()
	
	from my_react_app.my_react_app.doctype.chat.chat import create_chat
	
	return create_chat(title=title, user=user, description=description)


@frappe.whitelist(allow_guest=True)
def n8n_get_chats(user=None):
	"""Get chats via n8n (with API key authentication)"""
	validate_api_key()
	
	from my_react_app.my_react_app.doctype.chat.chat import get_chats
	
	return get_chats(user=user)


@frappe.whitelist(allow_guest=True)
def n8n_get_chat(chat_name):
	"""Get a specific chat via n8n (with API key authentication)"""
	validate_api_key()
	
	from my_react_app.my_react_app.doctype.chat.chat import get_chat
	
	return get_chat(chat_name=chat_name)


@frappe.whitelist(allow_guest=True)
def n8n_update_chat_status(chat_name, status):
	"""Update chat status via n8n (with API key authentication)"""
	validate_api_key()
	
	from my_react_app.my_react_app.doctype.chat.chat import update_chat_status
	
	return update_chat_status(chat_name=chat_name, status=status)


@frappe.whitelist(allow_guest=True)
def n8n_update_chat_title(chat_name, title):
	"""Update chat title via n8n (with API key authentication)"""
	validate_api_key()
	
	from my_react_app.my_react_app.doctype.chat.chat import update_chat_title
	
	return update_chat_title(chat_name=chat_name, title=title)


@frappe.whitelist(allow_guest=True)
def n8n_create_message(chat, content, message_type="User", sender=None):
	"""Create a message via n8n (with API key authentication)"""
	validate_api_key()
	
	from my_react_app.my_react_app.doctype.message.message import create_message
	
	return create_message(chat=chat, content=content, message_type=message_type, sender=sender)


@frappe.whitelist(allow_guest=True)
def n8n_get_messages(chat):
	"""Get messages via n8n (with API key authentication)"""
	validate_api_key()
	
	from my_react_app.my_react_app.doctype.message.message import get_messages
	
	return get_messages(chat=chat)


@frappe.whitelist(allow_guest=True)
def n8n_health_check():
	"""Health check endpoint for n8n"""
	validate_api_key()
	
	return {
		"status": "ok",
		"message": "n8n integration is active",
		"site": frappe.local.site
	}

