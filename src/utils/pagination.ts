import { DefaultQueries, PaginationResponse } from "../consts";

export const paginateResponse = (
  count: number,
  page?: number,
  limit?: number,
): PaginationResponse => {
  const current = page || DefaultQueries.PAGE;
  const last = Math.ceil(count / (limit || DefaultQueries.LIMIT));
  const next = current + 1 > last ? undefined : current + 1;
  const prev = current - 1 < 1 ? undefined : current - 1;

  return { count, current, next, prev, last };
};
