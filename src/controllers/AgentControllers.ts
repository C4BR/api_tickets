import { Request, Response } from 'express'
import { changeTicketStatusService, getTicketByIdService, getTicketService } from '../services/AgentServices'
import { statusToEnum } from '../utils/StatusToEnum'
import { TicketStatus } from '../generated/prisma'

export const changeTicketStatus = async (req: Request, res: Response) =>{
    
    const { ticketId, status } = req.body
    
    statusToEnum(status)
    const updatedTicket = await changeTicketStatusService(ticketId, status)
    return res.status(201).json({
        message: "SUCCESS",
        data: updatedTicket
    })   
}

export const getTicketById = async (req: Request, res: Response) =>{
    
    const {id} = req.params
    
    const ticket = await getTicketByIdService(Number(id))
    return res.status(200).json({
        message: "SUCCESS",
        data: ticket
    })    
}

export const getTickets = async (req: Request, res: Response) => {
    
    const status = req.query.status as TicketStatus | undefined
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const tickets = await getTicketService(status, page, limit)
    return res.status(200).json({
        filter: status || "none",
        data: tickets
    })   
}