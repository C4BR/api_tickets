import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { PrismaClient } from "../generated/prisma/client";
import crypto from 'crypto'
import { AuthError } from "../Errors/AuthError";

const prisma = new PrismaClient()

interface JwtPayload{
    userId: number,
    role: string
}

export async function authToken(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization']
    
    if(!authHeader?.toLowerCase().startsWith('bearer ')){
        throw new AuthError('MISSING_TOKEN')
    }
    
    const token = authHeader.split(' ')[1]
    const secret = process.env.JWT_SECRET

    if(!token){
        throw new AuthError ('MISSING_TOKEN')
    }

    if(!secret){
        throw new Error('JWT_SECRET not configured!')
    }

    const decoded = jwt.verify(token, secret) as JwtPayload
    
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const isValidToken = await prisma.session.findUnique({
        where: {
            token: hashedToken
        }
    })

    if(!isValidToken || isValidToken.expired){
        throw new AuthError('SESSION_EXPIRED')
    }

    req.user = decoded
    next()
}