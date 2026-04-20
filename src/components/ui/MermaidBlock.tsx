import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'neutral',
  themeVariables: {
    fontFamily: 'JetBrains Mono, Fira Code, monospace',
    fontSize: '13px',
    primaryColor: '#F5F4EF',
    primaryBorderColor: '#E2E0D8',
    primaryTextColor: '#111111',
    lineColor: '#A09D94',
    edgeLabelBackground: '#FFFFFF',
    clusterBkg: '#EDECE5',
    clusterBorder: '#E2E0D8',
    titleColor: '#111111',
    tertiaryColor: '#EDECE5',
  },
})

let uid = 0

interface MermaidBlockProps {
  code: string
}

const MermaidBlock = ({ code }: MermaidBlockProps) => {
  const id = useRef(`mermaid-${++uid}`)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState(false)

  useEffect(() => {
    mermaid.render(id.current, code)
      .then(({ svg }) => setSvg(svg))
      .catch(() => setError(true))
  }, [code])

  if (error) {
    return (
      <pre
        className="text-xs p-4 rounded-lg overflow-x-auto"
        style={{ backgroundColor: 'var(--bg-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
      >
        {code}
      </pre>
    )
  }

  return (
    <div
      className="rounded-lg p-4 overflow-x-auto my-4"
      style={{ backgroundColor: 'var(--bg-hover)', border: '1px solid var(--border)' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default MermaidBlock
