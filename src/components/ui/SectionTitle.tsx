interface SectionTitleProps {
  title: string
  subtitle?: string
  num?: string
}

const SectionTitle = ({ title, subtitle, num }: SectionTitleProps) => {
  return (
    <div className="flex items-start gap-6">
      {/* Section number — editorial detail */}
      {num && (
        <span
          className="text-xs font-mono font-semibold mt-1.5 flex-shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          {num}
        </span>
      )}
      <div>
        {subtitle && (
          <p
            className="text-xs font-mono font-semibold tracking-[0.25em] uppercase mb-2"
            style={{ color: 'var(--accent)' }}
          >
            {subtitle}
          </p>
        )}
        <h2
          className="text-3xl md:text-4xl font-black"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        <div
          className="mt-3 h-1 w-12 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
        />
      </div>
    </div>
  )
}

export default SectionTitle
