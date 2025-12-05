# n8n Integration Guide

This document describes how to integrate your Frappe application with n8n for workflow automation.

## Overview

The n8n integration allows you to:
- **Receive webhooks from Frappe**: Automatically trigger n8n workflows when Chats or Messages are created/updated
- **Call Frappe APIs from n8n**: Use n8n to create, read, and update Chats and Messages via authenticated API endpoints

## Setup

### 1. Install the Integration

First, migrate the new doctype:

```bash
cd /home/asalehi/frappe-bench
bench --site [your-site-name] migrate
```

### 2. Configure n8n Settings

1. Go to **n8n Settings** in your Frappe desk
2. Enable the integration by checking **Enable n8n Integration**
3. Configure your webhook URLs:
   - **Start Chat Webhook URL**: n8n webhook URL for when the first message is sent in a chat
   - **Chat Created Webhook URL**: n8n webhook URL for when a chat is created
   - **Message Created Webhook URL**: n8n webhook URL for when a message is created
   - **Chat Updated Webhook URL**: n8n webhook URL for when a chat is updated
   - **Message Updated Webhook URL**: n8n webhook URL for when a message is updated
   - **Test Webhook URL**: URL for testing the connection
4. Configure Basic Authentication:
   - **Username**: Username for Basic Auth (if required by n8n)
   - **Password**: Password for Basic Auth (if required by n8n)
5. Save your credentials securely

### 3. Configure Advanced Settings

- **Request Timeout**: Timeout in seconds for webhook requests (default: 30)
- **Retry Attempts**: Number of retry attempts if webhook fails (default: 3)

## Webhooks (Frappe → n8n)

When enabled, Frappe will automatically send webhooks to n8n when events occur.

### Webhook Payload Structure

All webhooks follow this structure:

```json
{
  "event_type": "chat.created",
  "data": {
    "name": "CHAT-20240101-00001",
    "title": "My Chat",
    "user": "user@example.com",
    "status": "Active",
    "description": "Chat description",
    "created_at": "2024-01-01 12:00:00",
    "updated_at": "2024-01-01 12:00:00"
  },
  "timestamp": "2024-01-01 12:00:00",
  "site": "your-site.local"
}
```

### Event Types

- `start.chat` - Triggered when the first message is sent in a chat
- `chat.created` - Triggered when a new chat is created
- `chat.updated` - Triggered when a chat is updated
- `message.created` - Triggered when a new message is created
- `message.updated` - Triggered when a message is updated
- `test` - Test webhook

### Start Chat Webhook Data

Triggered when the first message is sent in a chat. This is useful for initializing workflows when a user starts a new conversation.

```json
{
  "name": "MSG-20240101-00001",
  "chat": "CHAT-20240101-00001",
  "chat_title": "My Chat",
  "chat_user": "user@example.com",
  "chat_status": "Active",
  "chat_description": "Chat description",
  "content": "First message content",
  "sender": "user@example.com",
  "message_type": "User",
  "created_at": "2024-01-01 12:00:00",
  "is_first_message": true
}
```

### Chat Webhook Data

```json
{
  "name": "CHAT-20240101-00001",
  "title": "Chat Title",
  "user": "user@example.com",
  "status": "Active",
  "description": "Optional description",
  "created_at": "2024-01-01 12:00:00",
  "updated_at": "2024-01-01 12:00:00"
}
```

### Message Webhook Data

```json
{
  "name": "MSG-20240101-00001",
  "chat": "CHAT-20240101-00001",
  "content": "Message content",
  "sender": "user@example.com",
  "message_type": "User",
  "created_at": "2024-01-01 12:00:00"
}
```

### Authentication Headers

If Basic Authentication is configured, webhooks will include:
- `Authorization`: `Basic <base64_encoded_username:password>`

The credentials are automatically encoded using Base64 and included in the Authorization header.

### Setting Up n8n Webhooks

1. In n8n, create a new workflow
2. Add a **Webhook** node
3. Configure it to accept POST requests
4. Copy the webhook URL
5. Paste it into the corresponding field in **n8n Settings**

## API Endpoints (n8n → Frappe)

All API endpoints require authentication via Basic Authentication.

### Authentication

Include the Authorization header in your requests:
- `Authorization`: `Basic <base64_encoded_username:password>`

Where `username` and `password` are the credentials configured in n8n Settings.

**Note**: The credentials must be Base64 encoded. Format: `base64(username:password)`

### Base URL

```
https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.{endpoint_name}
```

### Endpoints

#### Health Check

**GET** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_health_check`

Check if the integration is active.

**Response:**
```json
{
  "status": "ok",
  "message": "n8n integration is active",
  "site": "your-site.local"
}
```

#### Create Chat

**POST** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_create_chat`

**Parameters:**
- `title` (required): Chat title
- `user` (optional): User email (defaults to API user)
- `description` (optional): Chat description

**Example:**
```bash
curl -X POST \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.n8n_create_chat' \
  -u 'username:password' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "New Chat from n8n",
    "description": "Created via n8n workflow"
  }'
```

#### Get Chats

**GET** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_get_chats`

**Parameters:**
- `user` (optional): Filter by user email

**Example:**
```bash
curl -X GET \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.n8n_get_chats?user=user@example.com' \
  -u 'username:password'
