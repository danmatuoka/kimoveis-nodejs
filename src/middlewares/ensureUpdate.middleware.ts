import { Request, Response, NextFunction } from "express";



const ensureIsAdmMiddleware =  async (req: Request, res: Response, next: NextFunction) => {

    
    if(req.body.isAdm !== undefined){
        return res.status(401).json({
            message: 'Not possible'
        })
    }
    
    if(req.body.isActive !== undefined){
        return res.status(401).json({
            message: 'Not possible'
        })
    }
    
    if(req.body.id !== undefined){
        return res.status(401).json({
            message: 'Not possible'
        })
    }
    
    if(req.user.isAdm || req.params.id !== req.user.id){
        return next()
          
    }
    
    return res.status(401).json({
        message: "Invalid",
      });
}

export default ensureIsAdmMiddleware