import { object, string, z, TypeOf } from "zod";
import { UserRoles } from "../consts";

export const signUpUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    username: string({
      required_error: "Username is required",
    })
      .min(4, "Username must be more than 4 characters")
      .max(32, "Username must be less than 32 characters")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username must be letters and numbers only",
      ),
    email: string({
      required_error: "Email address is required",
    }).email("Invalid email address"),
    phoneNumber: string({
      required_error: "Phone number is required",
    })
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        , "Invalid phone number",
      ),
    password: string({
      required_error: "Password is required",
    })
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string({
      required_error: "Password confirm is required",
    }),
    role: z.optional(z.nativeEnum(UserRoles)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  }),
});

export const signInUserSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    password: string({
      required_error: "Password is required",
    })
      .min(6, "Invalid username or password")
  }),
});

export const updateUserSchema = object({
  query: object({
    id: string({
      required_error: "Id query is required",
    }).uuid("Invalid UUID"),
  }),
  body: object({
    name: string(),
    username: string()
      .min(4, "Username must be more than 4 characters")
      .max(30, "Username must be more less than 32 characters")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username must be letters and numbers only",
      ),
    email: string()
      .email("Invalid email address"),
    phoneNumber: string()
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        , "Invalid phone number",
      ),
    password: string()
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    role: z.optional(z.nativeEnum(UserRoles)),
  })
    .partial()
    .refine((data) =>
      !!data.name ||
      !!data.username ||
      !!data.email ||
      !!data.phoneNumber ||
      !!data.password ||
      !!data.role, {
      message: "Request body must contains at least one column of user entity to be updated",
    },
    ),
});

export const deleteUserSchema = object({
  query: object({
    id: string({
      required_error: "Id query is required",
    }).uuid("Invalid UUID"),
  }),
});

export type SignUpUserInput = Omit<
  TypeOf<typeof signUpUserSchema>["body"],
  "passwordConfirm"
>;

export type SignInUserInput = TypeOf<typeof signInUserSchema>["body"];

export type UpdateUserIdInput = TypeOf<typeof updateUserSchema>["query"]["id"];

export type UpdateUserInput = TypeOf<typeof updateUserSchema>["body"];

export type DeleteUserIdInput = TypeOf<typeof deleteUserSchema>["query"]["id"];
