import { Router } from "express";
import { createSchedulesController, listSchedulesController } from "../controllers/schedule.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";


const scheduleRoutes = Router()

scheduleRoutes.post('', ensureAuthMiddleware, createSchedulesController)
scheduleRoutes.get('/properties/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, listSchedulesController)

export default scheduleRoutes