// Copyright (c) 2024, My React App and Contributors
// License: MIT. See LICENSE

frappe.ui.form.on("n8n Settings", {
	refresh: function(frm) {
		// Form refresh handler
	},
	
	test_webhook_button: function(frm) {
		// Show loading indicator
		frappe.show_alert({
			message: __("Testing webhook..."),
			indicator: "blue"
		});

		// Call the test webhook function
		frappe.call({
			method: "my_react_app.my_react_app.utils.n8n_webhooks.test_webhook",
			callback: function(r) {
				if (r.message) {
					// Show both request and response details
					let details_html = '';
					
					// Show response status code at the top (most important)
					let status_code = r.message.response?.status_code || r.message.status_code;
					if (status_code) {
						let status_color = status_code >= 200 && status_code < 300 ? '#28a745' : '#dc3545';
						let status_text = status_code >= 200 && status_code < 300 ? 'Success' : 'Error';
						details_html += `<div style="margin-bottom: 20px; padding: 15px; background: ${status_code >= 200 && status_code < 300 ? '#d4edda' : '#f8d7da'}; border-radius: 4px; border-left: 4px solid ${status_color};">
							<h3 style="margin: 0; color: ${status_color};">
								Response Status Code: <span style="font-size: 24px;">${status_code}</span> (${status_text})
							</h3>
						</div>`;
					}
					
					// Request details (what we're sending to n8n)
					if (r.message.request) {
						// Headers already have Basic Auth hidden by backend
						details_html += `<div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #ddd;">
							<h4 style="color: #0066cc; margin-bottom: 10px;">📤 Request Sent to n8n:</h4>
							<strong>URL:</strong> ${r.message.request.url || 'N/A'}<br>
							<strong>Method:</strong> ${r.message.request.method || 'N/A'}<br>
						</div>
						<div style="margin-bottom: 15px;">
							<strong>Request Headers:</strong><br>
							<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${JSON.stringify(r.message.request.headers || {}, null, 2)}</pre>
						</div>
						<div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #ddd;">
							<strong>Request Body (Payload):</strong><br>
							<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${JSON.stringify(r.message.request.body || {}, null, 2)}</pre>
						</div>`;
					}
					
					// Response details (what n8n sent back)
					if (r.message.response) {
						let status_color = r.message.response.status_code >= 200 && r.message.response.status_code < 300 ? '#28a745' : '#dc3545';
						details_html += `<div style="margin-bottom: 20px;">
							<h4 style="color: ${status_color}; margin-bottom: 10px;">📥 Response from n8n:</h4>
						</div>
						<div style="margin-bottom: 15px;">
							<strong>Response Headers:</strong><br>
							<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${JSON.stringify(r.message.response.headers || {}, null, 2)}</pre>
						</div>
						<div style="margin-bottom: 15px;">
							<strong>Response Body:</strong><br>
							<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 12px;">${JSON.stringify(r.message.response.body || {}, null, 2)}</pre>
						</div>`;
					} else if (r.message.status_code) {
						// If we only have status code but no full response
						let status_color = r.message.status_code >= 200 && r.message.status_code < 300 ? '#28a745' : '#dc3545';
						details_html += `<div style="margin-bottom: 20px;">
							<h4 style="color: ${status_color}; margin-bottom: 10px;">📥 Response from n8n:</h4>
							<strong>Status Code:</strong> <span style="color: ${status_color}; font-weight: bold;">${r.message.status_code}</span><br>
							<em>No response body received</em>
						</div>`;
					} else {
						details_html += `<div style="margin-bottom: 20px; padding: 10px; background: #fff3cd; border-radius: 4px;">
							<h4 style="color: #856404; margin-bottom: 10px;">📥 Response from n8n:</h4>
							<em>No response received from n8n</em>
						</div>`;
					}
					
					let dialog = new frappe.ui.Dialog({
						title: r.message.status === "success" ? __("Webhook Request to n8n - Success") : __("Webhook Request to n8n - Error"),
						fields: [
							{
								fieldtype: "HTML",
								options: `<div style="max-height: 500px; overflow-y: auto;">${details_html}</div>`
							}
						],
						primary_action_label: __("Close"),
						primary_action: function() {
							dialog.hide();
						}
					});
					
					dialog.show();
					
					if (r.message.status === "success") {
						frappe.show_alert({
							message: __("Webhook sent successfully! Status code: {0}", [r.message.status_code]),
							indicator: "green"
						}, 5);
					} else {
						frappe.show_alert({
							message: __("Failed to send webhook: {0}", [r.message.message || "Unknown error"]),
							indicator: "red"
						}, 5);
					}
				} else {
					frappe.show_alert({
						message: __("Failed to send webhook. Please check your configuration and logs."),
						indicator: "red"
					}, 5);
				}
			},
			error: function(r) {
				let error_message = "Unknown error";
				if (r.message && r.message.message) {
					error_message = r.message.message;
				} else if (r.message && typeof r.message === "string") {
					error_message = r.message;
				}
				
				frappe.show_alert({
					message: __("Error: {0}", [error_message]),
					indicator: "red"
				}, 5);
			}
		});
	}
});

