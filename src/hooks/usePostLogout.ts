import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from './axios.config';
import { ResponseLoginInterface } from '@/types/UserInterface';

interface postLogoutInterface {
  status: boolean;
  message: string;
}

export const postLogout = async (): Promise<postLogoutInterface> => {
  const { data } = await axiosInstance.post('/logout');

  return data;
}

function usePostLogout(
  mutateFn?: UseMutationOptions<postLogoutInterface, AxiosError>
) {
  return useMutation<
    postLogoutInterface,
    AxiosError
  >(postLogout, mutateFn);
}

export default usePostLogout;
