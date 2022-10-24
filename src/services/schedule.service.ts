import AppDataSource from "../data-source";
import { Property } from "../entities/properties.entities";
import { Schedule_user_propertie } from "../entities/schedules_user_properties.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { IScheduleRequest } from "../interfaces/schedules";


const createScheduleService = async ({
    date,
    hour,
    propertyId,
    userId
  }: IScheduleRequest) => {

    if (!date || !hour || !propertyId) {
      throw new AppError("Missing body informations", 400);
    }
  
    const scheduleRepo = AppDataSource.getRepository(Schedule_user_propertie);
    const propertiesRepo = AppDataSource.getRepository(Property);
    const userRepo = AppDataSource.getRepository(User);
  
    const schedules = await scheduleRepo.find();
    const properties = await propertiesRepo.find();
    const users = await userRepo.find();
  
    const property = properties.find((e) => e.id === propertyId);
    if (!property) {
      throw new AppError("Invalid Property Id", 404);
    }

    const schedule = schedules.find((e) => e.hour === hour && e.date === date);
    if (schedule) {
      throw new AppError("Please choose another time", 400);
    }
  
    if (Number(hour.slice(0, 2)) < 8 || Number(hour.slice(0, 2)) > 18) {
      throw new AppError("Error", 400);
    } 
  
    const user = users.find((e) => e.id === userId);
  
    const newSchedule = scheduleRepo.create({
      hour,
      user,
      properties: property,
      date,
    });
  
    await scheduleRepo.save(newSchedule);
  
    return newSchedule;
  }

  const listScheduleService = async (id: string) => {
    const propertiesRepo = AppDataSource.getRepository(Property);
  
    const properties = await propertiesRepo.find();
  
    const property = properties.find((e) => e.id === id);
  
    if (!property) {
      throw new AppError("Incorrect Id", 404);
    }
  
    if(property.schedules.length === 0){
      throw new AppError("This property don't have schedules", 404)
    }
  
    return property.schedules
  }


  export { createScheduleService, listScheduleService }