import { z } from 'zod';
export const playerSchema = z.object({ name: z.string().min(2), fatherName: z.string().optional(), cnic: z.string().optional(), dob: z.string().optional(), phone: z.string().optional(), email: z.string().email().optional() });
