import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useActiveSection } from '../hooks/useActiveSection'

// 보호하는 동작: 뷰포트에 진입한 섹션 ID를 반환하고,
// unmount 시 IntersectionObserver를 정리한다.

// ── IntersectionObserver mock ─────────────────────────────

type IOCallback = (entries: IntersectionObserverEntry[]) => void

const observeMock = vi.fn()
const disconnectMock = vi.fn()

/** 등록된 callback들을 저장 — 테스트에서 직접 발화한다 */
const callbacksByElement = new Map<Element, IOCallback>()

beforeEach(() => {
  observeMock.mockReset()
  disconnectMock.mockReset()
  callbacksByElement.clear()

  // `new IntersectionObserver(...)` 형태로 호출되므로 class로 mock
  vi.stubGlobal('IntersectionObserver', class {
    private cb: IOCallback
    constructor(callback: IOCallback) { this.cb = callback }
    observe(el: Element) {
      observeMock(el)
      callbacksByElement.set(el, this.cb)
    }
    disconnect() { disconnectMock() }
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
  // DOM 초기화
  document.body.innerHTML = ''
})

/** 테스트용 섹션 DOM 엘리먼트 생성 헬퍼 */
function createSection(id: string): HTMLElement {
  const el = document.createElement('div')
  el.id = id
  document.body.appendChild(el)
  return el
}

function fireIntersection(el: Element, isIntersecting: boolean) {
  const callback = callbacksByElement.get(el)
  if (!callback) throw new Error(`No observer registered for #${el.id}`)
  act(() => {
    callback([{ isIntersecting, target: el } as unknown as IntersectionObserverEntry])
  })
}

// ── Tests ─────────────────────────────────────────────────

describe('useActiveSection', () => {
  it('returns_first_section_id_when_initialized', () => {
    createSection('about')
    createSection('skills')

    const { result } = renderHook(() =>
      useActiveSection(['about', 'skills'])
    )

    expect(result.current).toBe('about')
  })

  it('updates_active_section_when_intersection_fires', () => {
    const aboutEl = createSection('about')
    const skillsEl = createSection('skills')

    const { result } = renderHook(() =>
      useActiveSection(['about', 'skills'])
    )

    fireIntersection(skillsEl, true)
    expect(result.current).toBe('skills')

    fireIntersection(aboutEl, true)
    expect(result.current).toBe('about')
  })

  it('does_not_change_active_section_when_element_leaves_viewport', () => {
    const aboutEl = createSection('about')
    const skillsEl = createSection('skills')

    const { result } = renderHook(() =>
      useActiveSection(['about', 'skills'])
    )

    // skills로 이동
    fireIntersection(skillsEl, true)
    expect(result.current).toBe('skills')

    // about이 뷰포트 밖으로 나감 — activeSection은 바뀌지 않아야 한다
    fireIntersection(aboutEl, false)
    expect(result.current).toBe('skills')
  })

  it('disconnects_all_observers_when_unmounted', () => {
    createSection('about')
    createSection('skills')
    createSection('projects')

    const { unmount } = renderHook(() =>
      useActiveSection(['about', 'skills', 'projects'])
    )

    unmount()

    // 등록된 섹션 수만큼 disconnect가 호출되어야 한다
    expect(disconnectMock).toHaveBeenCalledTimes(3)
  })

  it('returns_empty_string_when_no_section_ids_given', () => {
    const { result } = renderHook(() => useActiveSection([]))

    expect(result.current).toBe('')
  })
})
