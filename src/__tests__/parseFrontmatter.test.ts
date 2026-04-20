import { describe, it, expect } from 'vitest'
import { parseFrontmatter } from '../data/posts'

// 보호하는 동작: frontmatter 파서가 YAML-like 헤더에서 메타데이터를 추출하고,
// 태그 배열 / quoted 값 / 누락된 헤더를 올바르게 처리한다.

describe('parseFrontmatter', () => {
  const VALID_MD = `---
title: 테스트 포스트
date: 2025-04-01
tags: ["React", "TypeScript"]
description: 설명입니다
---

본문 내용입니다.
두 번째 줄.`

  it('parses_string_fields_when_valid_frontmatter_given', () => {
    const { meta } = parseFrontmatter(VALID_MD)

    expect(meta.title).toBe('테스트 포스트')
    expect(meta.date).toBe('2025-04-01')
    expect(meta.description).toBe('설명입니다')
  })

  it('parses_tags_as_array_when_bracket_notation_used', () => {
    const { meta } = parseFrontmatter(VALID_MD)

    expect(Array.isArray(meta.tags)).toBe(true)
    expect(meta.tags).toEqual(['React', 'TypeScript'])
  })

  it('separates_body_content_from_meta_when_frontmatter_present', () => {
    const { content } = parseFrontmatter(VALID_MD)

    expect(content).toContain('본문 내용입니다.')
    expect(content).not.toContain('---')
    expect(content).not.toContain('title:')
  })

  it('returns_raw_string_as_content_when_no_frontmatter_block', () => {
    const raw = '프론트매터 없는 내용'
    const { meta, content } = parseFrontmatter(raw)

    expect(content).toBe(raw)
    expect(Object.keys(meta)).toHaveLength(0)
  })

  it('strips_surrounding_quotes_from_string_values', () => {
    const raw = `---
title: "따옴표 있는 제목"
---
본문`
    const { meta } = parseFrontmatter(raw)

    expect(meta.title).toBe('따옴표 있는 제목')
  })

  it('strips_single_quotes_from_string_values', () => {
    const raw = `---
title: '작은따옴표 제목'
---
본문`
    const { meta } = parseFrontmatter(raw)

    expect(meta.title).toBe('작은따옴표 제목')
  })

  it('ignores_lines_without_colon_in_frontmatter', () => {
    const raw = `---
title: 제목
콜론없음
date: 2025-01-01
---
본문`
    const { meta } = parseFrontmatter(raw)

    expect(meta.title).toBe('제목')
    expect(meta.date).toBe('2025-01-01')
    expect('콜론없음' in meta).toBe(false)
  })

  it('falls_back_to_raw_string_when_array_parsing_fails', () => {
    const raw = `---
tags: [invalid json
---
본문`
    const { meta } = parseFrontmatter(raw)

    // 파싱 실패 시 raw string을 그대로 유지
    expect(typeof meta.tags).toBe('string')
  })
})
