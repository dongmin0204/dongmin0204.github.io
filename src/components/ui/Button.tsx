interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'outline'
  href?: string
  onClick?: () => void
  className?: string
}

const Button = ({ children, variant = 'primary', href, onClick, className = '' }: ButtonProps) => {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm'
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent-light shadow-lg shadow-accent/20',
    outline: 'border border-border-accent text-accent hover:bg-accent-glow',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

export default Button
