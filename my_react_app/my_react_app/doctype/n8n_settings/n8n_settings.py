# Copyright (c) 2024, My React App and Contributors
# License: MIT. See LICENSE

import frappe
from frappe.model.document import Document
from frappe.utils.password import get_decrypted_password


class n8nSettings(Document):
	def validate(self):
		"""Validate n8n settings"""
		pass

