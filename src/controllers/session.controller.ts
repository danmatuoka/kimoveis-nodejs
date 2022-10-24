import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users'
import createSessionService from '../services/session.service'


const createSessionController = async(req: Request, res: Response) => {
   
    const data: IUserLogin = req.body
    const token = await createSessionService(data)
    return res.json({token})
    
}

export { createSessionController }