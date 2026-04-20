import { useState } from 'react'
import type { FormEvent } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'

const contactLinks = [
  {
    icon: <FaEnvelope size={15} />,
    label: 'Email',
    value: 'nm2200521@gmail.com',
    href: 'mailto:nm2200521@gmail.com',
    color: 'var(--accent)',
  },
  {
    icon: <FaGithub size={15} />,
    label: 'GitHub',
    value: 'github.com/dongmin0204',
    href: 'https://github.com/dongmin0204',
    color: 'var(--text-primary)',
  },
  {
    icon: <FaLinkedin size={15} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/dongmin-baek',
    href: 'https://www.linkedin.com/in/dongmin-baek2b0345254/',
    color: 'var(--indigo)',
  },
]

const fieldStyle = {
  backgroundColor: 'var(--bg-card)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  outline: 'none',
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
  fontSize: '14px',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <section id="contact" className="min-h-screen px-8 md:px-16 lg:px-24 py-24">
      <SectionTitle title="연락하기" subtitle="Contact" num="06" />

      <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left */}
        <div>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            새로운 프로젝트, 협업 제안, 또는 그냥 안부 인사도 환영합니다.
            <br />
            메시지를 남겨주시면 빠르게 답변드리겠습니다.
          </p>

          <div className="space-y-3">
            {contactLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="grad-card flex items-center gap-4 p-4 no-underline"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${link.color === 'var(--accent)' ? 'rgba(232,56,13' : link.color === 'var(--indigo)' ? 'rgba(79,70,229' : 'rgba(17,17,17'},0.08)`, color: link.color }}
                >
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs font-mono font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>
                    {link.label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {link.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'name',  label: '이름',   type: 'text',  placeholder: 'Dongmin Baek' },
            { key: 'email', label: '이메일', type: 'email', placeholder: 'hello@example.com' },
          ].map(field => (
            <div key={field.key}>
              <label
                className="block text-xs font-mono font-bold mb-2 tracking-wider uppercase"
                style={{ color: 'var(--text-muted)' }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                required
                placeholder={field.placeholder}
                value={form[field.key as 'name' | 'email']}
                onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                style={fieldStyle}
                onFocus={e => ((e.target as HTMLElement).style.borderColor = 'var(--border-accent)')}
                onBlur={e => ((e.target as HTMLElement).style.borderColor = 'var(--border)')}
              />
            </div>
          ))}

          <div>
            <label
              className="block text-xs font-mono font-bold mb-2 tracking-wider uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              메시지
            </label>
            <textarea
              required
              rows={5}
              placeholder="안녕하세요, ..."
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              style={{ ...fieldStyle, resize: 'none' }}
              onFocus={e => ((e.target as HTMLElement).style.borderColor = 'var(--border-accent)')}
              onBlur={e => ((e.target as HTMLElement).style.borderColor = 'var(--border)')}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending' || status === 'sent'}
            className="flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-60"
            style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
            onMouseEnter={e => {
              if (status !== 'sending' && status !== 'sent')
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-dark)'
            }}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)')}
          >
            <FaPaperPlane size={13} />
            {status === 'sending' ? '전송 중...' : status === 'sent' ? '전송 완료! ✓' : '메시지 보내기'}
          </button>

          {status === 'error' && (
            <p className="text-sm" style={{ color: 'var(--accent)' }}>
              전송에 실패했습니다. 이메일로 직접 연락해 주세요.
            </p>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 flex items-center justify-between" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="h-1 w-8 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
          Built with React + Vite · Designed & Developed by Dongmin Baek
        </p>
        <div className="h-1 w-8 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
      </div>
    </section>
  )
}

export default Contact
