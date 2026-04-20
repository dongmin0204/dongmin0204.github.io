import { describe, it, expect } from 'vitest'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { skillCategories } from '../data/skills'
import { experiences } from '../data/experience'

// 보호하는 동작: UI가 의존하는 데이터 필드 계약이 항상 충족되어야 한다.
// 누군가 데이터 파일을 수정할 때 이 테스트가 회귀를 잡는다.

const VALID_PROJECT_CATEGORIES: Project['category'][] = ['ai-infra', 'fullstack', 'tool', 'hardware']
const VALID_EXPERIENCE_TYPES = ['research', 'activity', 'education', 'hackathon'] as const
const PROJECT_STRING_KEYS = ['id', 'title', 'category', 'summary', 'situation', 'task', 'insight', 'github'] as const
const PROJECT_ARRAY_KEYS = ['action', 'result'] as const
const YEAR_PATTERN = /^\d{4}$/

// ── Projects ──────────────────────────────────────────────

describe('projects data', () => {
  it('all_projects_have_required_string_fields', () => {
    for (const project of projects) {
      for (const key of PROJECT_STRING_KEYS) {
        expect(
          typeof project[key] === 'string' && (project[key] as string).length > 0,
          `project "${project.id}" — field "${key}" is empty or missing`
        ).toBe(true)
      }
    }
  })

  it('all_projects_have_nonempty_action_and_result_arrays', () => {
    for (const project of projects) {
      for (const key of PROJECT_ARRAY_KEYS) {
        const val = project[key as keyof Project]
        expect(
          Array.isArray(val) && (val as string[]).length > 0,
          `project "${project.id}" — field "${key}" must be a non-empty array`
        ).toBe(true)
      }
    }
  })

  it('all_project_categories_are_one_of_valid_values', () => {
    for (const project of projects) {
      expect(
        VALID_PROJECT_CATEGORIES,
        `project "${project.id}" has unknown category "${project.category}"`
      ).toContain(project.category)
    }
  })

  it('all_projects_have_nonempty_techstack', () => {
    for (const project of projects) {
      expect(
        project.techStack.length,
        `project "${project.id}" has empty techStack`
      ).toBeGreaterThan(0)
    }
  })

  it('all_project_github_urls_start_with_https', () => {
    for (const project of projects) {
      expect(
        project.github,
        `project "${project.id}" github URL should start with https://`
      ).toMatch(/^https:\/\//)
    }
  })

  it('all_project_ids_are_unique', () => {
    const ids = projects.map(p => p.id)
    const unique = new Set(ids)

    expect(unique.size).toBe(ids.length)
  })

  it('at_least_one_project_is_featured', () => {
    const featured = projects.filter(p => p.featured)

    expect(featured.length).toBeGreaterThan(0)
  })
})

// ── Skills ────────────────────────────────────────────────

describe('skillCategories data', () => {
  it('all_categories_have_at_least_one_skill', () => {
    for (const cat of skillCategories) {
      expect(
        cat.skills.length,
        `category "${cat.id}" has no skills`
      ).toBeGreaterThan(0)
    }
  })

  it('all_category_ids_are_unique', () => {
    const ids = skillCategories.map(c => c.id)
    const unique = new Set(ids)

    expect(unique.size).toBe(ids.length)
  })

  it('all_category_labels_are_nonempty', () => {
    for (const cat of skillCategories) {
      expect(
        cat.label.length,
        `category "${cat.id}" has empty label`
      ).toBeGreaterThan(0)
    }
  })
})

// ── Experiences ───────────────────────────────────────────

describe('experiences data', () => {
  it('all_experiences_have_valid_type', () => {
    for (const exp of experiences) {
      expect(
        VALID_EXPERIENCE_TYPES as readonly string[],
        `experience "${exp.id}" has unknown type "${exp.type}"`
      ).toContain(exp.type)
    }
  })

  it('all_experience_years_are_four_digit_strings', () => {
    for (const exp of experiences) {
      expect(
        YEAR_PATTERN.test(exp.year),
        `experience "${exp.id}" year "${exp.year}" is not a 4-digit string`
      ).toBe(true)
    }
  })

  it('all_experience_ids_are_unique', () => {
    const ids = experiences.map(e => e.id)
    const unique = new Set(ids)

    expect(unique.size).toBe(ids.length)
  })

  it('all_experiences_have_nonempty_description', () => {
    for (const exp of experiences) {
      expect(
        exp.description.length,
        `experience "${exp.id}" has empty description`
      ).toBeGreaterThan(0)
    }
  })
})
