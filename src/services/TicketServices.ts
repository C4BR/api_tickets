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

export async function getTicketsService(userId: number){
    const tickets = await prisma.ticket.findMany({
        where:{
            userId: userId
        }
    })

    if(tickets.length <= 0){
        throw new Error
    }

    return tickets
}

export async function getTicketByIdService(userId: number, ticketId: number){
    const ticket = await prisma.ticket.findFirst({
        where: {
            id: ticketId,
            userId: userId
        }
    })

    if(!ticket){
        throw new Error
    }

    return ticket
}