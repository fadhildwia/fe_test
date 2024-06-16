import { UseQueryOptions, useQuery } from 'react-query';
import { axiosInstance } from './axios.config';

export interface AllRuasInterface {
  id: number | string;
  unit_id: number | string;
  ruas_name: string;
  long: number | string;
  km_awal: string;
  km_akhir: string;
  photo_url: string;
  doc_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const getAllRuas = async ({
  params
} : {
  params: BaseDefaultParamInterface;
}): Promise<APIResponse<AllRuasInterface[]>> => {
  const { data } = await axiosInstance.get('/ruas', { params });

  return data;
}

const useGetAllRuas = ({
  params,
  options
}: {
  params: BaseDefaultParamInterface;
  options?: UseQueryOptions<APIResponse<AllRuasInterface[]>>;
}) => {
  return useQuery<APIResponse<AllRuasInterface[]>>(
    ['useGetAllRuas', params],
    () => getAllRuas({ params }),
    options
  );
};

export default useGetAllRuas;
