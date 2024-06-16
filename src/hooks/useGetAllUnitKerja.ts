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

export interface UnitInterface {
  id: number | string;
  unit: string
  status: number | string;
  ruas: Array<RuasInterface>;
}

export const getAllUnitKerja = async (): Promise<APIResponse<UnitInterface[]>> => {
  const { data } = await axiosInstance.get('/unit');

  return data;
}

const useGetAllUnitKerja = ({
  options
}: {
  options?: UseQueryOptions<APIResponse<UnitInterface[]>>;
}) => {
  return useQuery<APIResponse<UnitInterface[]>>(
    ['useGetAllUnitKerja'],
    () => getAllUnitKerja(),
    options
  );
};

export default useGetAllUnitKerja;
