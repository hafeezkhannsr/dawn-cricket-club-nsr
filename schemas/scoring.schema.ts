import { z } from 'zod';
export const ballSchema = z.object({ runs: z.number().min(0).max(6), isWicket: z.boolean(), isExtra: z.boolean() });
