import { customAxios } from '..';

export const postLogout = async () => {
  const response = await customAxios.post('/logout');

  return response.data;
};
