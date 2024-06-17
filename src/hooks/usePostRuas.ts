import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from './axios.config';

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
