import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phoneNumber: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type LoginUser = Omit<User, 'id' | 'name' | 'phoneNumber'>;
export type SignupUser = Omit<User, 'id'>;
