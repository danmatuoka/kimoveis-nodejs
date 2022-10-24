import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import { createCategoryService, listCategoryByPropService, listCategoryService } from "../services/category.service";



const createCategoryController = async(req: Request, res: Response) => {

    const createCategory = await createCategoryService(req.body)

    return res.status(201).json(createCategory)
}

const listCategoryController = async(req: Request, res: Response) => {
    const category = await listCategoryService()
    return res.json(category)
}

const listCategoryByPropController = async(req: Request, res: Response) => {
    
    const id = req.params.id
    const category = await listCategoryByPropService(id)
    return res.json(category)
}

export { createCategoryController, listCategoryController, listCategoryByPropController }