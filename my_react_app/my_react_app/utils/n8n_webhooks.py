# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import json
import time
import base64
import frappe
from frappe import _
from frappe.utils import get_request_session
from frappe.utils.password import get_decrypted_password


def send_webhook_to_n8n(webhook_url, data, event_type=None):
	"""
	Send webhook to n8n
	
	Args:
		webhook_url: The n8n webhook URL
		data: Dictionary containing the data to send
		event_type: Type of event (e.g., 'chat.created', 'message.created')
	"""
	if not webhook_url:
		return
	
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n:
		return
	
	# Prepare payload
	payload = {
		"event_type": event_type,
		"data": data,
		"timestamp": frappe.utils.now(),
		"site": frappe.local.site
	}
	
	# Prepare headers
	headers = {
		"Content-Type": "application/json",
		"User-Agent": "Frappe-n8n-Integration/1.0"
	}
	
	# Prepare Basic Auth
	auth = None
	if settings.basic_auth_username and settings.basic_auth_password:
		password = get_decrypted_password("n8n Settings", settings.name, "basic_auth_password")
		if password:
			credentials = f"{settings.basic_auth_username}:{password}"
			encoded_credentials = base64.b64encode(credentials.encode()).decode()
			headers["Authorization"] = f"Basic {encoded_credentials}"
	
	timeout = settings.timeout or 30
	retry_attempts = settings.retry_attempts or 3
	
	# Send webhook with retry logic
	session = get_request_session()
	
	for attempt in range(retry_attempts):
		try:
			response = session.post(
				webhook_url,
				json=payload,
				headers=headers,
				timeout=timeout
			)
			response.raise_for_status()
			
			frappe.logger().info(f"Webhook sent successfully to n8n: {event_type}")
			return response
			
		except Exception as e:
			if attempt < retry_attempts - 1:
				frappe.logger().warning(
					f"Webhook attempt {attempt + 1} failed, retrying: {str(e)}"
				)
				time.sleep(2 ** attempt)  # Exponential backoff
			else:
				# Log error to Error Log doctype
				frappe.log_error(
					message=f"Failed to send webhook to n8n after {retry_attempts} attempts.\n"
						f"Webhook URL: {webhook_url}\n"
						f"Event Type: {event_type or 'Unknown'}\n"
						f"Exception: {str(e)}",
					title=f"n8n Webhook Error - {event_type or 'Unknown'}",
					reference_doctype="n8n Settings",
					reference_name=settings.name if hasattr(settings, 'name') else None
				)
				# Don't raise exception to prevent blocking the main operation
				return None
	
	return None


def trigger_chat_created_webhook(chat_doc):
	"""Trigger webhook when a chat is created"""
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n or not settings.chat_webhook_url:
		return
	
	data = {
		"name": chat_doc.name,
		"title": chat_doc.title,
		"user": chat_doc.user,
		"status": chat_doc.status,
		"description": chat_doc.description,
		"created_at": str(chat_doc.created_at) if chat_doc.created_at else None,
		"updated_at": str(chat_doc.updated_at) if chat_doc.updated_at else None
	}
	
	send_webhook_to_n8n(settings.chat_webhook_url, data, "chat.created")


def trigger_chat_updated_webhook(chat_doc):
	"""Trigger webhook when a chat is updated"""
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n or not settings.chat_update_webhook_url:
		return
	
	data = {
		"name": chat_doc.name,
		"title": chat_doc.title,
		"user": chat_doc.user,
		"status": chat_doc.status,
		"description": chat_doc.description,
		"created_at": str(chat_doc.created_at) if chat_doc.created_at else None,
		"updated_at": str(chat_doc.updated_at) if chat_doc.updated_at else None
	}
	
	send_webhook_to_n8n(settings.chat_update_webhook_url, data, "chat.updated")


def trigger_message_created_webhook(message_doc):
	"""Trigger webhook when a message is created"""
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n or not settings.message_webhook_url:
		return
	
	data = {
		"name": message_doc.name,
		"chat": message_doc.chat,
		"content": message_doc.content,
		"sender": message_doc.sender,
		"message_type": message_doc.message_type,
		"created_at": str(message_doc.created_at) if message_doc.created_at else None
	}
	
	send_webhook_to_n8n(settings.message_webhook_url, data, "message.created")