```

#### Get Chat

**GET** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_get_chat`

**Parameters:**
- `chat_name` (required): Chat name (e.g., "CHAT-20240101-00001")

**Example:**
```bash
curl -X GET \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.n8n_get_chat?chat_name=CHAT-20240101-00001' \
  -u 'username:password'
```

#### Update Chat Status

**POST** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_update_chat_status`

**Parameters:**
- `chat_name` (required): Chat name
- `status` (required): New status (e.g., "Active", "Archived", "Closed")

**Example:**
```bash
curl -X POST \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.n8n_update_chat_status' \
  -u 'username:password' \
  -H 'Content-Type: application/json' \
  -d '{
    "chat_name": "CHAT-20240101-00001",
    "status": "Archived"
  }'
```

#### Update Chat Title

**POST** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_update_chat_title`

**Parameters:**
- `chat_name` (required): Chat name
- `title` (required): New title

**Example:**
```bash
curl -X POST \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.n8n_update_chat_title' \
  -u 'username:password' \
  -H 'Content-Type: application/json' \
  -d '{
    "chat_name": "CHAT-20240101-00001",
    "title": "Updated Title"
  }'
```

#### Create Message

**POST** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_create_message`

**Parameters:**
- `chat` (required): Chat name
- `content` (required): Message content
- `message_type` (optional): Message type - "User", "Assistant", or "System" (default: "User")
- `sender` (optional): Sender email (defaults to API user)

**Example:**
```bash
curl -X POST \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.n8n_create_message' \
  -u 'username:password' \
  -H 'Content-Type: application/json' \
  -d '{
    "chat": "CHAT-20240101-00001",
    "content": "Hello from n8n!",
    "message_type": "User"
  }'
```

#### Get Messages

**GET** `/api/method/my_react_app.my_react_app.api.n8n_api.n8n_get_messages`

**Parameters:**
- `chat` (required): Chat name

**Example:**
```bash
curl -X GET \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_get_messages?chat=CHAT-20240101-00001' \
  -u 'username:password'
```

## Using n8n HTTP Request Node

When configuring n8n HTTP Request nodes to call Frappe APIs:

1. **Method**: POST or GET (depending on endpoint)
2. **URL**: Full endpoint URL
3. **Authentication**: Basic Auth
   - **Username**: Your username from n8n Settings
   - **Password**: Your password from n8n Settings
4. **Headers**:
   - `Content-Type`: `application/json`
5. **Body**: JSON payload (for POST requests)

## Testing

### Test Webhook Connection

1. Go to **n8n Settings**
2. Enter a **Test Webhook URL** in n8n
3. Click **Test Webhook** button (or call the API endpoint)
4. Check n8n to see if the webhook was received

### Test API Endpoints

Use the health check endpoint to verify authentication:

```bash
curl -X GET \
  'https://your-site.com/api/method/my_react_app.my_react_app.api.n8n_api.n8n_health_check' \
  -u 'username:password'
```

## Error Handling

- Webhook failures are logged but don't block the main operation
- API endpoints return standard Frappe error responses
- Invalid Basic Auth credentials return 401 Authentication Error
- Missing required parameters return 400 Bad Request

## Security Best Practices

1. **Keep credentials secure**: Never commit usernames/passwords to version control
2. **Use HTTPS**: Always use HTTPS for webhook URLs
3. **Rotate credentials**: Regularly change Basic Auth passwords
4. **Monitor logs**: Check Frappe logs for webhook failures
5. **Validate webhooks**: In n8n, validate incoming webhook data

## Troubleshooting

### Webhooks not being sent

1. Check that **Enable n8n Integration** is checked
2. Verify webhook URLs are correctly configured
3. Check Frappe logs for errors: `bench --site [site] logs`
4. Test webhook URL manually using the test function

### API calls failing

1. Verify Basic Auth username and password are correct
2. Check that Basic Authentication is configured correctly in n8n HTTP Request node
3. Ensure the integration is enabled
4. Check Frappe logs for authentication errors

### Timeout errors

1. Increase the **Request Timeout** in n8n Settings
2. Check n8n server response time
3. Verify network connectivity between Frappe and n8n

## Example n8n Workflows

### Workflow 1: Auto-respond to Start Chat

1. **Webhook** node receives start.chat event (first message in chat)
2. **HTTP Request** node calls n8n_create_message to send welcome message
3. **Set** node updates chat status if needed

### Workflow 2: Auto-respond to Messages

1. **Webhook** node receives message.created event
2. **IF** node checks if message_type is "User"
3. **HTTP Request** node calls n8n_create_message to send auto-response
4. **Set** node updates chat status if needed

### Workflow 2: Archive Old Chats

1. **Schedule** node runs daily
2. **HTTP Request** node calls n8n_get_chats
3. **Code** node filters chats older than 30 days
4. **HTTP Request** node calls n8n_update_chat_status for each chat

### Workflow 3: Chat Analytics

1. **Webhook** node receives chat.created event
2. **HTTP Request** node sends data to analytics service
3. **Database** node stores analytics data

## Support

For issues or questions:
1. Check Frappe logs: `bench --site [site] logs`
2. Review n8n workflow execution logs
3. Verify all configuration settings
4. Test individual components (webhooks and APIs) separately

