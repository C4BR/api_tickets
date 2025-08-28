import { ErrorBase } from './ErrorBase'

type MessageErrorName = 'MESSAGE_MUST_HAVE_TICKET' | 'TICKET_NOT_FOUND' | 'FORBIDDEN' | 'MESSAGES_NOT_FOUND'

export class MessageError extends ErrorBase<MessageErrorName>{
    constructor(name: MessageErrorName){
        const messages = {
            MESSAGE_MUST_HAVE_TICKET: { 
                message: "Messages can only be sent to existing tickets that are not solved or closed", 
                status: 404
            },
            TICKET_NOT_FOUND: { 
                message: "Ticket doesn't exist", 
                status: 404
            },
            FORBIDDEN: { 
                message: "User not authorized to view messages from this ticket", 
                status: 403
            },
            MESSAGES_NOT_FOUND: {
                message: "Couldn't find any message from this ticket",
                status: 404
            }
        }
        super(name, messages[name].message, messages[name].status)
    }
}