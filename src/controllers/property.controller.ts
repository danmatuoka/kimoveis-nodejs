import { Request, Response } from "express";
import { createPropertyService, listPropertyService } from "../services/property.service";



const createPropertyController = async(req: Request, res: Response) => {
    const createProperty = await createPropertyService(req.body)

    return res.status(201).json(createProperty)
}

const listPropertyController = async(req: Request, res: Response) => {
    const property = await listPropertyService()
    return res.json(property)
}


export { createPropertyController, listPropertyController }