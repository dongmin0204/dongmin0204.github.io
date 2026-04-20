import type { ReactElement } from 'react'
import { FaFlask, FaUsers, FaGraduationCap, FaTrophy } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { experiences } from '../../data/experience'
import type { Experience as ExperienceType } from '../../data/experience'

const typeConfig: Record<ExperienceType['type'], { icon: ReactElement; color: string; label: string }> = {
  research:  { icon: <FaFlask size={10} />,        color: '#0EA5E9', label: '연구' },
  activity:  { icon: <FaUsers size={10} />,         color: '#059669', label: '활동' },
  education: { icon: <FaGraduationCap size={10} />, color: 'var(--indigo)', label: '교육' },
  hackathon: { icon: <FaTrophy size={10} />,        color: 'var(--accent)', label: '해커톤' },
}

const Experience = () => {
  const sorted = [...experiences].sort((a, b) => b.year.localeCompare(a.year))

  return (
    <section id="experience" className="min-h-screen px-8 md:px-16 lg:px-24 py-24">
      <SectionTitle title="경험 & 교육" subtitle="Experience" num="04" />

      <div className="mt-14 relative">
        {/* Vertical spine */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px"
          style={{ backgroundColor: 'var(--border)' }}
        />

        <div className="space-y-0">
          {sorted.map((exp, idx) => {
            const config = typeConfig[exp.type]
            const isLast = idx === sorted.length - 1

            return (
              <div key={exp.id} className="relative flex gap-8 group">
                {/* Timeline node */}
                <div className="relative flex-shrink-0 flex flex-col items-center" style={{ width: '15px' }}>
                  <div
                    className="relative z-10 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      borderColor: config.color,
                      boxShadow: `0 0 0 3px ${config.color}18`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 pb-10 ${isLast ? 'pb-0' : ''}`}>
                  {/* Year badge — only show when year changes */}
                  {(idx === 0 || sorted[idx - 1].year !== exp.year) && (
                    <div className="mb-4 -mt-0.5">
                      <span
                        className="text-xs font-mono font-black px-2.5 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--text-primary)',
                          color: 'var(--bg-base)',
                        }}
                      >
                        {exp.year}
                      </span>
                    </div>
                  )}

                  <div
                    className="grad-card p-5 transition-all duration-300"
                    style={{ cursor: 'default' }}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 flex-wrap mb-1">
                      {/* Type badge */}
                      <div
                        className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-mono font-bold flex-shrink-0"
                        style={{
                          backgroundColor: `${config.color}12`,
                          color: config.color,
                          border: `1px solid ${config.color}25`,
                        }}
                      >
                        {config.icon}
                        {config.label}
                      </div>

                      <h3
                        className="font-bold text-sm"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {exp.organization}
                      </h3>

                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        · {exp.title}
                      </span>

                      {exp.period && (
                        <span
                          className="text-xs font-mono ml-auto flex-shrink-0"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {exp.period}
                        </span>
                      )}
                    </div>

                    {/* Tech stack */}
                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {exp.techStack.map(t => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded font-mono"
                            style={{
                              backgroundColor: 'var(--bg-hover)',
                              color: 'var(--text-muted)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {exp.description}
                    </p>

                    {/* Bullet points */}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span
                              className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                              style={{ backgroundColor: config.color }}
                            />
                            <span
                              className="text-xs leading-relaxed"
                              style={{ color: 'var(--text-secondary)' }}
                            >
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
