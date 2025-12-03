# Frontend-Backend Integration

This document describes how the React frontend is connected to the Frappe backend API.

## Integration Overview

The React frontend (`dashboard/src/App.jsx`) is now fully integrated with the Frappe backend using the `frappe-react-sdk` package.

## Key Changes Made

### 1. API Integration
- Added `useFrappe` hook from `frappe-react-sdk` to make API calls
- Replaced local state management with backend API calls
- All chat and message operations now persist to the database

### 2. State Management Updates

**Before:**
- Used local `drafts` array for messages
- Hardcoded `savedChats` array
- No persistence

**After:**
- `chats` state loaded from backend via `get_chats()` API
- `messages` state loaded from backend via `get_messages()` API
- `currentChat` tracks the active chat session
- All data persists to database

### 3. API Calls Implemented

#### Chat Operations:
- `loadChats()` - Loads all chats for the current user
- `createNewChat()` - Creates a new chat when "New Chat" button is clicked
- `handleChatClick()` - Loads messages when a chat is selected

#### Message Operations:
- `loadMessages()` - Loads all messages for a chat
- `handleSubmit()` - Creates a new message when user submits form
- Card click handler - Creates a message when suggestion card is clicked

## API Endpoints Used

All endpoints are called using the `call()` function from `useFrappe()`:

```javascript
const { call } = useFrappe()

// Create chat
await call('my_react_app.my_react_app.doctype.chat.chat.create_chat', {
  title: 'Chat Title',
  description: 'Description'
})

// Get chats
await call('my_react_app.my_react_app.doctype.chat.chat.get_chats')

// Create message
await call('my_react_app.my_react_app.doctype.message.message.create_message', {
  chat: 'CHAT-20240101-00001',
  content: 'Message content',
  message_type: 'User'
})

// Get messages
await call('my_react_app.my_react_app.doctype.message.message.get_messages', {
  chat: 'CHAT-20240101-00001'
})
```

## User Flow

1. **On Component Mount:**
   - Automatically loads all chats for the current user
   - Displays them in the sidebar

2. **Creating a New Chat:**
   - User clicks "New Chat" button
   - Creates a new chat in the database
   - Sets it as the current chat
   - Clears messages

3. **Selecting a Chat:**
   - User clicks on a chat in the sidebar
   - Loads all messages for that chat
   - Displays them in the message area

4. **Sending a Message:**
   - User types a message and submits
   - If no current chat exists, creates one first
   - Creates the message in the database
   - Reloads messages to show the new one

5. **Clicking Suggestion Card:**
   - Creates a chat if none exists
   - Creates a message with the card title
   - Loads and displays the message

6. **Closing Chat:**
   - Clears current chat
   - Clears messages
   - Hides the main area

## Error Handling

All API calls are wrapped in try-catch blocks with console error logging. In production, you may want to add user-facing error messages.

## Loading States

The component includes a `loading` state that can be used to show loading indicators. Currently used to:
- Disable "New Chat" button during operations
- Show "Loading..." messages in chat list and message area

## Next Steps

1. **Add Error UI:** Display user-friendly error messages when API calls fail
2. **Add Optimistic Updates:** Update UI immediately, then sync with backend
3. **Add Real-time Updates:** Use Frappe's real-time features to update messages as they arrive
4. **Add Pagination:** For chats and messages if they grow large
5. **Add Search:** Allow users to search through their chats and messages

## Testing

To test the integration:

1. Make sure the doctypes are migrated:
   ```bash
   bench --site [your-site] migrate
   ```

2. Start the development server:
   ```bash
   cd dashboard
   yarn dev
   ```

3. Open the app in your browser and test:
   - Creating new chats
   - Sending messages
   - Selecting different chats
   - Clicking suggestion cards

## Troubleshooting

If API calls fail:

1. Check browser console for error messages
2. Verify the doctypes are properly migrated
3. Check that you're logged in to Frappe
4. Verify the API endpoint names match exactly
5. Check Frappe server logs for backend errors

