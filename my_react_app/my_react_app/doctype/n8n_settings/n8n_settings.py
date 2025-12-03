# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import frappe
from frappe.model.document import Document
from frappe.utils.password import get_decrypted_password


class N8nSettings(Document):
	def validate(self):
		"""Validate and generate API keys if not set"""
		if self.enable_n8n and not self.api_key:
			self.generate_api_keys()
	
	def generate_api_keys(self):
		"""Generate API key and secret for n8n authentication"""
		import secrets
		import string
		
		# Generate API key (32 characters)
		api_key = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(32))
		
		# Generate API secret (64 characters)
		api_secret = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(64))
		
		self.api_key = api_key
		self.api_secret = api_secret
		
		frappe.msgprint("API keys generated. Please save them securely.", alert=True)
	
	def get_api_secret(self):
		"""Get decrypted API secret"""
		if self.api_secret:
			return get_decrypted_password("n8n Settings", self.name, "api_secret")
		return None


@frappe.whitelist()
def generate_api_keys():
	"""Generate new API keys for n8n"""
	settings = frappe.get_single("n8n Settings")
	settings.generate_api_keys()
	settings.save(ignore_permissions=True)
	return {
		"api_key": settings.api_key,
		"api_secret": settings.api_secret
	}

