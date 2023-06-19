import { object, string, TypeOf } from "zod";

export const getQuerySchema = object({
  query: object({
    id: string()
      .uuid("Invalid UUID"),
    page: string()
      .regex(/^[0-9]*$/, "Page query must be number"),
    limit: string()
      .regex(/^[0-9]*$/, "Limit query must be number"),
    orderBy: string(),
    order: string(),
    searchBy: string(),
    search: string(),
  }).partial(),
});

export type GetQueryInput = TypeOf<typeof getQuerySchema>["query"];
