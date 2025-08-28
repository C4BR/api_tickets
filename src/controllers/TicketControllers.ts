import { Request, Response } from 'express'
import { createTicketService, getTicketsService, getTicketByIdService } from '../services/TicketServices'

export const createTicket = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const {title, description} = req.body
        
    const ticket = await createTicketService(userId, title, description)
    return res.status(201).json({
        message: 'SUCCESS',
        data: ticket
    }) 
}

export const getTickets = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    
    const tickets = await getTicketsService(userId, page, limit)
    return res.status(200).json({
        message: "SUCCESS",
        data: tickets
    })  
}

export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.userId

    const ticket = await getTicketByIdService(userId, Number(id))
    return res.status(200).json({
        message: "SUCCESS",
        data: ticket
    }) 
}