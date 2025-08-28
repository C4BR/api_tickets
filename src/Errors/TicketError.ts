import { ErrorBase } from './ErrorBase'

type TicketErrorName = 'NO_TICKETS_FOUND'

export class TicketError extends ErrorBase<TicketErrorName>{
    constructor(name: TicketErrorName){
        const messages = {
            NO_TICKETS_FOUND: { message: "Couldn't find any ticket", status: 404}
        }
        super(name, messages[name].message, messages[name].status)
    } 
}