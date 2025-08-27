import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient()

export async function createTicketService(userId: number, title: string, description: string){
    const ticket = await prisma.ticket.create({
        data: {
            userId,
            title,
            description
        }
    })

    return {
        createdBy: userId,
        id: ticket.id,
        title: ticket.title,
        description: ticket.description
    }
}

export async function getTicketsService(userId: number, page: number = 1, limit: number = 10){
    
    const maxLimit = 100
    const currentLimit = Math.min(limit, maxLimit)

    const totalTickets = await prisma.ticket.count({
        where: {
            userId: userId
        }
    })
    
    const tickets = await prisma.ticket.findMany({
        where:{
            userId: userId
        },
        skip: (page - 1) * currentLimit,
        take: currentLimit
    })

    if(tickets.length <= 0){
        throw new Error("No ticket's found")
    }

    return {
        data: tickets,
        total: totalTickets,
        page,
        totalPages: Math.ceil(totalTickets / currentLimit)
    }
}

export async function getTicketByIdService(userId: number, ticketId: number){
    const ticket = await prisma.ticket.findFirst({
        where: {
            id: ticketId,
            userId: userId
        }
    })

    if(!ticket){
        throw new Error("No ticket's found")
    }

    return ticket
}