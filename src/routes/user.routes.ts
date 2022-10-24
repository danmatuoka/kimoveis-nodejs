import { Router } from "express";
import { createUserController, listUsersController, softDeleteUserController, updateUserController } from "../controllers/user.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensureUpdateMiddleware from "../middlewares/ensureUpdate.middleware";

const userRoutes = Router()

userRoutes.post("", createUserController)
userRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController)
userRoutes.patch("/:id", ensureAuthMiddleware, ensureUpdateMiddleware, updateUserController)
userRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, softDeleteUserController)


export default userRoutes