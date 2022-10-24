import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import { createScheduleService, listScheduleService } from "../services/schedule.service";
import jwt from "jsonwebtoken"


const createSchedulesController = async (req: Request, res: Response) => {

      const { propertyId, date, hour }: IScheduleRequest = req.body;

      const { authorization } = req.headers

    const token = authorization!.split(" ")[1]

    const { id } = jwt.decode(token) as { id: string }

    const userId = id
  
      const schedule = await createScheduleService({
        userId,
        propertyId,
        date,
        hour,
      });
  
      return res.status(201).send(schedule);
  }


const listSchedulesController = async (req: Request, res: Response) => {

      const { id } = req.params;
  
      const schedules = await listScheduleService(id);
  
      return res.send(schedules);
  };


export { createSchedulesController, listSchedulesController }