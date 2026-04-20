import { useState } from 'react'
import './styles/globals.css'
import Sidebar from './components/layout/Sidebar'
import MobileNav from './components/layout/MobileNav'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Writing from './components/sections/Writing'
import Contact from './components/sections/Contact'

const SIDEBAR_W = 288

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-base)' }}>
      {/* Left sidebar — desktop only */}
      <div className="hidden lg:block lg:fixed lg:h-screen" style={{ zIndex: 40 }}>
        <Sidebar open={sidebarOpen} />
      </div>

      {/* Toggle tab — sits on the edge of the sidebar */}
      <button
        onClick={() => setSidebarOpen(p => !p)}
        className="hidden lg:flex fixed z-50 items-center justify-center transition-all duration-300"
        style={{
          top: '50%',
          left: sidebarOpen ? `${SIDEBAR_W - 1}px` : '0px',
          transform: 'translateY(-50%)',
          width: '18px',
          height: '44px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderLeft: sidebarOpen ? '1px solid var(--border)' : 'none',
          borderRadius: '0 6px 6px 0',
          color: 'var(--text-muted)',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.color = 'var(--accent)'
          el.style.borderColor = 'var(--border-accent)'
          el.style.backgroundColor = 'var(--accent-glow)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.color = 'var(--text-muted)'
          el.style.borderColor = 'var(--border)'
          el.style.backgroundColor = 'var(--bg-surface)'
        }}
        aria-label={sidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
      >
        <span
          style={{
            fontSize: '14px',
            display: 'inline-block',
            transform: sidebarOpen ? 'scaleX(1)' : 'scaleX(-1)',
            transition: 'transform 0.3s',
          }}
        >
          ‹
        </span>
      </button>

      {/* Mobile nav */}
      <div className="lg:hidden">
        <MobileNav />
      </div>

      {/* Main content */}
      <main
        className="w-full transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? `${SIDEBAR_W}px` : '18px' }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Writing />
        <Contact />
      </main>
    </div>
  )
}

export default App
