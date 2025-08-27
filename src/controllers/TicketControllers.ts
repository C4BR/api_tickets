import { Request, Response } from 'express'
import { createTicketService, getTicketsService, getTicketByIdService } from '../services/TicketServices'

export const createTicket = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const {title, description} = req.body

    try {        
        const ticket = await createTicketService(userId, title, description)
        return res.status(201).json({
            message: 'SUCCESS_IN_CREATE_TICKET',
            data: ticket
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                message: "COUDN'T_CREATE_TICKET",
                error: error.message
            })
        }
    }
}

export const getTickets = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    
    try {
        const tickets = await getTicketsService(userId, page, limit)
        return res.status(200).json({tickets: tickets})
    } catch (error) {
        if(error instanceof Error){
            return res.status(404).json({
                message: "COULDN'T_FIND_ANY_TICKETS",
                error: error.message
            })
        }
    }
}

export const getTicketById = async (req: Request, res: Response) => {
    
    const { id } = req.params
    const userId = req.user.userId


    try {
        const ticket = await getTicketByIdService(userId, Number(id))
        return res.status(200).json({
            message: "SUCCESS",
            data: ticket
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(404).json({
                message: "TICKET_NOT_FOUND",
                error: error.message
            })
        }
    }
}