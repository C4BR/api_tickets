import { Request, Response } from 'express'
import { changeTicketStatusService, getTicketByIdService, getTicketService } from '../services/AgentServices'
import { statusToEnum } from '../utils/StatusToEnum'
import { TicketStatus } from '../generated/prisma'

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
            return res.status(400).json({
                error: "TICKET_NOT_FOUND",
                message: `Couldn't find any ticket with id: ${ticketId}`
            })
        }
    }
}

export const getTicketById = async (req: Request, res: Response) =>{
    const {id} = req.params
    try {
        const ticket = await getTicketByIdService(Number(id))
        return res.status(200).json({ticket: ticket})
    } catch (error) {
        if(error instanceof Error){
            return res.status(404).json({
                error: "TICKET_NOT_FOUND",
                message: `Couldn't find any ticket with id: ${id}`
            })
        }
    }
}

export const getTickets = async (req: Request, res: Response) => {
    const status = req.query.status as TicketStatus | undefined
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10


    try {
        const tickets = await getTicketService(status, page, limit)
        return res.status(200).json({
            statusFilter: status || "none",
            tickets: tickets
        })
    } catch (error) {
        if(error instanceof Error){
            return res.status(404).json({
                error:"TICKET_NOT_FOUND",
                message: `Couldn't find any ticket with this status: ${status}`,
            })
        }
    }
}