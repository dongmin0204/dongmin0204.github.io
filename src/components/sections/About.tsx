const csDepths = [
  {
    area: '알고리즘 & 수학',
    desc: 'EMA(지수이동평균)로 트래픽 패턴을 예측하고, DeepSeek EPLB 알고리즘을 부하 분산 문제에 매핑해 적용.',
    color: '#0EA5E9',
  },
  {
    area: '동시성 & 분산 시스템',
    desc: '스레드 로컬 격리, 락 전략(낙관적·비관적), 분산 레플리카 동적 배분. 항해플러스에서 심화 학습 후 실전 적용.',
    color: 'var(--indigo)',
  },
  {
    area: '운영체제 & 파일시스템',
    desc: 'K8s Pod 계정 마운트를 hostPath에서 subPath 기반으로 재설계. readOnly 제약·프로세스 격리 원리를 적용한 결과.',
    color: '#059669',
  },
  {
    area: '테스트 & 격리 원리',
    desc: '슬라이스 테스트(@WebMvcTest)의 컨텍스트 격리 원리를 이해하고 WebMvcTestSupport 패턴으로 공통 보안 Mock 문제 해결.',
    color: '#D97706',
  },
  {
    area: 'K8s 네트워킹',
    desc: 'NodePort 할당·누수·reconcile 구조 직접 구현. Service ↔ MySQL 상태 동기화의 일관성 문제를 시스템 레벨에서 해결.',
    color: 'var(--accent)',
  },
]

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 py-24"
    >
      {/* Section title */}
      <div className="mb-12">
        <p
          className="text-xs font-mono font-semibold tracking-[0.25em] uppercase mb-2"
          style={{ color: 'var(--accent)' }}
        >
          01 / About
        </p>
        <h2
          className="text-3xl md:text-4xl font-black mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          저에 대해
        </h2>
        <div className="h-1 w-12 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

        {/* Left — narrative */}
        <div className="lg:col-span-3 space-y-7">

          {/* Identity */}
          <div>
            <h3
              className="text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--accent)' }}
            >
              원리를 먼저 묻는 엔지니어
            </h3>
            <p className="text-base leading-loose" style={{ color: 'var(--text-secondary)' }}>
              기능을 구현하기 전에 반드시 두 가지를 먼저 묻습니다.
              {' '}<strong style={{ color: 'var(--text-primary)' }}>"왜 이 구조인가"</strong>와
              {' '}<strong style={{ color: 'var(--text-primary)' }}>"이 선택의 트레이드오프는 무엇인가."</strong>
              {' '}
              <strong style={{ color: 'var(--text-primary)' }}>동국대학교 멀티미디어소프트웨어공학과</strong>에서
              알고리즘·운영체제·네트워크 기초를 다지면서, 그 위에 실전 프로젝트를 쌓아 올리는 방식으로 성장하고 있습니다.
            </p>
          </div>

          {/* 기본기가 실전에 연결된 예시들 */}
          <div>
            <h3
              className="text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: 'var(--indigo)' }}
            >
              기본기 → 실전 연결
            </h3>
            <div className="space-y-3 text-sm leading-loose" style={{ color: 'var(--text-secondary)' }}>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>EMA 알고리즘</strong>을 단순히 라이브러리로 가져다 쓴 게 아니라,
                지수이동평균의 수식을 이해하고 시간대별 가중치 테이블과 결합해
                소프트뱅크 해커톤에서 트래픽 예측 시스템을 직접 설계했습니다.
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>OS 파일시스템 원리</strong>를 알고 있었기 때문에
                K8s의 `hostPath` vs `subPath` 마운트 차이를 즉시 파악하고,
                readOnly 환경에서의 계정 파일 경로 불일치 문제를 구조적으로 해결할 수 있었습니다.
              </p>
              <p>
                <strong style={{ color: 'var(--text-primary)' }}>테스트 격리 원리</strong>를 이해하고 있어서
                `@WebMvcTest`의 컨텍스트 분리 방식을 파악하고,
                공통 보안 설정 누락 문제를 `WebMvcTestSupport` 패턴으로 해결했습니다.
              </p>
            </div>
          </div>

        </div>

        {/* Right — CS 깊이 카드 */}
        <div className="lg:col-span-2">
          <h3
            className="text-xs font-mono font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--text-muted)' }}
          >
            깊이 탐구한 CS 개념
          </h3>
          <div className="space-y-2.5">
            {csDepths.map((item) => (
              <div
                key={item.area}
                className="grad-card p-4"
                style={{ borderLeft: `3px solid ${item.color}`, '--card-hover-color': item.color } as React.CSSProperties}
              >
                <p
                  className="text-xs font-mono font-bold mb-1.5"
                  style={{ color: item.color }}
                >
                  {item.area}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
