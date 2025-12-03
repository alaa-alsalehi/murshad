# Chat and Message Doctypes

This document describes the Chat and Message doctypes created for the My React App.

## Doctypes Created

### 1. Chat
Represents a chat/conversation session.

**Fields:**
- `title` (Data, Required): Title of the chat
- `user` (Link to User, Required): User who owns the chat
- `status` (Select): Status of the chat (Active, Archived, Closed)
- `created_at` (Datetime): When the chat was created
- `updated_at` (Datetime): When the chat was last updated
- `description` (Small Text): Optional description

**Naming:** Auto-generated as `CHAT-YYYYMMDD-#####`

### 2. Message
Represents individual messages within a chat.

**Fields:**
- `chat` (Link to Chat, Required): The chat this message belongs to
- `content` (Long Text, Required): The message content
- `sender` (Link to User, Required): Who sent the message
- `message_type` (Select): Type of message (User, Assistant, System)
- `created_at` (Datetime): When the message was created

**Naming:** Auto-generated as `MSG-YYYYMMDD-#####`

## Installation

To install these doctypes, run:

```bash
cd /home/asalehi/frappe-bench
bench --site [your-site-name] migrate
```

Or if you need to force sync:

```bash
bench --site [your-site-name] migrate --force
```

## API Endpoints

All endpoints are whitelisted and can be called from the frontend.

### Chat Endpoints

#### Create Chat
```python
POST /api/method/my_react_app.my_react_app.doctype.chat.chat.create_chat
Parameters:
- title (required)
- user (optional, defaults to current user)
- description (optional)
```

#### Get All Chats
```python
GET /api/method/my_react_app.my_react_app.doctype.chat.chat.get_chats
Parameters:
- user (optional, defaults to current user)
```

#### Get Chat with Messages
```python
GET /api/method/my_react_app.my_react_app.doctype.chat.chat.get_chat
Parameters:
- chat_name (required)
```

#### Update Chat Status
```python
POST /api/method/my_react_app.my_react_app.doctype.chat.chat.update_chat_status
Parameters:
- chat_name (required)
- status (required)
```

### Message Endpoints

#### Create Message
```python
POST /api/method/my_react_app.my_react_app.doctype.message.message.create_message
Parameters:
- chat (required)
- content (required)
- message_type (optional, defaults to "User")
- sender (optional, defaults to current user)
```

#### Get Messages
```python
GET /api/method/my_react_app.my_react_app.doctype.message.message.get_messages
Parameters:
- chat (required)
```

## Usage Example (JavaScript/Frappe SDK)

```javascript
import { call } from 'frappe-react-sdk';

// Create a new chat
const chat = await call('my_react_app.my_react_app.doctype.chat.chat.create_chat', {
  title: 'My Chat',
  description: 'Chat description'
});

// Create a message
const message = await call('my_react_app.my_react_app.doctype.message.message.create_message', {
  chat: chat.name,
  content: 'Hello, this is my message',
  message_type: 'User'
});

// Get all chats
const chats = await call('my_react_app.my_react_app.doctype.chat.chat.get_chats');

// Get chat with messages
const chatWithMessages = await call('my_react_app.my_react_app.doctype.chat.chat.get_chat', {
  chat_name: chat.name
});
```

## Permissions

Both doctypes have permissions set for:
- System Manager: Full access
- All: Full access (you may want to restrict this based on your requirements)

## Notes

- The `updated_at` field in Chat is automatically updated when a new message is added
- The `sender` field in Message defaults to the current user if not provided
- The `created_at` fields are automatically set to the current timestamp

