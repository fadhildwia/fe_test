import { AxiosError } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import axiosInstance from './axios.config';

interface PostUpdateRuasInterface {
  id: string | number;
  formData: FormData;
}

export const postUpdateRuas = async ({
  id,
  formData
}: PostUpdateRuasInterface): Promise<any> => {
  const { data } = await axiosInstance.post(`/ruas/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });

  return data;
}

function usePostUpdateRuas(
  mutateFn?: UseMutationOptions<
    any,
    AxiosError<APIResponse<any>>,
    PostUpdateRuasInterface
  >
) {
  return useMutation<
    any,
    AxiosError<APIResponse<any>>,
    PostUpdateRuasInterface
  >(postUpdateRuas, mutateFn);
}

export default usePostUpdateRuas;
