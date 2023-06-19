import { Router } from "express";
import { validate, verifyJwt, verifyRole } from "../middleware";
import { UserController } from "../controllers";
import { getQuerySchema } from "../schemas";

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
  UserController.updateUserHandler,
);
userRoutes.delete(
  "/",
  verifyJwt,
  verifyRole,
  UserController.deleteUserHandler,
);

export default userRoutes;
