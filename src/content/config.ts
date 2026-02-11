import { defineCollection, z } from 'astro:content';

const agentsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    source_url: z.string().optional(),
    description: z.string(),
    tech_stack: z.array(z.string()).optional(),
    problem_solved: z.string(),
    target_audience: z.string(),
    inputs: z.array(z.string()),
    outputs: z.array(z.string()),
    workflow_steps: z.array(z.string()),
    sample_prompt: z.string().optional(),
    tools_used: z.array(z.string()),
    alternatives: z.array(z.string()),
    is_open_source: z.string(),
    can_self_host: z.string(),
    skill_level: z.string(),
    last_updated: z.date(),
  }),
});

const blogsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('AI Agents Team'),
    image: z.string().optional(),
    image_alt: z.string().optional(),
    published_date: z.date(),
    updated_date: z.date().optional(),
    read_time: z.number(),
    featured: z.boolean().default(false),
    related_agents: z.array(z.string()).optional(),
    related_posts: z.array(z.string()).optional(),
  }),
});

export const collections = {
  agents: agentsCollection,
  blogs: blogsCollection,
};
