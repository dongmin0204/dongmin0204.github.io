import { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { projects } from '../../data/projects'
import type { Project } from '../../data/projects'
import ProjectMarkdown from '../ui/ProjectMarkdown'

// Lazy-load all .md files under content/projects/
const mdModules = import.meta.glob('/src/content/projects/*.md', {
  query: '?raw',
  import: 'default',
})

async function loadMd(id: string): Promise<string | null> {
  const key = `/src/content/projects/${id}.md`
  if (key in mdModules) {
    return (await mdModules[key]()) as string
  }
  return null
}

type FilterKey = 'all' | 'ai-infra' | 'backend' | 'frontend'

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all',      label: '전체' },
  { key: 'ai-infra', label: 'AI · 인프라' },
  { key: 'backend',  label: '백엔드' },
  { key: 'frontend', label: '프론트엔드' },
]

const categoryLabel: Record<string, string> = {
  'ai-infra': 'AI · 인프라',
  backend:    '백엔드',
  frontend:   '프론트엔드',
}

const categoryColor: Record<string, string> = {
  'ai-infra': '#D97706',
  backend:    '#059669',
  frontend:   '#0EA5E9',
}

const ARRAY_KEYS = new Set(['action', 'result'])

const starConfig = [
  { label: 'Situation', key: 'situation', color: '#0EA5E9' },
  { label: 'Task',      key: 'task',      color: '#059669' },
  { label: 'Action',    key: 'action',    color: 'var(--indigo)' },
  { label: 'Result',    key: 'result',    color: 'var(--accent)' },
  { label: 'Insight',   key: 'insight',   color: '#D97706' },
] as const

/* ── Side Sheet ──────────────────────────────────────────── */

interface StarSheetProps {
  project: Project | null
  onClose: () => void
}

const StarSheet = ({ project, onClose }: StarSheetProps) => {
  const visible = project !== null
  const [mdContent, setMdContent] = useState<string | null>(null)
  const [mdLoading, setMdLoading] = useState(false)

  // Load markdown when project changes
  useEffect(() => {
    if (!project) { setMdContent(null); return }
    setMdLoading(true)
    loadMd(project.id).then(content => {
      setMdContent(content)
      setMdLoading(false)
    })
  }, [project?.id])

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [visible])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(17,17,17,0.45)',
          backdropFilter: 'blur(4px)',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Sheet panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full flex flex-col"
        style={{
          width: 'min(600px, 100vw)',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border)',
          boxShadow: '-24px 0 80px rgba(0,0,0,0.12)',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {/* Accent top bar */}
        <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />

        {/* Header */}
        <div
          className="flex items-start justify-between gap-4 px-8 pt-7 pb-5 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {project && (() => {
                const c = categoryColor[project.category] ?? 'var(--accent)'
                return (
                  <span
                    className="text-xs font-mono font-semibold px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: `${c}18`,
                      color: c,
                      border: `1px solid ${c}30`,
                    }}
                  >
                    {categoryLabel[project.category] ?? project.category}
                  </span>
                )
              })()}
              {project?.period && (
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded"
                  style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  {project.period}
                </span>
              )}
              {project?.teamSize && (
                <span
                  className="text-xs font-mono px-2.5 py-1 rounded"
                  style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  {project.teamSize}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-black leading-snug" style={{ color: 'var(--text-primary)' }}>
              {project?.title}
            </h2>
            <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project?.summary}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 mt-0.5"
            style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-hover)' }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)'
              ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(232,56,13,0.08)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
              ;(e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-hover)'
            }}
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">

          {mdLoading && (
            <div className="flex items-center gap-2 py-8" style={{ color: 'var(--text-muted)' }}>
              <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: 'var(--accent)', borderTopColor: 'transparent' }} />
              <span className="text-xs font-mono">Loading...</span>
            </div>
          )}

          {/* Markdown content (if .md file exists) */}
          {!mdLoading && mdContent && (
            <ProjectMarkdown content={mdContent} />
          )}

          {/* Fallback: STAR-I structured view */}
          {!mdLoading && !mdContent && project && (
            <div className="space-y-5">
              {starConfig.map(({ label, key, color }) => {
                const value = project[key as keyof Project]
                const isList = ARRAY_KEYS.has(key)
                return (
                  <div key={key}>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-5 h-5 rounded text-xs font-black flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${color}18`, color }}
                      >
                        {label[0]}
                      </span>
                      <span className="text-xs font-mono font-bold tracking-wider uppercase" style={{ color }}>
                        {label}
                      </span>
                      <div className="flex-1 h-px" style={{ backgroundColor: `${color}20` }} />
                    </div>
                    {isList && Array.isArray(value) ? (
                      <ul className="pl-2 space-y-2">
                        {(value as string[]).map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                            <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-relaxed pl-2" style={{ color: 'var(--text-secondary)' }}>
                        {value as string}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Tech stack — always shown */}
          {!mdLoading && project && (
            <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded font-mono"
                    style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer — links */}
        <div
          className="px-8 py-5 flex gap-3 flex-shrink-0"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {project && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
              style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-dark)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)')}
            >
              <FaGithub size={14} />
              GitHub
            </a>
          )}
          {project?.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
              style={{ border: '2px solid var(--text-primary)', color: 'var(--text-primary)', backgroundColor: 'transparent' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'var(--text-primary)'
                el.style.color = 'var(--bg-base)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'transparent'
                el.style.color = 'var(--text-primary)'
              }}
            >
              <FaExternalLinkAlt size={12} />
              Demo
            </a>
          )}
        </div>
      </div>
    </>
  )
}

/* ── Projects section ────────────────────────────────────── */

const Projects = () => {
  const [active, setActive] = useState<FilterKey>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  // 섹션이 뷰포트에 진입할 때 필터를 전체로 리셋
  useEffect(() => {
    const el = document.getElementById('projects')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive('all') },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" className="min-h-screen px-8 md:px-16 lg:px-24 py-24">
      <SectionTitle title="프로젝트" subtitle="Projects" num="03" />

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mt-10 mb-8">
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className="px-4 py-2 rounded text-xs font-mono font-bold tracking-wide transition-all duration-200"
            style={
              active === f.key
                ? { backgroundColor: 'var(--accent)', color: '#FFFFFF' }
                : { backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(project => (
          <button
            key={project.id}
            onClick={() => setSelected(project)}
            className="grad-card text-left p-6 w-full"
            style={{ '--card-hover-color': categoryColor[project.category] ?? 'var(--accent)' } as React.CSSProperties}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {(() => {
                  const c = categoryColor[project.category] ?? 'var(--accent)'
                  return (
                    <span
                      className="text-xs font-mono font-bold px-2.5 py-1 rounded"
                      style={{ backgroundColor: `${c}18`, color: c, border: `1px solid ${c}30` }}
                    >
                      {categoryLabel[project.category] ?? project.category}
                    </span>
                  )
                })()}
                {project.period && (
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    {project.period}
                  </span>
                )}
              </div>
              {project.featured && (
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  ★ Featured
                </span>
              )}
            </div>

            {project.teamSize && (
              <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>
                참여 인원 : {project.teamSize}
              </p>
            )}

            <h3 className="text-lg font-black mb-2" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
            <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.slice(0, 4).map(tech => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded font-mono"
                  style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="text-xs px-2 py-0.5 font-mono" style={{ color: 'var(--text-muted)' }}>
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            <p className="text-xs font-mono font-bold tracking-wide" style={{ color: 'var(--accent)' }}>
              문제 해결 과정 보기 →
            </p>
          </button>
        ))}
      </div>

      <StarSheet project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default Projects
