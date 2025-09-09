import { Request, Response, NextFunction } from 'express'
import { BodyError } from '../Errors/BodyError'
import { validateName, validateEmail, validatePassword } from '../utils/Validators'

export function validateUserPayload(req: Request, res: Response, next: NextFunction){
    const {name, email, password, ...extra} = req.body

    if(Object.keys(extra).length > 0){
        throw new BodyError('BODY_HAS_EXTRA_FIELDS')
    }

    validateName(name)
    validateEmail(email)
    validatePassword(password)

    next()
}