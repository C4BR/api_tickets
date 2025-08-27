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
        throw new Error("Messages can only be sent to existing tickets that are not solved or closed")
    }

    if( sentBy === "USER" && existingTicket.userId !== userId){
        throw new Error ("User not authorized to send messages to this ticket")
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