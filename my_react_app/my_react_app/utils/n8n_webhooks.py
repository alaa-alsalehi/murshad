# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import json
import frappe
from frappe import _
from frappe.utils import get_request_session


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
	
	# Add authentication if API key is set
	if settings.api_key:
		headers["X-API-Key"] = settings.api_key
		if settings.api_secret:
			api_secret = settings.get_api_secret()
			if api_secret:
				headers["X-API-Secret"] = api_secret
	
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
				frappe.utils.sleep(2 ** attempt)  # Exponential backoff
			else:
				frappe.logger().error(
					f"Failed to send webhook to n8n after {retry_attempts} attempts: {str(e)}"
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
	
	response = send_webhook_to_n8n(settings.test_webhook_url, test_data, "test")
	
	if response:
		return {
			"status": "success",
			"message": "Webhook sent successfully",
			"status_code": response.status_code
		}
	else:
		return {
			"status": "error",
			"message": "Failed to send webhook"
		}

