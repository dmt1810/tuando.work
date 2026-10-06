import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
const common = {
  title: z.string(),
  description: z.string(),
  lang: z.enum(['en', 'vi']),
  slug: z.string(),
  needsReview: z.boolean().default(false),
  draft: z.boolean().default(false),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
};
const generateId = ({ entry }: { entry: string }) =>
  entry.replace(/\\/g, '/').replace(/\.mdx$/, '');
const services = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/services',
    generateId,
  }),
  schema: z.object({
    ...common,
    number: z.string(),
    deliverables: z.array(z.string()),
  }),
});
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work', generateId }),
  schema: z.object({
    ...common,
    profileId: z.string(),
    kind: z.enum(['experience', 'consulting']),
    tools: z.array(z.string()),
    selected: z.boolean().default(false),
  }),
});
const lab = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lab', generateId }),
  schema: z.object({
    ...common,
    status: z.enum(['live', 'beta', 'idea']),
    link: z.url().optional(),
    todo: z.string().optional(),
  }),
});
export const collections = { services, work, lab };
