import { useState } from 'react'

const navLinks = [
  { label: 'About',      href: '#about',      num: '01' },
  { label: 'Skills',     href: '#skills',     num: '02' },
  { label: 'Projects',   href: '#projects',   num: '03' },
  { label: 'Experience', href: '#experience', num: '04' },
  { label: 'Writing',    href: '#writing',    num: '05' },
  { label: 'Contact',    href: '#contact',    num: '06' },
]

const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'rgba(245, 244, 239, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Accent top line */}
      <div className="h-0.5 w-full" style={{ backgroundColor: 'var(--accent)' }} />

      <div className="flex items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: 'var(--accent)' }}
          />
          <span className="text-sm font-extrabold" style={{ color: 'var(--text-primary)' }}>
            Dongmin Baek
          </span>
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-mono font-semibold transition-colors duration-200"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
        >
          {open ? 'CLOSE ✕' : 'MENU ☰'}
        </button>
      </div>

      {open && (
        <div
          className="flex flex-col gap-0.5 px-6 pb-5"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)')}
            >
              <span className="text-xs font-mono flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                {link.num}
              </span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

export default MobileNav
