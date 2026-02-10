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

export const collections = {
  agents: agentsCollection,
};
