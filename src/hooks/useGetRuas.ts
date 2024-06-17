import { UseQueryOptions, useQuery } from 'react-query';
import { axiosInstance } from './axios.config';

export interface RuasInterface {
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

export const getRuas = async ({
  id
}: {
  id: string | number;
}): Promise<APIResponse<RuasInterface>> => {
  const { data } = await axiosInstance.get(`/ruas/${id}`);

  return data;
}

const useGetRuas = ({
  id,
  options
}: {
  id: string | number;
  options?: UseQueryOptions<APIResponse<RuasInterface>>;
}) => {
  return useQuery<APIResponse<RuasInterface>>(
    ['useGetRuas', id],
    () => getRuas({ id }),
    options
  );
};

export default useGetRuas;
