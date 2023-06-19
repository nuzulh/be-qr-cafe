import { FindManyOptions, FindOptionsSelect, Like } from "typeorm";
import { DefaultQueries, GetRequestQuery } from "../consts";

export const getFindManyOptions = <T>(
  requestQueries: GetRequestQuery,
  optionsSelect: FindOptionsSelect<T>,
): FindManyOptions<T> => {
  const { page, limit, orderBy, order, searchBy, search } = requestQueries;
  const columns = Object.keys(optionsSelect);
  let result: FindManyOptions<T> = {
    skip: page
      ? (page - 1) * (limit || DefaultQueries.LIMIT)
      : DefaultQueries.PAGE,
    take: limit || DefaultQueries.LIMIT,
    select: optionsSelect,
  };

  if (orderBy && columns.includes(orderBy.toLowerCase())) {
    const orderOption: any = Object.assign({});
    orderOption[`${orderBy}`] = order || DefaultQueries.ORDER;
    result.order = orderOption;
  }

  if (search && searchBy && columns.includes(searchBy.toLowerCase())) {
    const whereOption: any = Object.assign({});
    whereOption[`${searchBy}`] = Like("%" + search + "%");
    result.where = whereOption;
  }

  return result;
};
