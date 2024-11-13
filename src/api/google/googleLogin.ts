import { MutationFunction } from '@tanstack/react-query';
import { customAxios } from '..';
import { User } from '@/models/user';

type googleLoginParams = {
  payload: {
    id_token: string;
  };
};

export const googleLogin: MutationFunction<User, googleLoginParams> = async ({
  payload,
}) => {
  const response = await customAxios.post('/google-login', payload);

  return response.data;
};
