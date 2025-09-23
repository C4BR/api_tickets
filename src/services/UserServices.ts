import { PrismaClient } from "../generated/prisma/client";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserError } from "../Errors/UserError";
import crypto from 'crypto'

const prisma = new PrismaClient()

export async function registerUserService(name: string, email: string, password: string){
    const existingUser = await prisma.user.findUnique({where:{email}})
    
    if(existingUser){
        throw new UserError('USER_ALREADY_EXISTS')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

export async function loginUserService(email: string, password: string){
    
    const user = await prisma.user.findUnique({
        where: {
            email,
            deletedAt: null
        }
    })

    if(!user || !await bcrypt.compare(password, user.password)){
        throw new UserError('INVALID_CREDENTIALS')
    }

    const activeSessions = await prisma.session.findMany({
        where: {
            userId: user.id,
            expired: false
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    const maxSessions = 5
    
    if(activeSessions.length >= maxSessions){
        const sessionsToExpire = activeSessions.slice(0, activeSessions.length - maxSessions + 1)
        await prisma.session.updateMany({
            where:{
                id: { in: sessionsToExpire.map(s => s.id)}
            },
            data:{
                expired: true
            }
        })
    }

    const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET!, {
        expiresIn: '24h'
    })

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    await prisma.session.create({
        data: {
            userId: user.id,
            token: hashedToken,
            expired: false
        }
    })

    return token
}

export async function logoutUserService(token: string){
    
    await prisma.session.update({
        where: {
            token: token
        },
        data: {
            expired: true
        }
    })

    return
}

export async function deleteUserService(userId: number, password: string){
    
    const user = await prisma.user.findUnique({
        where: {id: userId}
    })
    
    if(!await bcrypt.compare(password, user!.password)){
        throw new UserError('WRONG_PASSWORD')
    }

    const deletedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            deletedAt: new Date()
        }
    })

    await prisma.ticket.updateMany({
        where: {
            status: { not: 'FECHADO'}
        },
        data: {
            status: 'FECHADO'
        }
    })

    await prisma.session.updateMany({
        where: { 
            userId: userId,
            expired: false
        },
        data: {
            expired: true
        }
    })

    const { password: _, ...userWithoutPassword } = deletedUser
    
    return userWithoutPassword
}