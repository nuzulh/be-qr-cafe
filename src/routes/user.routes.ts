import { Router } from "express";
import { validate, verifyJwt, verifyRole } from "../middleware";
import { UserController } from "../controllers";
import { deleteUserSchema, getQuerySchema, updateUserSchema } from "../schemas";

const userRoutes = Router();

userRoutes.get(
  "/",
  verifyJwt,
  verifyRole,
  validate(getQuerySchema),
  UserController.getUsersHandler,
);
userRoutes.get(
  "/roles",
  verifyJwt,
  verifyRole,
  UserController.getUserRolesHandler,
);
userRoutes.patch(
  "/",
  verifyJwt,
  verifyRole,
  validate(updateUserSchema),
  UserController.updateUserHandler,
);
userRoutes.delete(
  "/",
  verifyJwt,
  verifyRole,
  validate(deleteUserSchema),
  UserController.deleteUserHandler,
);

export default userRoutes;
