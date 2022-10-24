import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import { createUserService, listUsersService, softDeleteUserService, updateUserService } from "../services/user.service";
import { instanceToPlain } from "class-transformer";

const createUserController = async(req: Request, res: Response) => {
        
    const user: IUserRequest = req.body
    const createdUser = await createUserService(user)

    return res.status(201).json(instanceToPlain(createdUser))
 
}

const listUsersController = async(req:Request, res:Response) => {
    const users = await listUsersService()
    return res.json(instanceToPlain(users))
}

const updateUserController = async (req: Request, res: Response) => {

        const user: IUserUpdate = req.body
        const id: string = req.params.id
        const updatedUser = await updateUserService(user, id)
        
        if(updatedUser instanceof User){
            return res.json(updatedUser)
        }
        return res.status(updatedUser[1] as number).json({
            message: updatedUser[0]
        })
    
}

const softDeleteUserController = async (req: Request, res: Response) => {
    
        const id: string = req.params.id
        const deletedUser = await softDeleteUserService(id)
        
        return res.status(204).json({
            message: deletedUser
        })
    // } catch (error) {
    //     if(error instanceof Error){
    //         return res.status(404).json({
    //             message: error.message
    //         })
    //     }
    // }
}

export { createUserController, listUsersController, updateUserController, softDeleteUserController }