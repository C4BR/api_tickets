import { Request, Response } from 'express'
import { registerUserService, loginUserService } from '../services/UserServices'

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    
    try {       
        const user = await registerUserService(name, email, password)
        return res.status(201).json({message: "Succesfully registered user", user})
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(400).json({error: error.message })
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
        
        const { email, password } = req.body

    try {
        const user = await loginUserService(email, password)
        return res.status(200).json({message: "Login successful!"})

    } catch (error) {
        if(error instanceof Error){
            res.status(400).json({error: error.message})
        }
    }
}