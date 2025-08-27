import { Request, Response } from 'express'
import { createMessageService, getMessagesService } from '../services/MessageServices'
import { roleToEnum } from '../utils/roleToEnums'

export const createMessage = async (req: Request, res: Response) => {
    try {
        const ticketId = Number(req.params.ticketId)
        const userId = Number(req.user.userId)
        const sentBy = roleToEnum(req.user.role)
        const { content } = req.body

        const message = await createMessageService(ticketId, userId, sentBy, content)
        
        return res.status(201).json({
            message: "SUCCESS_IN_CREATE_MESSAGE",
            data: message
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                message: "COULDN'T_CREATE_MESSAGE",
                error: error.message
            })
        }
    }
}

export const getMessages = async (req: Request, res: Response) => {
    try {
        const ticketId = Number(req.params.ticketId)
        const userId = Number(req.user.userId)
        const role = roleToEnum(req.user.role)
        
        
        const messages = await getMessagesService(ticketId, userId, role)
        
        return res.status(200).json({
            message: "SUCESS",
            data: messages
        })

    } catch (error) {
        if(error instanceof Error){
            return res.status(404).json({
                message: "COULDN'T_FIND_MESSAGES",
                error: error.message
            })
        }
    }
}