import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from './axios.config';
import { ResponseLoginInterface } from '@/types/UserInterface';

interface DeleteRuasInterface {
  status: boolean;
  message: string;
}

export const deleteRuas = async (
  id: number
): Promise<DeleteRuasInterface> => {
  const { data } = await axiosInstance.delete(`/ruas/${id}`);

  return data;
}

function useDeleteRuas(
  mutateFn?: UseMutationOptions<DeleteRuasInterface, AxiosError, number>
) {
  return useMutation<
    DeleteRuasInterface,
    AxiosError,
    number
  >(deleteRuas, mutateFn);
}

export default useDeleteRuas;
