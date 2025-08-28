import { ErrorBase } from "./ErrorBase";

type AgentErrorName = 'TICKET_NOT_FOUND' | 'NO_TICKETS_FOUND'

export class AgentError extends ErrorBase<AgentErrorName>{
    constructor(name: AgentErrorName){
        const messages = {
            TICKET_NOT_FOUND: {
                message: "Ticket doesn't exist", 
                status: 404
            },
            NO_TICKETS_FOUND: {
                message: "Couldn't find any ticket", 
                status: 404
            }
        }
        super(name, messages[name].message, messages[name].status)
    }
}