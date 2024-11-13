import { MutationFunction } from '@tanstack/react-query';
import { customAxios } from '..';
import { LoginUser, User } from '@/models/user';

type LoginParams = {
  payload: LoginUser;
};

export const postLogin: MutationFunction<User, LoginParams> = async ({
  payload,
}) => {
  const response = await customAxios.post('/login', payload);

  return response.data;
};
