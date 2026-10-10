import { z } from 'zod';
export const tournamentSchema = z.object({ name: z.string(), startDate: z.string(), endDate: z.string() });
