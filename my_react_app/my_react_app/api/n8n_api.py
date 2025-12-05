# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import base64
import frappe
from frappe import _
from frappe.utils.password import get_decrypted_password


def validate_basic_auth():
	"""Validate Basic Authentication from request headers"""
	auth_header = frappe.get_request_header("Authorization")
	
	if not auth_header or not auth_header.startswith("Basic "):
		frappe.throw(_("Basic Authentication is required"), frappe.AuthenticationError)
	
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n:
		frappe.throw(_("n8n integration is not enabled"), frappe.PermissionError)
	
	if not settings.basic_auth_username or not settings.basic_auth_password:
		frappe.throw(_("Basic Authentication is not configured in n8n Settings"), frappe.AuthenticationError)
	
	# Extract credentials from Authorization header
	try:
		encoded_credentials = auth_header.replace("Basic ", "")
		decoded_credentials = base64.b64decode(encoded_credentials).decode()
		username, password = decoded_credentials.split(":", 1)
	except Exception:
		frappe.throw(_("Invalid Basic Authentication format"), frappe.AuthenticationError)
	
	# Get decrypted password from settings
	decrypted_password = get_decrypted_password("n8n Settings", settings.name, "basic_auth_password")
	
	# Validate credentials
	if settings.basic_auth_username != username:
		frappe.throw(_("Invalid username"), frappe.AuthenticationError)
	
	if decrypted_password != password:
		frappe.throw(_("Invalid password"), frappe.AuthenticationError)
	
	return True


@frappe.whitelist(allow_guest=True)
def n8n_create_chat(title, user=None, description=None):
	"""Create a chat via n8n (with Basic Authentication)"""
	validate_basic_auth()
	
	from my_react_app.my_react_app.doctype.chat.chat import create_chat
	
	return create_chat(title=title, user=user, description=description)


@frappe.whitelist(allow_guest=True)
def n8n_get_chats(user=None):
	"""Get chats via n8n (with Basic Authentication)"""
	validate_basic_auth()
	
	from my_react_app.my_react_app.doctype.chat.chat import get_chats
	
	return get_chats(user=user)


@frappe.whitelist(allow_guest=True)
def n8n_get_chat(chat_name):
	"""Get a specific chat via n8n (with Basic Authentication)"""
	validate_basic_auth()
	
	from my_react_app.my_react_app.doctype.chat.chat import get_chat
	
	return get_chat(chat_name=chat_name)


@frappe.whitelist(allow_guest=True)
def n8n_update_chat_status(chat_name, status):
	"""Update chat status via n8n (with Basic Authentication)"""
	validate_basic_auth()
	
	from my_react_app.my_react_app.doctype.chat.chat import update_chat_status
	
	return update_chat_status(chat_name=chat_name, status=status)


@frappe.whitelist(allow_guest=True)
def n8n_update_chat_title(chat_name, title):
	"""Update chat title via n8n (with Basic Authentication)"""
	validate_basic_auth()
	
	from my_react_app.my_react_app.doctype.chat.chat import update_chat_title
	
	return update_chat_title(chat_name=chat_name, title=title)


@frappe.whitelist(allow_guest=True)
def n8n_create_message(chat, content, message_type="User", sender=None):
	"""Create a message via n8n (with Basic Authentication)"""
	validate_basic_auth()
	
	from my_react_app.my_react_app.doctype.message.message import create_message
	
	return create_message(chat=chat, content=content, message_type=message_type, sender=sender)


@frappe.whitelist(allow_guest=True)
def n8n_get_messages(chat):
	"""Get messages via n8n (with Basic Authentication)"""
	validate_basic_auth()
	
	from my_react_app.my_react_app.doctype.message.message import get_messages
	
	return get_messages(chat=chat)


@frappe.whitelist(allow_guest=True)
def n8n_health_check():
	"""Health check endpoint for n8n"""
	validate_basic_auth()
	
	return {
		"status": "ok",
		"message": "n8n integration is active",
		"site": frappe.local.site
	}

