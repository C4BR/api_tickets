import { TicketStatus } from "../generated/prisma";

export function statusToEnum(status:string): TicketStatus{
    if(!Object.values(TicketStatus).includes(status as TicketStatus)){
        throw new Error
    }
    return status as TicketStatus
}