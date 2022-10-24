import AppDataSource from "../data-source";
import { Address } from "../entities/adresses.entities";
import Category from "../entities/category.entity";
import { Property } from "../entities/properties.entities";
import { AppError } from "../errors/appError";
import { IPropertyRequest } from "../interfaces/properties";


const createPropertyService = async ({ value, size, address, categoryId }:IPropertyRequest) => {

    const propRepo = AppDataSource.getRepository(Property);
    const categoryRepo = AppDataSource.getRepository(Category);
    const addressRepo = AppDataSource.getRepository(Address);

    let d: Date = new Date();
    const date: string = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  
    const adresses = await addressRepo.find();
    const categories = await categoryRepo.find();
    const category = categories.find((e) => e.id === categoryId);
  
    if (!category) {
      throw new AppError("Category not exists", 404);
    }
  
    const addressAlreadyExists = adresses.find(
      (e) => e.district === address.district
    );
  
    if (addressAlreadyExists) {
      throw new AppError("This address already registred!", 400);
    }
  
    const properties = await propRepo.find();
    const property = properties.find((e) => e.value === value && e.size === size);
  
    if (property) {
      throw new AppError("This property already exists", 400);
    }
  
    const newAddress = addressRepo.create({
      district: address.district,
      zipCode: address.zipCode,
      number: address.number,
      city: address.city,
      state: address.state,
    });
  
    await addressRepo.save(newAddress);
  
    const newProperty: Property = propRepo.create({
      sold: false,
      value,
      size,
      createdAt: date,
      updatedAt: date,
      address: newAddress,
      category: category,
    });
  
    await propRepo.save(newProperty);
  
    return newProperty;
  
}

const listPropertyService = async(): Promise<Property[]> => {
    const propRepository = AppDataSource.getRepository(Property)

    const users = await propRepository.find()

    return users
}

export { createPropertyService, listPropertyService }