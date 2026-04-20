export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Vite glob import — imports all .md files in src/posts/ as raw strings
const postModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

export function parseFrontmatter(raw: string): { meta: Record<string, string | string[]>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: raw }

  const meta: Record<string, string | string[]> = {}
  const lines = match[1].split('\n')
  for (const line of lines) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const rawValue = line.slice(colon + 1).trim()

    // Parse array values like: ["tag1", "tag2"]
    if (rawValue.startsWith('[')) {
      try {
        meta[key] = JSON.parse(rawValue.replace(/'/g, '"'))
      } catch {
        meta[key] = rawValue
      }
    } else {
      meta[key] = rawValue.replace(/^["']|["']$/g, '')
    }
  }

  return { meta, content: match[2].trim() }
}

export const posts: Post[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const slug = path.replace('../posts/', '').replace('.md', '')
    const { meta, content } = parseFrontmatter(raw)
    return {
      slug,
      title: (meta.title as string) ?? slug,
      date: (meta.date as string) ?? '',
      tags: (meta.tags as string[]) ?? [],
      description: (meta.description as string) ?? '',
      content,
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))
