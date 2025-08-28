import { Request, Response, NextFunction } from 'express'
import { ErrorBase } from '../Errors/ErrorBase'

export function errorHandlerMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
){
    if(error instanceof ErrorBase){
        return res.status(error.status).json({
            error: error.name,
            message: error.message
        })
    }

    if(error instanceof Error){
        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred"
        })
    }
}