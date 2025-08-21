import { TicketStatus } from "../generated/prisma";
import { Request, Response, NextFunction} from 'express'

export function allowedStatus(req: Request, res: Response, next: NextFunction){
    
    const status = req.query.status as string

    if(!status){
        return next()
    }
    
    if(!Object.values(TicketStatus).includes(status as TicketStatus)){
        return res.status(400).json({
            error: "WRONG_STATUS_IDENTIFIER",
            message: `Wrong status identifier: ${status}. Make sure to use: ABERTO | EM_ATENDIMENTO | RESOLVIDO | FECHADO`
        })
    }
    next()
}