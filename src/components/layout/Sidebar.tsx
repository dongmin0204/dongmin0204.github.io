import profilePhoto from '../../assets/picture_dongminbaek.jpeg'

const navLinks = [
  { label: 'About',      href: '#about',      num: '01' },
  { label: 'Skills',     href: '#skills',     num: '02' },
  { label: 'Projects',   href: '#projects',   num: '03' },
  { label: 'Experience', href: '#experience', num: '04' },
  { label: 'Writing',    href: '#writing',    num: '05' },
  { label: 'Contact',    href: '#contact',    num: '06' },
]

interface SidebarProps {
  open: boolean
}

const Sidebar = ({ open }: SidebarProps) => {
  return (
    <aside
      className="h-full flex flex-col"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        width: open ? '288px' : '0',
        overflow: 'hidden',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Inner wrapper — fixed width so content doesn't reflow */}
      <div className="flex flex-col h-full py-12" style={{ width: '288px', paddingLeft: '2rem', paddingRight: '2rem' }}>

        {/* Red accent top bar */}
        <div
          className="h-1 w-12 rounded-full mb-8 flex-shrink-0"
          style={{ backgroundColor: 'var(--accent)' }}
        />

        {/* Profile photo */}
        <div className="mb-7 flex-shrink-0">
          <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0 }}>
            {/* Red offset shadow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translate(4px, 4px)',
                backgroundColor: 'var(--accent)',
                borderRadius: '10px',
                zIndex: 0,
              }}
            />
            <img
              src={profilePhoto}
              alt="백동민"
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'block',
                width: '92px',
                height: '92px',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: '10px',
                border: '1px solid var(--border)',
              }}
            />
          </div>
        </div>

        {/* Name block */}
        <a href="#hero" className="block mb-12 flex-shrink-0">
          <p
            className="text-xs font-mono font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: 'var(--text-muted)' }}
          >
            Portfolio
          </p>
          <h1
            className="text-xl font-extrabold leading-tight mb-1.5"
            style={{ color: 'var(--text-primary)' }}
          >
            Dongmin<br />Baek
          </h1>
          <p
            className="text-xs font-mono font-semibold tracking-wide"
            style={{ color: 'var(--accent)' }}
          >
            SOFTWARE ENGINEER
          </p>
        </a>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--accent)'
                el.style.backgroundColor = 'var(--accent-glow)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--text-secondary)'
                el.style.backgroundColor = 'transparent'
              }}
            >
              <span
                className="text-xs font-mono flex-shrink-0 w-6 transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.num}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div
          className="flex gap-4 pt-6 flex-shrink-0"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {[
            { label: 'GitHub',   href: 'https://github.com/dongmin0204' },
            { label: 'Blog',     href: 'https://velog.io/@dongmin_0204' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dongmin-baek2b0345254/' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono transition-colors duration-200"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
