import { PrismaClient, TicketStatus } from '../generated/prisma/client'

const prisma = new PrismaClient()

export async function getOpenedTicketsService(){
    const tickets = await prisma.ticket.findMany({
        where:{
            status: "ABERTO"
        }
    })

    if(tickets.length <= 0){
        throw new Error
    }

    return tickets
}

export async function changeTicketStatusService(ticketId: number, status: TicketStatus){
    const ticket = await prisma.ticket.findFirst({
        where:{
            id: ticketId
        }
    })

    if(!ticket){
        throw new Error
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