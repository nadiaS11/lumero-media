import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    year: z.number(),
    service: z.enum(['short-form', 'long-form', 'faceless']),
    serviceLabel: z.string(),
    role: z.array(z.string()),
    runtime: z.string().optional(),
    aspect: z.enum(['9:16', '16:9', '2.39:1', '4:5']).default('16:9'),
    poster: z.string(),
    reel: z.string().optional(),
    outcome: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { work };
