import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from './axios.config';
import { ResponseLoginInterface } from '@/types/UserInterface';

interface RuasData {
  unit_id: string;
  ruas_name: string;
  long: string;
  km_awal: string;
  km_akhir: string;
  status: boolean;
  photo: File;
  file: File;
}

export const postRuas = async (
  formData: FormData
): Promise<any> => {
  const { data } = await axiosInstance.post('/ruas', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  return data;
}

function usePostRuas(
  mutateFn?: UseMutationOptions<any,
    AxiosError<APIResponse<any>>,
    FormData
  >
) {
  return useMutation<
    any,
    AxiosError<APIResponse<any>>,
    FormData
  >(postRuas, mutateFn);
}

export default usePostRuas;
