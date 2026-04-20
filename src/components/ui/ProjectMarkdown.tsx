import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'
import MermaidBlock from './MermaidBlock'

interface ProjectMarkdownProps {
  content: string
}

const components: Components = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-2xl font-black mb-4 mt-0" style={{ color: 'var(--text-primary)' }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      className="text-base font-bold mt-8 mb-3 pb-2 flex items-center gap-2"
      style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)' }}
    >
      <span className="w-1 h-4 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-bold mt-5 mb-2" style={{ color: 'var(--text-primary)' }}>
      {children}
    </h3>
  ),

  // Paragraph
  p: ({ children }) => (
    <p className="text-sm leading-loose mb-3" style={{ color: 'var(--text-secondary)' }}>
      {children}
    </p>
  ),

  // Blockquote — used for project subtitle
  blockquote: ({ children }) => (
    <blockquote
      className="px-4 py-3 rounded-lg mb-5 text-sm leading-relaxed"
      style={{
        borderLeft: '3px solid var(--accent)',
        backgroundColor: 'rgba(232,56,13,0.05)',
        color: 'var(--text-secondary)',
      }}
    >
      {children}
    </blockquote>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="mb-4 space-y-1.5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-1.5 list-decimal list-inside">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
      <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
      <span className="leading-loose">{children}</span>
    </li>
  ),

  // Code blocks
  code: ({ className, children, ...props }) => {
    const isInline = !className
    const lang = className?.replace('language-', '') ?? ''
    const code = String(children).trim()

    if (lang === 'mermaid') {
      return <MermaidBlock code={code} />
    }

    if (isInline) {
      return (
        <code
          className="text-xs px-1.5 py-0.5 rounded font-mono"
          style={{
            backgroundColor: 'var(--bg-hover)',
            color: 'var(--accent)',
            border: '1px solid var(--border)',
          }}
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <pre
        className="text-xs p-4 rounded-lg overflow-x-auto mb-4 leading-relaxed"
        style={{
          backgroundColor: '#1a1a1a',
          color: '#e8e8e4',
          border: '1px solid var(--border)',
        }}
      >
        <code className="font-mono">{children}</code>
      </pre>
    )
  },

  // Table
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead style={{ borderBottom: '2px solid var(--border)' }}>{children}</thead>
  ),
  th: ({ children }) => (
    <th
      className="text-left py-2 px-3 text-xs font-mono font-bold tracking-wide uppercase"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td
      className="py-2 px-3 text-sm"
      style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}
    >
      {children}
    </td>
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-6" style={{ borderColor: 'var(--border)' }} />
  ),

  // Strong / Em
  strong: ({ children }) => (
    <strong className="font-bold" style={{ color: 'var(--text-primary)' }}>{children}</strong>
  ),
  em: ({ children }) => (
    <em className="not-italic font-medium" style={{ color: 'var(--accent)' }}>{children}</em>
  ),

  // Image
  img: ({ src, alt }) => (
    <figure className="my-5">
      <img
        src={src}
        alt={alt}
        className="rounded-lg w-full object-cover"
        style={{ border: '1px solid var(--border)' }}
      />
      {alt && (
        <figcaption
          className="text-center text-xs mt-2 font-mono"
          style={{ color: 'var(--text-muted)' }}
        >
          {alt}
        </figcaption>
      )}
    </figure>
  ),
}

const ProjectMarkdown = ({ content }: ProjectMarkdownProps) => (
  <div>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  </div>
)

export default ProjectMarkdown
