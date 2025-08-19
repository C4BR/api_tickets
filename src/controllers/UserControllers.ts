import { Request, Response } from 'express'
import { registerUserService, loginUserService } from '../services/UserServices'


export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    
    try {       
        const user = await registerUserService(name, email, password)
        return res.status(201).json({message: "Succesfully registered user", user})
        
    } catch (error) {
        
        if(error instanceof Error){
            return res.status(400).json({error: "Couldn't create user"})
        }
    }
}

export const loginUser = async (req: Request, res: Response) => {
        
        const { email, password } = req.body

    try {
        const token = await loginUserService(email, password)
        return res.status(200).json({token})

    } catch (error) {
        if(error instanceof Error){
            console.log(error)
            return res.status(400).json({error: "Couldn't login user"})
        }
        return res.status(500).json({ error: 'Internal server error' })
    }
}
