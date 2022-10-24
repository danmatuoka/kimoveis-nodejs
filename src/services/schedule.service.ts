import AppDataSource from "../data-source";
import { Property } from "../entities/properties.entities";
import { Schedule_user_propertie } from "../entities/schedules_user_properties.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";
import { ISchedule, IScheduleRequest } from "../interfaces/schedules";


const createScheduleService = async ({
    date,
    hour,
    propertyId,
    userId
  }: ISchedule) => {

    // if (!date || !hour || !propertyId) {
    //   throw new AppError("Missing body informations", 400);
    // }
  
    const scheduleRepo = AppDataSource.getRepository(Schedule_user_propertie);
    const propertiesRepo = AppDataSource.getRepository(Property);
    const userRepo = AppDataSource.getRepository(User);
  
    const property = await propertiesRepo.findOneBy({id: propertyId});
    if (!property) {
      throw new AppError("Invalid Property Id", 404);
    }

    const user = await userRepo.findOneBy({id: userId});
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const verifyHour = +hour.toString().split(":")[0]
    if(verifyHour < 8 || verifyHour >= 18) {
      throw new AppError("Invalid hour", 400);
    }

    const newDate = new Date(`${date},${hour}`)
    if(newDate.toString() === "Invalid Date" || newDate.getDay() === 0 || newDate.getDay() === 6){
      throw new AppError("Invalid Date", 400);
    }

    const schedule = await scheduleRepo.find();
    const scheduleExists = schedule.find((schedule) => schedule)

    if (scheduleExists) {
      throw new AppError("Please choose another date or time", 400);
    }
  
    // if (Number(hour.slice(0, 2)) < 8 || Number(hour.slice(0, 2)) > 18) {
    //   throw new AppError("Error", 400);
    // } 
  
  
    const newSchedule = scheduleRepo.create({
      hour,
      user: user,
      properties: property,
      date
    });
  
    await scheduleRepo.save(newSchedule);
  
    return newSchedule;
  }

  const listScheduleService = async (id: string) => {
    const propertiesRepo = AppDataSource.getRepository(Property);
  
    const properties = await propertiesRepo.find();
  
    const property = properties.find((elem) => elem.id === id);
  
    if (!property) {
      throw new AppError("Incorrect Id", 404);
    }
  
    if(property.schedules.length === 0){
      throw new AppError("This property don't have schedules", 404)
    }
  
    return property
  }


  export { createScheduleService, listScheduleService }