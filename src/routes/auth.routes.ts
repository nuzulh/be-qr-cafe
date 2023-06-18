import { Router } from "express";
import { validate, verifyJwt, verifyRole } from "../middleware";
import { signInUserSchema, signUpUserSchema } from "../schemas";
import { AuthController } from "../controllers";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  verifyJwt,
  verifyRole,
  validate(signUpUserSchema),
  AuthController.signUpUserHandler,
);
authRoutes.post(
  "/signin",
  validate(signInUserSchema),
  AuthController.signInUserHandler,
);
authRoutes.get(
  "/signout",
  verifyJwt,
  AuthController.signOutHandler,
);

export default authRoutes;
