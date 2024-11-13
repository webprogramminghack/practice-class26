import { customAxios } from '@/api';
import { z } from 'zod';
import { googleUserSchema } from '@/models/googleUser';

export type GoogleUserResponese = z.infer<typeof googleUserSchema>;

export const getGoogleUser = async () => {
  const response = await customAxios.get<GoogleUserResponese>('/user/google');

  return googleUserSchema.parse(response.data);
};
