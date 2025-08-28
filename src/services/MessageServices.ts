import { MessageError } from '../Errors/MessageError'
import { PrismaClient, SentBy } from '../generated/prisma'

const prisma = new PrismaClient()

export async function createMessageService(ticketId: number, userId: number, sentBy: SentBy, content: string){
    
    const existingTicket = await prisma.ticket.findFirst({
        where:{
            id: ticketId,
            status: { in: ["ABERTO", "EM_ATENDIMENTO"]}
        },
        select: { userId: true}
    })

    if(!existingTicket){
        throw new MessageError('MESSAGE_MUST_HAVE_TICKET')
    }

    if( sentBy === "USER" && existingTicket.userId !== userId){
        throw new MessageError('FORBIDDEN')
    }

    return await prisma.message.create({
        data:{
            ticketId: ticketId,
            userId: userId,
            sentBy: sentBy,
            content: content,
        }
    })
}

export async function getMessagesService(ticketId: number, userId: number, role: SentBy){


    const ticket = await prisma.ticket.findFirst({
        where:{id: ticketId},
        select:{userId: true, status: true}
    })

    if(!ticket){
        throw new MessageError('TICKET_NOT_FOUND')
    }

    if(role === "USER" && ticket.userId !== userId){
        throw new MessageError('FORBIDDEN')
    }

    const messages = await prisma.message.findMany({
        where: { ticketId: ticketId },
        orderBy: { createdAt: "asc" },
        include: { user: { select: {id: true, name: true, role: true}}}
    })

    if(messages.length === 0){
        throw new MessageError('MESSAGES_NOT_FOUND')
    }

    return messages
}