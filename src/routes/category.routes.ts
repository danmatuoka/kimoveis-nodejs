import { Router } from "express";
import { createCategoryController, listCategoryByPropController, listCategoryController } from "../controllers/category.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoryRoutes = Router()

categoryRoutes.post('', ensureAuthMiddleware, ensureIsAdmMiddleware, createCategoryController)
categoryRoutes.get('', listCategoryController)
categoryRoutes.get('/:id/properties', listCategoryByPropController)


export default categoryRoutes