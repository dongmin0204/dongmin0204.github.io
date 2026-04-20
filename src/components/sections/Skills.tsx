import type { ReactElement } from 'react'
import { FaReact, FaServer, FaDocker, FaCode, FaBrain } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { skillCategories } from '../../data/skills'

const categoryIcons: Record<string, ReactElement> = {
  frontend: <FaReact size={14} />,
  backend:  <FaServer size={14} />,
  infra:    <FaDocker size={14} />,
  ai:       <FaBrain size={14} />,
  cs:       <FaCode size={14} />,
}

const categoryColors: Record<string, string> = {
  cs:       'var(--accent)',
  backend:  '#059669',
  infra:    '#7C3AED',
  frontend: '#0EA5E9',
  ai:       '#D97706',
}

// CS 기본기 메가 카드 색상
const subGroupColors = [
  '#0EA5E9',
  '#059669',
  'var(--indigo)',
  'var(--accent)',
  '#D97706',
  '#7C3AED',
]

const Tag = ({ label, muted = false, hoverColor }: { label: string; muted?: boolean; hoverColor?: string }) => (
  <span
    className="text-xs px-2.5 py-1 rounded font-mono skill-tag"
    style={{
      backgroundColor: muted ? 'var(--bg-hover)' : 'var(--bg-surface)',
      color: muted ? 'var(--text-muted)' : 'var(--text-secondary)',
      border: '1px solid var(--border)',
      transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
      ...(hoverColor ? { '--tag-hover': hoverColor } as React.CSSProperties : {}),
    }}
    onMouseEnter={e => {
      const c = hoverColor ?? 'var(--accent)'
      const el = e.currentTarget as HTMLElement
      el.style.borderColor = c
      el.style.color = c
      el.style.backgroundColor = `color-mix(in srgb, ${c} 8%, transparent)`
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement
      el.style.borderColor = ''
      el.style.color = ''
      el.style.backgroundColor = ''
    }}
  >
    {label}
  </span>
)

const Skills = () => {
  const csCategory = skillCategories.find(c => c.id === 'cs')
  const toolCategories = skillCategories.filter(c => c.id !== 'cs')

  return (
    <section id="skills" className="min-h-screen px-8 md:px-16 lg:px-24 py-24">
      <SectionTitle title="기술 스택" subtitle="Skills" num="02" />

      {/* ── CS 기본기 메가 카드 ──────────────────────────── */}
      {csCategory && (
        <div className="mt-10 mb-5">
          <div
            className="grad-card p-7"
            style={{ borderLeft: '4px solid var(--accent)' }}
          >
            {/* 카드 헤더 */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(232,56,13,0.1)', color: 'var(--accent)' }}
              >
                {categoryIcons['cs']}
              </div>
              <div>
                <h3 className="font-black text-base" style={{ color: 'var(--text-primary)' }}>
                  CS & 기본기
                </h3>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  원리 이해 → 실전 적용
                </p>
              </div>
            </div>

            {/* Sub-groups 그리드 */}
            {csCategory.subGroups && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {csCategory.subGroups.map((group, idx) => {
                  const color = subGroupColors[idx % subGroupColors.length]
                  return (
                    <div key={group.label}>
                      <p
                        className="text-xs font-mono font-bold mb-2 pb-1.5"
                        style={{
                          color,
                          borderBottom: `1px solid ${color}30`,
                        }}
                      >
                        {group.label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {group.skills.map(skill => (
                          <Tag key={skill} label={skill} hoverColor={color} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 기술 도구 카드들 ─────────────────────────────── */}
      <div className="mb-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {toolCategories.map(cat => {
            const color = categoryColors[cat.id] ?? 'var(--accent)'
            return (
              <div
                key={cat.id}
                className="grad-card p-5"
                style={{ borderLeft: `3px solid ${color}`, '--card-hover-color': color } as React.CSSProperties}
              >
                {/* 헤더 */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${color}14`, color }}
                  >
                    {categoryIcons[cat.id] ?? <FaCode size={13} />}
                  </div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {cat.label}
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(skill => (
                    <Tag key={skill} label={skill} muted hoverColor={color} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
