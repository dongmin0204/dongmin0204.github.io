export interface SkillSubGroup {
  label: string
  skills: string[]
}

export interface SkillCategory {
  id: string
  label: string
  icon: string
  skills: string[]             // flat list (tests·fallback용)
  subGroups?: SkillSubGroup[]  // 상세 표시용
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'cs',
    label: 'CS & 기본기',
    icon: 'FaCode',
    // 테스트·fallback용 flat list
    skills: ['알고리즘', '자료구조', '운영체제', '네트워크', 'DB', 'TDD', '동시성 제어'],
    // 상세 표시용 sub-groups
    subGroups: [
      {
        label: '알고리즘 & 수학',
        skills: ['EMA(지수이동평균)', 'EPLB 부하 분산', '시간복잡도 분석', '탐색·정렬'],
      },
      {
        label: '자료구조',
        skills: ['큐·스택', '해시맵', '트리', '그래프'],
      },
      {
        label: '운영체제',
        skills: ['프로세스·스레드', '파일시스템', '동시성 제어', 'ThreadLocal'],
      },
      {
        label: '네트워크',
        skills: ['TCP/IP', 'HTTP', 'K8s 네트워킹', 'NodePort·Service'],
      },
      {
        label: '데이터베이스',
        skills: ['인덱스 튜닝', '트랜잭션', '데이터 일관성', 'NodePort Reconcile'],
      },
      {
        label: '테스트 & 설계',
        skills: ['TDD', '테스트 격리', '슬라이스 테스트', '트레이드오프 분석'],
      },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Server',
    icon: 'FaServer',
    skills: ['Python', 'FastAPI', 'Node.js', 'TypeScript', 'Spring Boot'],
  },
  {
    id: 'infra',
    label: 'Infra & DevOps',
    icon: 'FaDocker',
    skills: ['Kubernetes', 'Docker', 'Helm', 'Redis', 'MySQL', 'NFS', 'CI/CD'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'FaReact',
    skills: ['React', 'TypeScript', 'JavaScript', 'Vite', 'Tailwind CSS'],
  },
  {
    id: 'ai',
    label: 'AI & ML',
    icon: 'FaBrain',
    skills: ['YOLO', 'Object Detection', 'DeepSeek EPLB', 'EMA 예측', 'NeRF'],
  },
]
