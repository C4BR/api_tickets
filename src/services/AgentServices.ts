import { AgentError } from '../Errors/AgentError'
import { PrismaClient, TicketStatus } from '../generated/prisma/client'

const prisma = new PrismaClient()


export async function changeTicketStatusService(ticketId: number, status: TicketStatus){
    const ticket = await prisma.ticket.findFirst({
        where:{
            id: ticketId
        }
    })

    if(!ticket){
        throw new AgentError('TICKET_NOT_FOUND')
    }

    const updatedTicket = await prisma.ticket.update({
        where:{
            id: ticketId
        },
        data:{
            status: status
        }
    })

    return updatedTicket
}

export async function getTicketByIdService(ticketId: number){

    const ticket = await prisma.ticket.findFirst({
        where:{
            id: ticketId
        }
    })

    if(!ticket){
        throw new AgentError('TICKET_NOT_FOUND')
    }

    return ticket
}

export async function getTicketService(status?: TicketStatus, page: number = 1, limit: number = 10){

    const maxLimit = 100
    const currentLimit = Math.min(limit, maxLimit)

    const totalTickets = await prisma.ticket.count({
        where: status? {status} : {
            status: {not: "FECHADO"}
        }
    })

    const tickets = await prisma.ticket.findMany({
        where: status? {status} : {
            status : { not: "FECHADO"}
        },
        skip: (page -1) * currentLimit,
        take: currentLimit
    })
    
    if(tickets.length <= 0){
        throw new AgentError('NO_TICKETS_FOUND')
    }

    return {
        data: tickets,
        total: totalTickets,
        page,
        totalPages: Math.ceil(totalTickets/currentLimit) 
    }
}