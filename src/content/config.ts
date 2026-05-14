// src/content/config.ts
// ─────────────────────────────────────────────────────────────────
// Defines the schema for the 'projects' content collection.
// Astro validates every Markdown file's frontmatter against this schema.
// Run `npm run dev` to see validation errors immediately.

import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    date:        z.string(),                                   // ISO 8601: "2024-01-15"
    platform:    z.enum([
                   'HackTheBox', 'TryHackMe', 'Home Lab',
                   'CTF', 'Client Engagement', 'VulnHub', 'Other'
                 ]),
    difficulty:  z.enum(['Easy', 'Medium', 'Hard', 'Insane', 'N/A']),
    status:      z.enum(['Complete', 'In Progress', 'Redacted']),
    category:    z.array(z.string()),
    tools:       z.array(z.string()),
    cvss_score:  z.number().min(0).max(10).optional(),
    thumbnail:   z.string().optional(),
    featured:    z.boolean().default(false),
  }),
});

export const collections = {
  projects: projectsCollection,
};