def trigger_message_updated_webhook(message_doc):
	"""Trigger webhook when a message is updated"""
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n or not settings.message_update_webhook_url:
		return
	
	data = {
		"name": message_doc.name,
		"chat": message_doc.chat,
		"content": message_doc.content,
		"sender": message_doc.sender,
		"message_type": message_doc.message_type,
		"created_at": str(message_doc.created_at) if message_doc.created_at else None
	}
	
	send_webhook_to_n8n(settings.message_update_webhook_url, data, "message.updated")


def trigger_start_chat_webhook(message_doc):
	"""Trigger webhook when the first message is created in a chat (start chat)"""
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n or not settings.start_chat_webhook_url:
		return
	
	# Get chat details
	chat = frappe.get_doc("Chat", message_doc.chat)
	
	data = {
		"name": message_doc.name,
		"chat": message_doc.chat,
		"chat_title": chat.title,
		"chat_user": chat.user,
		"chat_status": chat.status,
		"chat_description": chat.description,
		"content": message_doc.content,
		"sender": message_doc.sender,
		"message_type": message_doc.message_type,
		"created_at": str(message_doc.created_at) if message_doc.created_at else None,
		"is_first_message": True
	}
	
	send_webhook_to_n8n(settings.start_chat_webhook_url, data, "start.chat")

@frappe.whitelist()
def test_webhook():
	"""Test webhook connection to n8n"""
	settings = frappe.get_single("n8n Settings")
	
	if not settings.enable_n8n:
		frappe.throw(_("n8n integration is not enabled"))
	
	if not settings.test_webhook_url:
		frappe.throw(_("Test webhook URL is not configured"))
	
	test_data = {
		"test": True,
		"message": "This is a test webhook from Frappe",
		"site": frappe.local.site
	}
	
	# Prepare request details to return
	payload = {
		"event_type": "test",
		"data": test_data,
		"timestamp": frappe.utils.now(),
		"site": frappe.local.site
	}
	
	headers = {
		"Content-Type": "application/json",
		"User-Agent": "Frappe-n8n-Integration/1.0"
	}
	
	# Prepare Basic Auth for request details display
	if settings.basic_auth_username and settings.basic_auth_password:
		password = get_decrypted_password("n8n Settings", settings.name, "basic_auth_password")
		if password:
			credentials = f"{settings.basic_auth_username}:{password}"
			encoded_credentials = base64.b64encode(credentials.encode()).decode()
			headers["Authorization"] = f"Basic {encoded_credentials}"
	
	# Create display headers (hide password in display)
	display_headers = headers.copy()
	if "Authorization" in display_headers:
		display_headers["Authorization"] = "Basic ***hidden***"
	
	request_details = {
		"url": settings.test_webhook_url,
		"method": "POST",
		"headers": display_headers,
		"body": payload
	}
	
	try:
		response = send_webhook_to_n8n(settings.test_webhook_url, test_data, "test")
		
		response_details = None
		if response:
			# Capture response details
			try:
				response_body = response.json()
			except:
				response_body = response.text
			
			response_details = {
				"status_code": response.status_code,
				"headers": dict(response.headers),
				"body": response_body
			}
			
			return {
				"status": "success",
				"message": "Webhook sent successfully",
				"status_code": response.status_code,
				"request": request_details,
				"response": response_details
			}
		else:
			return {
				"status": "error",
				"message": "Failed to send webhook. Please check the webhook URL and n8n configuration.",
				"request": request_details,
				"response": None
			}
	except Exception as e:
		error_message = str(e)
		response_details = None
		
		# Try to extract response details from exception if available
		if hasattr(e, 'response') and e.response is not None:
			try:
				response_body = e.response.json()
			except:
				response_body = e.response.text
			
			response_details = {
				"status_code": e.response.status_code,
				"headers": dict(e.response.headers),
				"body": response_body
			}
		
		# Log error to Error Log doctype
		frappe.log_error(
			message=f"Test webhook failed.\n"
				f"Webhook URL: {settings.test_webhook_url}\n"
				f"Exception: {error_message}",
			title="n8n Test Webhook Error",
			reference_doctype="n8n Settings",
			reference_name=settings.name if hasattr(settings, 'name') else None
		)
		
		# Provide more user-friendly error messages
		if "404" in error_message or "Not Found" in error_message:
			error_message = "Webhook URL not found (404). Please verify the webhook URL in n8n."
		elif "401" in error_message or "403" in error_message:
			error_message = "Authentication failed. Please check your n8n webhook authentication settings."
		elif "timeout" in error_message.lower():
			error_message = "Request timed out. Please check your network connection and n8n server."
		
		return {
			"status": "error",
			"message": error_message,
			"request": request_details,
			"response": response_details
		}


