type SortingType = 'asc' | 'desc';

interface Link { active: boolean; label: string }

interface APIResponse<D> {
  data: D;
  message: string;
  error: boolean;
  links: Array<Link>;
  current_page?: number;
  from?: number;
  path?: string;
  per_page?: number;
  to?: number;
  total?: number;
  last_page?: number;
  prev_page_url?: string;
  next_page_url?: string;
}

type APIError = AxiosError<APIResponse<never>>;

interface MetaResponseInterface {
  current_page?: number;
  from?: number;
  path?: string;
  per_page?: number;
  to?: number;
  total?: number;
  last_page?: number;
}

interface BaseDefaultFilterInterface {
  defaultPage: number;
  defaultPerPage: number;
  defaultSort: SortingType;
  defaultSortBy: string;
}

interface BaseDefaultParamInterface {
  page: number;
  per_page: number;
}
