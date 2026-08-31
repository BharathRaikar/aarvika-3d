import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      price: z.number(),
      category: z.enum(['wall', 'light', 'desk', 'home', 'fig']),
      images: z.array(image()),
      material: z.string(),
      size: z.string(),
      printTime: z.string(),
      description: z.string(),
      options: z.array(z.string()),
      featured: z.boolean(),
      order: z.number(),
    }),
});

export const collections = { products };
