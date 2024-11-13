import { MutationFunction } from '@tanstack/react-query';
import { customAxios } from '..';
import { SignupUser, User } from '@/models/user';

type SignupParams = {
  payload: SignupUser;
};

export const postSignup: MutationFunction<User, SignupParams> = async ({
  payload,
}) => {
  const response = await customAxios.post('/signup', payload);

  return response.data;
};
