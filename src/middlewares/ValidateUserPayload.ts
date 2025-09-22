import { Request, Response, NextFunction } from 'express'
import { createUserSchema } from '../schemas/UserSchema'

export function validateUserPayload(req: Request, res: Response, next: NextFunction){

    const data = createUserSchema.safeParse(req.body)

    if(!data.success){
        return res.status(400).json({
            message: "VALIDATION_ERROR",
            error: data.error.issues
        })
    }

    next()
}