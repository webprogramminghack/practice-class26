import { customAxios } from '@/api';
import { z } from 'zod';
import { userSchema } from '@/models/user';

export type UserResponse = z.infer<typeof userSchema>;

export const getUser = async () => {
  const response = await customAxios.get<UserResponse>('/me');

  return userSchema.parse(response.data);
};
