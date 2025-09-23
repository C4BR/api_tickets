import { Request, Response } from 'express'
import { registerUserService, loginUserService, logoutUserService, deleteUserService } from '../services/UserServices'
import crypto from 'crypto'


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

export const logoutUser = async (req: Request, res: Response) => {
    
    const token = req.headers.authorization!.split(" ")[1]
    const hashedToken = crypto.createHash('sha256').update(token!).digest("hex")
    await logoutUserService(hashedToken)
    return res.status(200).json({ message: "Logout succesful!"})
}

export const deleteUser = async (req: Request, res: Response) => {
    
    const userId = Number(req.user.userId)
    const { password } = req.body

    const deletedUser = await deleteUserService(userId, password)
    return res.status(200).json({
        message: "SUCESS",
        deletedUser: deletedUser
    })
}