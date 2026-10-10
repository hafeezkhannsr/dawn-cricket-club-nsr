import { z } from 'zod';
export const matchSchema = z.object({ teamA: z.string(), teamB: z.string(), date: z.string() });
