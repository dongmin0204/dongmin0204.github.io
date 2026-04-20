import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import profilePhoto from '../../assets/picture_dongminbaek.jpeg'

const Hero = () => {
  const typedRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!typedRef.current) return
    const typed = new Typed(typedRef.current, {
      strings: [
        'Engineer, not just a Developer.',
        '풀스택 개발자.',
        'AI × 인프라 엔지니어.',
        'Problem Solver.',
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2200,
      loop: true,
    })
    return () => typed.destroy()
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20 lg:pt-0 relative overflow-hidden"
    >
      {/* Large decorative numeral — editorial texture */}
      <div
        className="absolute select-none pointer-events-none"
        aria-hidden
        style={{
          right: '-2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(14rem, 30vw, 28rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(0,0,0,0.06)',
          fontFamily: 'Pretendard Variable, Pretendard, sans-serif',
        }}
      >
        01
      </div>

      <div className="w-full max-w-5xl relative flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">
        <div className="w-full max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span
              className="inline-block w-8 h-0.5"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <p
              className="text-xs font-mono font-semibold tracking-[0.3em] uppercase"
              style={{ color: 'var(--accent)' }}
            >
              소프트웨어 엔지니어
            </p>
          </div>

          {/* Name */}
          <h1
            className="font-black leading-none tracking-tighter mb-2"
            style={{
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              color: 'var(--text-primary)',
            }}
          >
            백동민
          </h1>

          {/* Accent underline */}
          <div
            className="mb-8"
            style={{
              height: '5px',
              width: 'clamp(3rem, 8vw, 6rem)',
              backgroundColor: 'var(--accent)',
              borderRadius: '2px',
            }}
          />

          {/* Typed tagline */}
          <h2
            className="text-xl md:text-2xl font-semibold mb-6 min-h-[2rem]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span ref={typedRef} />
          </h2>

          {/* Description */}
          <p
            className="text-base mb-10 max-w-lg leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            "왜 이 구조인가"를 먼저 묻는 소프트웨어 엔지니어입니다.
            동국대학교 멀티미디어소프트웨어공학과에서 CS 기초부터
            인프라·AI까지 수직으로 탐험하고 있습니다.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-200"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#FFFFFF',
                borderRadius: '6px',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-dark)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)')}
            >
              프로젝트 보기
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-200"
              style={{
                border: '2px solid var(--text-primary)',
                color: 'var(--text-primary)',
                backgroundColor: 'transparent',
                borderRadius: '6px',
              }}
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
              연락하기
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex items-center gap-3 animate-bounce">
            <div
              className="w-px h-8"
              style={{ backgroundColor: 'var(--text-muted)' }}
            />
            <span
              className="text-xs font-mono tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              scroll
            </span>
          </div>
        </div>

        {/* Profile photo — offset-shadow editorial frame */}
        <div
          className="hidden lg:block flex-shrink-0"
          style={{ alignSelf: 'center', paddingBottom: '28px', paddingRight: '16px' }}
        >
          {/* Wrapper: red offset shadow behind photo */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* Red shadow block — peeks bottom-right */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translate(12px, 12px)',
                backgroundColor: 'var(--accent)',
                borderRadius: '14px',
                zIndex: 0,
              }}
            />
            {/* Photo */}
            <img
              src={profilePhoto}
              alt="백동민"
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'block',
                width: '260px',
                height: '320px',
                objectFit: 'cover',
                objectPosition: 'center top',
                borderRadius: '14px',
                border: '1px solid var(--border)',
              }}
            />
          </div>
          {/* Label below */}
          <p
            className="text-center mt-5 text-xs font-mono font-semibold tracking-widest uppercase"
            style={{ color: 'var(--text-muted)' }}
          >
            @dongmin0204
          </p>
        </div>
      </div>

    </section>
  )
}

export default Hero
