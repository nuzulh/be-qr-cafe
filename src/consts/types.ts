import { FindOptionsOrderValue } from "typeorm";

export declare type GetRequestQuery = {
  id?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: FindOptionsOrderValue;
  searchBy?: string;
  search?: string;
};

export declare type PaginationResponse = {
  count?: number;
  current?: number;
  next?: number;
  prev?: number;
  last?: number;
};

export declare type JsonResponse<T> = {
  error: boolean;
  message: string;
  data?: Partial<T> | Partial<T>[] | null;
  pagination?: PaginationResponse;
};
