import { Request, Response } from 'express'
import { createMessageService } from '../services/MessageServices'
import { roleToEnum } from '../utils/roleToEnums'

export const createMessage = async (req: Request, res: Response) => {
    try {
        const ticketId = Number(req.params.ticketId)
        const userId = Number(req.user.userId)
        const sentBy = roleToEnum(req.user.role)
        const { content } = req.body

        const message = await createMessageService(ticketId, userId, sentBy, content)
        
        return res.status(200).json({
            message: "Sucessfully created message",
            content: message
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error: "COULDN'T_CREATE_MESSAGE",
                message: error.message
            })
        }
    }

}