import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from './axios.config';
import { ResponseLoginInterface } from '@/types/UserInterface';

interface PostBodyLoginInterface {
  username: string;
  password: string;
}

export const postLogin = async (
  body: PostBodyLoginInterface
): Promise<ResponseLoginInterface> => {
  const { data } = await axiosInstance.post('/login', body);

  return data;
}

function usePostLogin(
  mutateFn?: UseMutationOptions<ResponseLoginInterface,
    AxiosError<APIResponse<ResponseLoginInterface>>,
    PostBodyLoginInterface
  >
) {
  return useMutation<
    ResponseLoginInterface,
    AxiosError<APIResponse<ResponseLoginInterface>>,
    PostBodyLoginInterface
  >(postLogin, mutateFn);
}

export default usePostLogin;
