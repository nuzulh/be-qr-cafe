import { JsonResponse } from "../consts";

export const jsonResponse = <T>(
  args: JsonResponse<T>,
): JsonResponse<T> => {
  let result: JsonResponse<T> = {
    error: args.error,
    message: args.message,
  };

  if (args.data) result.data = args.data;
  if (args.pagination) result.pagination = args.pagination;

  return result;
};
