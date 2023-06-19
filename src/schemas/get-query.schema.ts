import { object, string, TypeOf } from "zod";

export const getQuerySchema = object({
  query: object({
    id: string()
      .uuid("Invalid UUID for getting single data by id")
      .optional(),
    page: string()
      .regex(/^[0-9]*$/, "Page query must be number")
      .optional(),
    limit: string()
      .regex(/^[0-9]*$/, "Limit query must be number")
      .optional(),
    orderBy: string().optional(),
    order: string().optional(),
    searchBy: string().optional(),
    search: string().optional(),
  }),
});

export type GetQueryInput = TypeOf<typeof getQuerySchema>["query"];
