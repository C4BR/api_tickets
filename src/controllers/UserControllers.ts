import { Request, Response } from 'express'
import { registerUserService, loginUserService } from '../services/UserServices'


export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
       
    const user = await registerUserService(name, email, password)
    return res.status(201).json({
        message: "SUCCESS", 
        data: user
    }) 
}

export const loginUser = async (req: Request, res: Response) => {
        
    const { email, password } = req.body

    const token = await loginUserService(email, password)
    return res.status(200).json({
        message: "SUCCESS",
        data: token
    })
}
