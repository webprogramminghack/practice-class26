import { z } from 'zod';

export const googleUserSchema = z.object({
  uid: z.string(),
  name: z.string(),
  email: z.string(),
  photoURL: z.string(),
});

export type GoogleUser = z.infer<typeof googleUserSchema>;
