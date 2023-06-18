import { Router } from "express";
import { verifyJwt } from "../middleware";
import { UserController } from "../controllers";

const userRoutes = Router();

userRoutes.get("/", verifyJwt, UserController.getUsersHandler);
userRoutes.get("/roles", verifyJwt, UserController.getUserRolesHandler);
userRoutes.patch("/", verifyJwt, UserController.updateUserHandler);
userRoutes.delete("/", verifyJwt, UserController.deleteUserHandler);

export default userRoutes;
