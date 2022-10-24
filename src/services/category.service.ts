import AppDataSource from "../data-source";
import Category from "../entities/category.entity";
import { AppError } from "../errors/appError";
import { ICategoryRequest } from "../interfaces/categories";

const createCategoryService = async ({name}: ICategoryRequest) => {

    const userRepository = AppDataSource.getRepository(Category)
    const listCategory = await userRepository.find()

    const category = listCategory.find((elem) => elem.name === name)

    if(!name){
        throw new AppError('Error', 400)
    }
    
    if(category){
        throw new AppError('Already exists', 400)
    }

    const newCategory = userRepository.create({
        name
    })

    await userRepository.save(newCategory)

    return newCategory
}

const listCategoryService = async(): Promise<Category[]> => {
    const userRepository = AppDataSource.getRepository(Category)

    const users = await userRepository.find()

    return users
}

const listCategoryByPropService = async(id: string) => {
   
    const userRepository = AppDataSource.getRepository(Category)
    const properties = await userRepository.findOne({where: {id: id}, relations: { properties: true }})

    // const findProp = properties.find((elem) => elem.id === id)
    // console.log(findProp)

    if(!properties){
        throw new AppError('Invalid ID', 404)
    }
    

    return properties
}

export { createCategoryService, listCategoryService, listCategoryByPropService }