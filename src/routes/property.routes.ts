import { Router } from "express";
import { createPropertyController, listPropertyController } from "../controllers/property.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";


const propertyRoutes = Router()

propertyRoutes.post('', ensureAuthMiddleware, ensureIsAdmMiddleware, createPropertyController)
propertyRoutes.get('', listPropertyController)

export default propertyRoutes