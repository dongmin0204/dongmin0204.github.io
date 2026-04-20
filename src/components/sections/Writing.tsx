import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FaTimes, FaCalendar } from 'react-icons/fa'
import SectionTitle from '../ui/SectionTitle'
import { posts } from '../../data/posts'
import type { Post } from '../../data/posts'

interface PostModalProps {
  post: Post
  onClose: () => void
}

const PostModal = ({ post, onClose }: PostModalProps) => (
  <div
    className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
    style={{ backgroundColor: 'rgba(17,17,17,0.6)', backdropFilter: 'blur(8px)' }}
    onClick={onClose}
  >
    <div
      className="relative w-full max-w-3xl my-8 rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
      }}
      onClick={e => e.stopPropagation()}
    >
      {/* Accent bar */}
      <div className="h-1 w-full" style={{ backgroundColor: 'var(--accent)' }} />

      {/* Header */}
      <div
        className="sticky top-0 px-8 py-5 flex items-start justify-between gap-4"
        style={{ backgroundColor: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}
      >
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded font-mono font-bold"
                style={{
                  backgroundColor: 'rgba(232,56,13,0.08)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(232,56,13,0.12)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>
            {post.title}
          </h2>
          <div className="flex items-center gap-1.5 mt-1.5">
            <FaCalendar size={10} style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              {post.date}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 mt-1 transition-colors duration-200"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--accent)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-muted)')}
        >
          <FaTimes size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="text-lg font-black mt-8 mb-3" style={{ color: 'var(--text-primary)' }}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-bold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {children}
              </p>
            ),
            code: ({ children, className, ...props }) => {
              const isBlock = className?.includes('language-')
              return isBlock ? (
                <code className="block text-xs font-mono leading-relaxed" {...props}>{children}</code>
              ) : (
                <code
                  className="text-xs px-1.5 py-0.5 rounded font-mono"
                  style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--accent)' }}
                  {...props}
                >
                  {children}
                </code>
              )
            },
            pre: ({ children }) => (
              <pre
                className="text-xs font-mono p-4 rounded-lg overflow-x-auto mb-4"
                style={{ backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border)' }}
              >
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote
                className="pl-4 my-4 text-sm italic"
                style={{ borderLeft: '3px solid var(--accent)', color: 'var(--text-secondary)' }}
              >
                {children}
              </blockquote>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-1 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-1 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {children}
              </ol>
            ),
            strong: ({ children }) => (
              <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{children}</strong>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </div>
  </div>
)

const Writing = () => {
  const [selected, setSelected] = useState<Post | null>(null)

  return (
    <section id="writing" className="min-h-screen px-8 md:px-16 lg:px-24 py-24">
      <SectionTitle title="글" subtitle="Writing" num="05" />
      <p className="mt-4 text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
        배우고 만든 것들을 기록합니다.
      </p>

      <div className="space-y-3">
        {posts.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            아직 글이 없습니다.
          </p>
        ) : (
          posts.map(post => (
            <button
              key={post.slug}
              onClick={() => setSelected(post)}
              className="grad-card w-full text-left p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-base mb-1.5" style={{ color: 'var(--text-primary)' }}>
                    {post.title}
                  </h3>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded font-mono font-bold"
                        style={{
                          backgroundColor: 'rgba(232,56,13,0.07)',
                          color: 'var(--accent)',
                          border: '1px solid rgba(232,56,13,0.1)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-mono mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <FaCalendar size={10} />
                  {post.date}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {selected && <PostModal post={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default Writing
