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

    if(error instanceof SyntaxError && "body" in error){
        return res.status(400).json({
            error: "INVALID_JSON",
            message: "The request body contains invalid JSON and could not be parsed."
        })
    }

    if(error instanceof Error){
        return res.status(500).json({
            error: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred"
        })
    }

    return res.status(500).json({
        error: "UNKNOWN_ERROR",
        message: "An unknown error occurred"    
    })
}