import './App.css'
import { useState, useRef, useEffect, useContext } from 'react'
import { FrappeProvider, FrappeContext } from 'frappe-react-sdk'
// TEMP: local shim for the Omangup design system.
// Once @gup-ds/react is available in your registry, change this import to:
// import { GupProvider, Layout, Sidebar, Topbar, Card, Text, Button, Stack } from '@gup-ds/react'
import {
  GupProvider,
  Layout,
  Sidebar,
  Topbar,
  Card,
  Text,
  Button,
  Stack,
} from './gup-ds-shim'
import aiBrandIcon from './icon/icon.svg'
import menuIcon from './icon/menu.svg'
import editIcon from './icon/edit.svg'
import bookIcon from './icon/book.svg'
import renewIcon from './icon/renew.svg'
import transferIcon from './icon/property.svg'
import voiceIcon from './icon/voice.svg'
import voiceChatIcon from './icon/voice_chat.svg'

function ServiceDetailsPage() {
  return (
    <Layout fullHeight>
      <div className="service-page">
        <header className="service-topbar">
          <div className="service-topbar-left">
            <span>☰ Menu</span>
            <span>🔍 Search</span>
          </div>
          <div className="service-logo">G</div>
          <div className="service-topbar-right">
            <span>العربية</span>
            <span>Inbox</span>
            <span>John Doe</span>
          </div>
        </header>

        <main className="service-shell">
          <div className="service-breadcrumbs">
            <span>Home</span>
            <span>Item 2</span>
            <span>Last item</span>
          </div>

          <section className="service-hero">
            <h1 className="service-title">Issuing Handicapped Card</h1>
            <p className="service-subtitle">
              This service allows you to book an appointment with institutions in
              the Ministry of Social Development.
            </p>
            <div className="service-meta-row">
              <span>Ministry of Social Development</span>
              <span>· Published: Month 00, 0000</span>
            </div>
          </section>

          <section className="service-body-grid">
            <div>
              <Card>
                <div style={{ fontSize: 12, marginBottom: 8, color: '#6b7280' }}>
                  You are starting service as:
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '999px',
                      background: '#e5e7eb',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>John Doe</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>
                      Personal account
                    </div>
                  </div>
                </div>
              </Card>

              <div className="service-section">
                <h3>Before you start</h3>
                <Card>
                  <div className="service-checklist">
                    <p style={{ marginBottom: 8 }}>
                      You will need the following items before you get started with this
                      service:
                    </p>
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div key={idx} className="service-checklist-item">
                        <div className="service-checklist-bullet" />
                        <span>This is checklist item before you start service</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="service-section">
                <h3>Service category and fees</h3>
                <Card>
                  <div className="service-fees-list">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div key={idx}>
                        <div className="service-fee-title">
                          Issuing Handicapped Card
                        </div>
                        <p className="service-fee-desc">
                          The quick brown fox jumps over a lazy dog is the most famous
                          pangram in English, that is the most short sentence in which
                          all the 26 letters of the alphabet are used.
                        </p>
                        <div className="service-fee-meta">0 OMR</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="service-section">
                <h3>Steps</h3>
                <Card>
                  <div className="service-steps-list">
                    <div className="service-step-item">
                      <span className="service-step-bullet">1.</span>
                      <span>This is step one</span>
                    </div>
                    <div className="service-step-item">
                      <span className="service-step-bullet">2.</span>
                      <span>This is step two</span>
                    </div>
                    <div className="service-step-item">
                      <span className="service-step-bullet">3.</span>
                      <span>This is step three</span>
                    </div>
                    <div className="service-step-item">
                      <span className="service-step-bullet">4.</span>
                      <span>This is step four</span>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="service-section">
                <h3>Special conditions</h3>
                <Card>
                  <p className="service-fee-desc">
                    If you are over the age of 60 years old, you will be exempt from
                    paying any service fees.
                  </p>
                </Card>
              </div>

              <div className="service-section">
                <div className="service-questions-header">
                  <h3>Questions (124)</h3>
                  <span style={{ fontSize: 12, color: '#2563eb', cursor: 'pointer' }}>
                    All questions →
                  </span>
                </div>
                <Card>
                  <div className="service-question-tags">
                    <span className="service-tag">Prices</span>
                    <span className="service-tag">Approval</span>
                  </div>

                  <div className="service-faq-item">
                    <div className="service-faq-question">
                      How long does it take to receive the card?
                    </div>
                  </div>
                  <div className="service-faq-item">
                    <div className="service-faq-question">
                      Is there a fee for issuing the Handicapped Card?
                    </div>
                    <div className="service-faq-answer">
                      Some authorities issue the card free of charge, while others may
                      require a nominal fee. Check the service portal for exact details.
                    </div>
                  </div>
                  <div className="service-faq-item">
                    <div className="service-faq-question">
                      Can I apply on behalf of a family member?
                    </div>
                  </div>
                </Card>
              </div>

              <div className="service-section">
                <h3>Summary</h3>
                <div className="service-summary-card">
                  Based on the collected responses, users generally report that the
                  process is straightforward but may require preparing several
                  documents, especially medical reports. Most users confirm that the
                  service is either free or has minimal fees, depending on the issuing
                  authority.
                </div>
              </div>

              <div className="service-satisfaction">
                <span>Are you satisfied with this page?</span>
                <div className="service-satisfaction-buttons">
                  <Button size="sm" variant="outlined">
                    No
                  </Button>
                  <Button size="sm">Yes</Button>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <div style={{ fontSize: 12, marginBottom: 8, color: '#6b7280' }}>
                  Service
                </div>
                <div style={{ fontSize: 13, marginBottom: 8 }}>0 mins</div>
                <div style={{ fontSize: 13, marginBottom: 16 }}>Varying cost</div>
                <Button style={{ width: '100%' }}>Start now</Button>
              </Card>
            </div>
          </section>
        </main>

        <footer className="service-footer">
          <div className="service-footer-inner">
            <div className="service-footer-top">
              <span>Emergency numbers</span>
              <span>Police 12345 · Ambulance 12345 · Civil defence 12345</span>
            </div>
            <div className="service-footer-columns">
              <div>
                <div className="service-footer-column-title">Service categories</div>
                <div className="service-footer-links">
                  <span>Welfare</span>
                  <span>Business</span>
                  <span>Citizenship and residency</span>
                  <span>Persons with disability</span>
                  <span>Education and learning</span>
                </div>
              </div>
              <div>
                <div className="service-footer-column-title">Money</div>
                <div className="service-footer-links">
                  <span>Health</span>
                  <span>Housing</span>
                  <span>Crime, justice, and the law</span>
                  <span>Driving and transport</span>
                </div>
              </div>
              <div>
                <div className="service-footer-column-title">Digital OMAN</div>
                <div className="service-footer-links">
                  <span>Home</span>
                  <span>Entities</span>
                  <span>Open data</span>
                  <span>Policies and strategies</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  )
}

