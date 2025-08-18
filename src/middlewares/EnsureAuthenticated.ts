import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'

interface JwtPayload{
    userId: number
}

export function authToken(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization']
    
    if(!authHeader?.toLowerCase().startsWith('bearer ')){
        return res.status(401).json({message: 'Missing or malformed Authorization header'})
    }
    
    const token = authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({message: 'Invalid credentials'})   
    }

    const secret = process.env.JWT_SECRET

    if(!secret){
        throw new Error('JWT_SECRET not configured')
    }

    jwt.verify(token, secret, (err, decoded) =>{
        if(err){
            return res.status(401).json({message: 'Invalid token'})     
        }
        req.user = decoded as JwtPayload
        next()
    });  
}