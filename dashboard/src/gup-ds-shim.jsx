// Temporary local shim for the Omangup design system so the app can build
// until the real `@gup-ds/react` package is properly installed/configured.
// Replace usages of this file with the real package once available.

export function GupProvider({ children }) {
  return children
}

export function Layout({ children, fullHeight, className, style, ...rest }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: fullHeight ? '100vh' : undefined,
        background: '#f3f4f6',
        color: '#111827',
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

Layout.Content = function LayoutContent({ children, className, style, ...rest }) {
  return (
    <div
      className={className}
      style={{ flex: 1, display: 'flex', flexDirection: 'column', ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Sidebar({ children, className, style, ...rest }) {
  return (
    <aside
      className={className}
      style={{
        width: 240,
        background: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        ...style,
      }}
      {...rest}
    >
      {children}
    </aside>
  )
}

export function Topbar({ children, className, style, ...rest }) {
  return (
    <header
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: '1px solid #e5e7eb',
        background: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        ...style,
      }}
      {...rest}
    >
      {children}
    </header>
  )
}

export function Card({ children, className, style, ...rest }) {
  return (
    <div
      className={className}
      style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 16,
        border: '1px solid #e5e7eb',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Text({ children, variant, color, className, style, ...rest }) {
  const styles = {}

  if (variant === 'h4') {
    styles.fontSize = '1.4rem'
    styles.fontWeight = 600
  } else if (variant === 'h5') {
    styles.fontSize = '1.1rem'
    styles.fontWeight = 600
  } else if (variant === 'subtitle1') {
    styles.fontSize = '0.95rem'
    styles.fontWeight = 500
  } else if (variant === 'overline') {
    styles.fontSize = '0.7rem'
    styles.textTransform = 'uppercase'
    styles.letterSpacing = '0.08em'
    styles.opacity = 0.7
  } else if (variant === 'caption') {
    styles.fontSize = '0.75rem'
    styles.opacity = 0.7
  }

  if (color === 'success') {
    styles.color = '#22c55e'
  } else if (color === 'danger') {
    styles.color = '#ef4444'
  } else if (color === 'muted') {
    styles.color = '#94a3b8'
  }

  return (
    <span className={className} style={{ ...styles, ...style }} {...rest}>
      {children}
    </span>
  )
}

export function Button({ children, variant, size = 'md', className, style, ...rest }) {
  const padding = size === 'sm' ? '4px 10px' : '8px 14px'
  let background = '#3b82f6'
  let border = '1px solid transparent'
  let color = '#ffffff'

  if (variant === 'outlined') {
    background = 'transparent'
    border = '1px solid #d1d5db'
    color = '#374151'
  } else if (variant === 'ghost') {
    background = 'transparent'
    color = '#374151'
  }

  return (
    <button
      className={className}
      {...rest}
      style={{
        padding,
        borderRadius: 999,
        fontSize: 13,
        border,
        background,
        color,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

export function Stack({ children, direction = 'row', spacing = 'sm', className, style, ...rest }) {
  const gap = spacing === 'sm' ? 8 : 12
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: direction, gap, ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}


