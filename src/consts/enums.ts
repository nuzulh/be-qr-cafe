export enum ResponseMessages {
  POST_SUCCESS = "Data inserted successfully",
  POST_FAILED = "Failed to insert data",
  GET_SUCCESS = "Data stored successfully",
  GET_FAILED = "Failed to store data",
  PATCH_SUCCESS = "Data updated successfully",
  PATCH_FAILED = "Failed to update data",
  SIGNIN_SUCCESS = "User logged in successfully",
  SIGNIN_FAILED = "Failed to log in",
  SIGNUP_SUCCESS = "User registrated successfully",
  SIGNUP_FAILED = "Failed to register",
  SIGNOUT_SUCCESS = "User logged out successfully",
  UNAUTHORIZED = "Unauthorized request",
  BAD_REQUEST = "Bad request",
  UNKNOWN = "Unknown error",
  NOT_FOUND = "Not found",
  VALIDATION_FAILED = "Error appears while validating request data",
  USER_EXISTS = "User already exists",
  INVALID_CREDENTIALS = "Invalid username or password",
}

export enum UserRoles {
  ADMIN = "admin",
  CASHIER = "cashier",
  CONSUMER = "consumer",
  TEMP = "temp",
}

export enum TableCategories {
  REGULAR = "regular",
  VIP = "vip",
}

export enum TableStatuses {
  FREE = "free",
  INPROCESS = "inprocess",
}

export enum OrderStatuses {
  NEW = "new",
  CONFIRMED = "confirmed",
  PAYED = "payed",
  READY = "ready",
  DONE = "done",
  CANCELED = "canceled",
}

export enum ProductCategories {
  FOOD = "food",
  DRINK = "drink",
  SNACK = "snack",
}

export enum ProductSizes {
  S = "S",
  R = "R",
  L = "L",
}

export enum DefaultQueries {
  PAGE = 1,
  LIMIT = 10,
  ORDER_BY = "created_at",
  ORDER = "DESC",
  SEARCH_BY = "created_at",
}
