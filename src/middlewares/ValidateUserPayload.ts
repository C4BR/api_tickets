import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { EMAIL_MAX_LENGTH, EMAIL_MIN_LENGTH, NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '../config/Validation'

const createUserSchema = z.object({
    name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
    email: z.email().min(EMAIL_MIN_LENGTH).max(EMAIL_MAX_LENGTH),
    password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
    "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character")
})  

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