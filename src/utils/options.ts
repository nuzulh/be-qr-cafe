import { EntityMetadata, FindManyOptions, Like } from "typeorm";
import { DefaultQueries, GetRequestQuery } from "../consts";

export const getFindManyOptions = <T>(
  requestQueries: GetRequestQuery,
  metadata: EntityMetadata,
): FindManyOptions<T> => {
  const { page, limit, orderBy, order, searchBy, search } = requestQueries;
  const columns = metadata.columns.map((col) => col.propertyName);
  const result: FindManyOptions<T> = Object.assign({
    skip: page
      ? (page - 1) * (limit || DefaultQueries.LIMIT)
      : DefaultQueries.PAGE,
    take: limit || DefaultQueries.LIMIT,
  });

  if (orderBy && columns.includes(orderBy.toLowerCase())) {
    const orderOption: any = Object.assign({});
    orderOption[`${orderBy}`] = order || DefaultQueries.ORDER;
    result["order"] = orderOption;
  }

  if (search && searchBy && columns.includes(searchBy.toLowerCase())) {
    const whereOption: any = Object.assign({});
    whereOption[`${searchBy}`] = Like("%" + search + "%");
    result["where"] = whereOption;
  }

  return result;
};
