import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";


const ensureIsAdmMiddleware =  async (req: Request, res: Response, next: NextFunction) => {

    // const userRepository = AppDataSource.getRepository(User)

    // const user = await userRepository.findOneBy(id)

    if(!req.user.isAdm){
        return res.status(403).json({
            message: 'User is not admin'
        })
    }

    return next()
}

export default ensureIsAdmMiddleware