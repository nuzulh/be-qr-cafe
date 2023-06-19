import { object, string, z, TypeOf } from "zod";
import { UserRoles } from "../consts";

export const signUpUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    username: string()
      .min(4, "Username must be more than 4 characters")
      .max(30, "Username must be less that 30 characters")
      .regex(
        /^[-\w\.\$@\*\!]{4,30}$/,
        "Username can not contains space",
      ),
    email: string().email("Invalid email address"),
    phoneNumber: string()
      .regex(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        , "Invalid phone number",
      ),
    password: string()
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: string(),
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
    }).min(6, "Invalid username or password"),
  }),
});

export type SignUpUserInput = Omit<
  TypeOf<typeof signUpUserSchema>["body"],
  "passwordConfirm"
>;

export type SignInUserInput = TypeOf<typeof signInUserSchema>["body"];
