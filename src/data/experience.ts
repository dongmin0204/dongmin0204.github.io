export interface Experience {
  id: string
  year: string
  period?: string
  title: string
  organization: string
  description: string
  techStack?: string[]
  bullets?: string[]
  type: 'research' | 'activity' | 'education' | 'hackathon'
}

export const experiences: Experience[] = [
  {
    id: 'isn-lab',
    year: '2026',
    period: '2026 ~ 현재',
    title: '연구원',
    organization: 'Dongguk iSN LAB',
    description: '동국대학교 iSN 연구실 연구원으로 활동 중',
    type: 'research',
  },
  {
    id: 'software-edu',
    year: '2026',
    period: '2026 ~ 현재',
    title: '멤버',
    organization: 'Dongguk Software Education Institute',
    description: '동국대학교 소프트웨어 교육원 활동',
    type: 'activity',
  },
  {
    id: 'softbank-hackathon',
    year: '2025',
    period: '2025',
    title: '참가자',
    organization: '소프트뱅크 해커톤',
    description: 'AI Traffic Controller 개발 — Serverless cold start 문제 해결',
    techStack: ['Python', 'FastAPI', 'Redis', 'Kubernetes'],
    bullets: [
      'DeepSeek EPLB 알고리즘 기반 레플리카 동적 배분으로 cold start 지연 저감',
      'QPS 기반 EMA 예측으로 트래픽 패턴을 학습하여 최적 예열 시점 결정',
      'A/B 실험 구조 설계로 알고리즘 효과를 정량적으로 측정 가능하도록 구현',
    ],
    type: 'hackathon',
  },
  {
    id: 'hanghaplus',
    year: '2025',
    period: '2025',
    title: '10기',
    organization: '항해플러스',
    description: 'TDD, 동시성 처리 등 백엔드 심화 과정 이수',
    techStack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Docker'],
    bullets: [
      'TDD 기반 개발 방법론 적용 및 단위·통합 테스트 전략 수립',
      '동시성 제어(낙관적/비관적 락, Redis 분산 락) 실무 적용 방법 학습',
      '팀원들과 코드 리뷰 문화 형성 및 클린 코드 습관 강화',
    ],
    type: 'education',
  },
  {
    id: 'farmsystem',
    year: '2025',
    period: '2025',
    title: '보안/웹 4기',
    organization: 'FarmSystem',
    description: 'S4(민들레) 팀 프론트엔드 개발',
    techStack: ['React', 'TypeScript'],
    bullets: [
      '보안 기능이 포함된 웹 서비스의 프론트엔드 컴포넌트 설계 및 API 연동',
      '세션 타임아웃·입력 검증 피드백 등 보안 관련 UX 설계',
    ],
    type: 'activity',
  },
  {
    id: 'gdsc',
    year: '2024',
    period: '2024',
    title: '멤버',
    organization: 'GDSC-DGU',
    description: 'Google Developer Student Clubs 동국대 지부 활동',
    type: 'activity',
  },
  {
    id: 'gdgoc',
    year: '2024',
    period: '2024',
    title: 'Web/App 스터디',
    organization: 'GDGoC Dongguk',
    description: 'memoRise (단어장 앱) 개발',
    techStack: ['React', 'TypeScript'],
    bullets: [
      '팀에서 채택한 기술 스택을 실 운영 서버에 성공적으로 적용하기 위한 팀 내 프로젝트 진행',
      '새로운 기술을 채택하는 과정에서, 이론 학습보다 실제 프로젝트에 적용하는 경험이 효과적임을 인지',
    ],
    type: 'activity',
  },
  {
    id: 'aiot-festival',
    year: '2024',
    period: '2024',
    title: '참가자',
    organization: '공학 페스티벌',
    description: '로봇팔 Object Detection 시스템 개발',
    techStack: ['Python', 'YOLO'],
    bullets: [
      'YOLO 기반 실시간 물체 인식 및 로봇팔 제어 신호 변환 브리지 구현',
    ],
    type: 'activity',
  },
]
