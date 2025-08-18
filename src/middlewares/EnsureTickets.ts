import { Request, Response, NextFunction } from 'express'

export function ensureTickets(req: Request, res: Response, next: NextFunction){
    const ticket = req.body

    if(!ticket.title || ticket.title.startsWith(" ")){
        return res.status(400).json({error: "Title can't be empty or contain only spaces"})
    }

    if(!ticket.description || ticket.description.startsWith(" ")){
        return res.status(400).json({error: "Description can't be empty or contain only spaces"})
    }

    next()
}