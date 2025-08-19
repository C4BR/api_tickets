import { Request, Response } from 'express'
import { getOpenedTicketsService, changeTicketStatusService } from '../services/AgentServices'
import { statusToEnum } from '../utils/StringToEnum'

export const getOpenedTickets = async (req: Request, res: Response ) =>{
    try {
        const tickets = await getOpenedTicketsService()
        return res.status(200).json({tickets: tickets})
    } catch(error){
        if(error instanceof Error){
            return res.status(400).json({error: "Couldn't find any ticket"})
        }
    }
}

export const changeTicketStatus = async (req: Request, res: Response) =>{

    const { ticketId, status } = req.body

    try {
        statusToEnum(status)
        const updatedTicket = await changeTicketStatusService(ticketId, status)
        return res.status(201).json({
            message: "Sucessfully updated ticket status",
            ticket: updatedTicket
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({error: "Couldn't update ticket"})
        }
    }
}
