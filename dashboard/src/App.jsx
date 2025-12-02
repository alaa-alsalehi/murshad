import './App.css'
import { useState, useRef, useEffect } from 'react'
import { FrappeProvider } from 'frappe-react-sdk'
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
  const [input, setInput] = useState('')
  const [drafts, setDrafts] = useState([])
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false)
  const [isMainVisible, setIsMainVisible] = useState(true)
  const draftsRef = useRef(null)

  const savedChats = [
    'Renewing the driver’s license',
    'Obtaining a scholarship',
    'Health insurance coverage',
  ]

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

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setDrafts((prev) => [...prev, trimmed])
    setInput('')
  }

  useEffect(() => {
    if (draftsRef.current) {
      draftsRef.current.scrollTop = draftsRef.current.scrollHeight
    }
  }, [drafts])

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
                  onClick={() => setIsMainVisible(true)}
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
                  {savedChats.map((label, idx) => (
                    <Button
                      key={label}
                      type="button"
                      variant="ghost"
                      className={`ai-chat-item ${idx === 0 ? 'ai-chat-item--active' : ''}`}
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        color:
                          idx === 0 ? 'var(--gup-color-brand-strong)' : 'var(--gup-color-text)',
                        background: idx === 0 ? 'var(--gup-color-suggestion)' : 'transparent',
                        border: '1px solid transparent',
                        fontWeight: idx === 0 ? 600 : 400,
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>

              <Card
                className="ai-sidebar-footer"
                style={{ border: 'none', background: 'var(--gup-color-sidebar-card)' }}
              >
                <div className="ai-user-avatar">IS</div>
                <div className="ai-user-meta">
                  <Text variant="subtitle1" className="ai-user-name">
                    Ibrahim Shaqura
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
                onClick={() => setIsMainVisible(false)}
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
                {drafts.map((draft) => (
                  <span key={draft} className="ai-draft-pill">
                    {draft}
                  </span>
                ))}
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

              <div className="ai-suggestions">
                {quickCards.map((card) => (
                  <Card
                    key={card.title}
                    className="ai-suggestion-card"
                    style={{
                      background: 'var(--gup-color-suggestion)',
                      border: '1px solid var(--gup-color-suggestion-border)',
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
                    justifyContent: 'center',
                    background: 'var(--gup-color-suggestion)',
                    color: 'var(--gup-color-brand-strong)',
                  }}
                >
                  ›
                </Button>
              </div>

              <Text variant="caption" color="muted" className="ai-soon-label">
                Soon
              </Text>
            </div>
          </Layout.Content>
        )}
      </div>
    </Layout>
  )
}

function App() {
  return (
    <FrappeProvider>
      <GupProvider>
        <AiAssistantPage />
      </GupProvider>
    </FrappeProvider>
  )
}

export default App