function AiAssistantPage() {
  const frappe = useContext(FrappeContext)
  const call = frappe?.call
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [isMainVisible, setIsMainVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [pendingMessages, setPendingMessages] = useState(new Map())
  const [user, setUser] = useState(null)
  const draftsRef = useRef(null)

  // Check authentication and get user info
  useEffect(() => {
    const checkAuth = async () => {
      if (!call) return
      
      try {
        // Get current user info
        const userInfo = await call.get('frappe.auth.get_logged_user')
        const userName = userInfo?.message
        
        // Check if user is logged in (not Guest)
        if (!userName || userName === 'Guest') {
          // Not logged in, redirect to login
          window.location.href = '/login'
          return
        }
        
        // Get full user details
        try {
          const userDoc = await call.get('frappe.client.get', {
            doctype: 'User',
            name: userName
          })
          if (userDoc?.message) {
            setUser(userDoc.message)
          } else {
            // Fallback to just username
            setUser({ full_name: userName, name: userName })
          }
        } catch (userError) {
          // If we can't get user details, use username as fallback
          setUser({ full_name: userName, name: userName })
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        // If auth check fails, redirect to login
        window.location.href = '/login'
      }
    }
    
    checkAuth()
  }, [call])

  // Load chats on component mount (only after user is authenticated)
  useEffect(() => {
    if (user) {
      loadChats()
    }
  }, [user])

  // Load messages when current chat changes
  useEffect(() => {
    if (currentChat) {
      loadMessages(currentChat)
    } else {
      setMessages([])
    }
  }, [currentChat])

  // Auto-scroll to bottom when messages change (with column-reverse, scrollTop = 0 is the bottom)
  useEffect(() => {
    if (draftsRef.current) {
      draftsRef.current.scrollTop = draftsRef.current.scrollHeight
    }
  }, [messages])

  const loadChats = async () => {
    if (!call) return
    try {
      setLoading(true)
      const result = await call.post('my_react_app.my_react_app.doctype.chat.chat.get_chats')
      // Ensure result is an array
      const chatsArray = Array.isArray(result) ? result : (result?.message || [])
      setChats(chatsArray)
    } catch (error) {
      console.error('Error loading chats:', error)
      setChats([])
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (chatName) => {
    if (!call) return
    try {
      setLoading(true)
      const result = await call.post('my_react_app.my_react_app.doctype.message.message.get_messages', {
        chat: chatName
      })
      // Ensure result is an array
      const messagesArray = Array.isArray(result) ? result : (result?.message || [])
      setMessages(messagesArray)
    } catch (error) {
      console.error('Error loading messages:', error)
      setMessages([])
    } finally {
      setLoading(false)
    }
  }

  const createNewChat = async () => {
    if (!call) return
    try {
      setLoading(true)
      const result = await call.post('my_react_app.my_react_app.doctype.chat.chat.create_chat', {
        title: 'New Chat',
        description: 'AI Assistant Chat'
      })
      // Handle response - could be wrapped in message property
      const chatData = result?.message || result
      setCurrentChat(chatData?.name || result?.name)
      setMessages([])
      await loadChats()
      setIsMainVisible(true)
    } catch (error) {
      console.error('Error creating chat:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChatClick = async (chatName) => {
    setCurrentChat(chatName)
    setIsMainVisible(true)
    await loadMessages(chatName)
  }

  const quickCards = [
    {
      icon: <img src={bookIcon} alt="" aria-hidden="true" />,
      title: 'Book a clinic appointment',
      subtitle: 'Ministry of Health',
    },
    {
      icon: <img src={renewIcon} alt="" aria-hidden="true" />,
      title: 'Renew the vehicle license',
      subtitle: 'Royal Oman Police',
    },
    {
      icon: <img src={transferIcon} alt="" aria-hidden="true" />,
      title: 'Transfer the property mortgage',
      subtitle: 'Ministry of Housing and Urban Pl…',
    },
  ]

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!call) return
    const trimmed = input.trim()
    if (!trimmed) return

    // If no current chat, create one first
    let chatName = currentChat
    if (!chatName) {
      try {
        const newChat = await call.post('my_react_app.my_react_app.doctype.chat.chat.create_chat', {
          title: trimmed.substring(0, 50) || 'New Chat',
          description: 'AI Assistant Chat'
        })
        // Handle response - could be wrapped in message property
        const chatData = newChat?.message || newChat
        chatName = chatData?.name || newChat?.name
        setCurrentChat(chatName)
        setIsMainVisible(true)
        await loadChats()
      } catch (error) {
        console.error('Error creating chat:', error)
        return
      }
    } else {
      // If chat already exists, make sure main is visible
      setIsMainVisible(true)
    }

    // Check if this is the first message (before creating it)
    const isFirstMessage = messages.length === 0

    // Create temporary message ID for optimistic update
    const tempId = `temp-${Date.now()}-${Math.random()}`
    const optimisticMessage = {
      name: tempId,
      content: trimmed,
      message_type: 'User',
      created_at: new Date().toISOString(),
      sender: 'current_user'
    }

    // Add message optimistically to UI immediately
    setMessages(prev => [...prev, optimisticMessage])
    setPendingMessages(prev => new Map(prev).set(tempId, true))
    setInput('')

    // Create the message on backend
    try {
      const result = await call.post('my_react_app.my_react_app.doctype.message.message.create_message', {
        chat: chatName,
        content: trimmed,
        message_type: 'User'
      })
      
      // Get the actual message data from response
      const actualMessage = result?.message || result
      
      // Replace optimistic message with actual message
      setMessages(prev => prev.map(msg => 
        msg.name === tempId ? actualMessage : msg
      ))
      
      // Remove pending status
      setPendingMessages(prev => {
        const newMap = new Map(prev)
        newMap.delete(tempId)
        return newMap
      })
      
      // If this is the first message, update the chat title (non-blocking)
      if (isFirstMessage) {
        const title = trimmed.substring(0, 50) || trimmed
        // Fire and forget - don't wait for this
        call.post('my_react_app.my_react_app.doctype.chat.chat.update_chat_title', {
          chat_name: chatName,
          title: title
        }).then(() => {
          // Reload chats in background to show updated title
          loadChats()
        }).catch(error => {
          console.error('Error updating chat title:', error)
        })
      }
    } catch (error) {
      console.error('Error creating message:', error)
      // Remove the optimistic message on error
      setMessages(prev => prev.filter(msg => msg.name !== tempId))
      setPendingMessages(prev => {
        const newMap = new Map(prev)
        newMap.delete(tempId)
        return newMap
      })
      // Restore input
      setInput(trimmed)
    }
  }

  return (
    <Layout
      fullHeight
      className="ai-frame"
      style={{ background: 'var(--gup-color-page)', color: 'var(--gup-color-text)' }}
    >
      <div className="ai-shell">
        <Sidebar
          className={`ai-sidebar ${isSidebarMinimized ? 'ai-sidebar--minimized' : ''}`}
          style={{
            width: isSidebarMinimized ? 72 : 296,
            background: 'var(--gup-color-sidebar)',
            borderRight: '1px solid var(--gup-color-border)',
          }}
        >
          {isSidebarMinimized ? (
            <div className="ai-sidebar-minimal">
              <Button
                variant="ghost"
                size="sm"
                className="ai-menu-button"
                type="button"
                aria-label="Expand sidebar"
                style={{ width: 40, height: 40, justifyContent: 'center' }}
                onClick={() => setIsSidebarMinimized(false)}
              >
                <img src={menuIcon} alt="" aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <>
              <div className="ai-sidebar-section">
                <div className="ai-sidebar-header">
                  <img src={aiBrandIcon} alt="Morshed logo" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ai-menu-button"
                    type="button"
                    aria-label="Minimize sidebar"
                    style={{ width: 32, height: 32, justifyContent: 'center' }}
                    onClick={() => setIsSidebarMinimized(true)}
                  >
                    <img src={menuIcon} alt="" aria-hidden="true" />
                  </Button>
                </div>

                <Button
                  variant="outlined"
                  className="ai-new-chat-btn"
                  type="button"
                  onClick={createNewChat}
                  disabled={loading}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    border: '1px solid var(--gup-color-brand)',
                    color: 'var(--gup-color-brand)',
                    fontWeight: 600,
                  }}
                >
                  <span aria-hidden className="ai-new-chat-icon">
                    <img src={editIcon} alt="" />
                  </span>
                  <span>New Chat</span>
                </Button>

                <div className="ai-chat-list">
                  {loading && chats.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--gup-color-muted)' }}>
                      Loading...
                    </div>
                  ) : chats.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: 'var(--gup-color-muted)' }}>
                      No chats yet
                    </div>
                  ) : (
                    (Array.isArray(chats) ? chats : []).map((chat) => (
                      <Button
                        key={chat.name}
                        type="button"
                        variant="ghost"
                        className={`ai-chat-item ${currentChat === chat.name ? 'ai-chat-item--active' : ''}`}
                        onClick={() => handleChatClick(chat.name)}
                        style={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          color:
                            currentChat === chat.name
                              ? 'var(--gup-color-brand-strong)'
                              : 'var(--gup-color-text)',
                          background:
                            currentChat === chat.name ? 'var(--gup-color-suggestion)' : 'transparent',
                          border: '1px solid transparent',
                          fontWeight: currentChat === chat.name ? 600 : 400,
                        }}
                      >
                        {chat.title}
                      </Button>
                    ))
                  )}
                </div>
              </div>

              <Card
                className="ai-sidebar-footer"
                style={{ border: 'none', background: 'var(--gup-color-sidebar-card)' }}
              >
                <div className="ai-user-avatar">
                  {user ? (user.full_name || user.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'U'}
                </div>
                <div className="ai-user-meta">
                  <Text variant="subtitle1" className="ai-user-name">
                    {user ? (user.full_name || user.name || 'User') : 'Loading...'}
                  </Text>
                  <Text variant="caption" className="ai-user-score">
                    ⭐ 12 <span className="ai-user-arrow">›</span>
                  </Text>
                </div>
              </Card>
            </>
          )}
        </Sidebar>

        {isMainVisible && (
          <Layout.Content className="ai-main">
            <Topbar
              className="ai-topbar"
              style={{
                borderBottom: 'none',
                background: 'transparent',
                padding: 0,
                position: 'static',
              }}
            >
              <div />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ai-close-button"
                aria-label="Close main area"
                onClick={() => {
                  setIsMainVisible(false)
                  setCurrentChat(null)
                  setMessages([])
                  setInput('')
                }}
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  fontSize: 20,
                }}
              >
                ×
              </Button>
            </Topbar>

            <div className="ai-canvas">
              <div className="ai-drafts" ref={draftsRef}>
                {loading && messages.length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--gup-color-muted)' }}>
                    Loading messages...
                  </div>
                ) : messages.length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--gup-color-muted)' }}>
                    {currentChat ? 'No messages yet. Start the conversation!' : 'Select a chat or create a new one'}
                  </div>
                ) : (
                  (Array.isArray(messages) ? [...messages].reverse() : []).map((message) => {
                    const isPending = pendingMessages.has(message.name)
                    return (
                      <span 
                        key={message.name} 
                        className={`ai-draft-pill ${message.message_type === 'Assistant' ? 'ai-draft-pill--assistant' : 'ai-draft-pill--user'} ${isPending ? 'ai-draft-pill--pending' : ''}`}
                      >
                        {message.content}
                        {isPending && (
                          <span className="ai-draft-pill-indicator" />
                        )}
                      </span>
                    )
                  })
                )}
              </div>

              <form className="ai-input-bar" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message.."
                />
                <Stack className="ai-input-actions">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Voice input"
                    style={{ width: 36, height: 36, justifyContent: 'center', fontSize: 16 }}
                  >
                    <img src={voiceIcon} alt="" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    aria-label="Settings"
                    style={{ width: 36, height: 36, justifyContent: 'center', fontSize: 16 }}
                  >
                    <img src={voiceChatIcon} alt="" aria-hidden="true" />
                  </Button>
                </Stack>
              </form>

              {messages.length === 0 && (
                <>
                  <div className="ai-suggestions">
                    {quickCards.map((card) => (
                      <Card
                        key={card.title}
                        className="ai-suggestion-card"
                        onClick={async () => {
                          if (!call) return
                          // If no current chat, create one first
                          let chatName = currentChat
                          if (!chatName) {
                            try {
                              const newChat = await call.post(
                                'my_react_app.my_react_app.doctype.chat.chat.create_chat',
                                {
                                  title: card.title.substring(0, 50),
                                  description: 'AI Assistant Chat'
                                }
                              )
                              // Handle response - could be wrapped in message property
                              const chatData = newChat?.message || newChat
                              chatName = chatData?.name || newChat?.name
                              setCurrentChat(chatName)
                              setIsMainVisible(true)
                              await loadChats()
                            } catch (error) {
                              console.error('Error creating chat:', error)
                              return
                            }
                          } else {
                            // If chat already exists, make sure main is visible
                            setIsMainVisible(true)
                          }

                          // Check if this is the first message
                          // If we just created the chat, it's definitely the first message
                          // If chat already existed, check if current messages are empty
                          const isFirstMessage = !currentChat || (currentChat === chatName && messages.length === 0)

                          // Create the message
                          try {
                            await call.post(
                              'my_react_app.my_react_app.doctype.message.message.create_message',
                              {
                                chat: chatName,
                                content: card.title,
                                message_type: 'User'
                              }
                            )
                            
                            // If this is the first message and chat already existed, update the title
                            if (isFirstMessage && currentChat && currentChat === chatName) {
                              try {
                                const title = card.title.substring(0, 50) || card.title
                                await call.post('my_react_app.my_react_app.doctype.chat.chat.update_chat_title', {
                                  chat_name: chatName,
                                  title: title
                                })
                                await loadChats()
                              } catch (error) {
                                console.error('Error updating chat title:', error)
                              }
                            }
                            
                            await loadMessages(chatName)
                          } catch (error) {
                            console.error('Error creating message:', error)
                          }
                        }}
                        style={{
                          background: 'var(--gup-color-suggestion)',
                          border: '1px solid var(--gup-color-suggestion-border)',
                          cursor: 'pointer',
                        }}
                      >
                        <div className="ai-card-icon">{card.icon}</div>
                        <div className="ai-card-body">
                          <Text variant="subtitle1" className="ai-card-title">
                            {card.title}
                          </Text>
                          <Text variant="caption" color="muted" className="ai-card-subtitle">
                            {card.subtitle}
                          </Text>
                        </div>
                      </Card>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      className="ai-suggestion-next"
                      aria-label="Show more suggestions"
                      style={{
                        width: 48,
                        height: 72,
                        minHeight: 72,
                        maxHeight: 72,
                        justifyContent: 'center',
                        background: 'var(--gup-color-suggestion)',
                        border: '1px solid var(--gup-color-suggestion-border)',
                        color: 'var(--gup-color-brand-strong)',
                        padding: '16px 14px',
                        borderRadius: 16,
                        boxSizing: 'border-box',
                      }}
                    >
                      ›
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Layout.Content>
        )}
      </div>
    </Layout>
  )
}

function App() {
  // Get site name from window location (hostname)
  const siteName = typeof window !== 'undefined' ? window.location.hostname : ''
  
  return (
    <FrappeProvider siteName={siteName}>
      <GupProvider>
        <AiAssistantPage />
      </GupProvider>
    </FrappeProvider>
  )
}

export default App

