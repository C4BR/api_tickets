import { PrismaClient } from "../generated/prisma/client";
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'


const prisma = new PrismaClient()

export async function registerUserService(name: string, email: string, password: string){
    const existingUser = await prisma.user.findUnique({where:{email}})
    
    if(existingUser){
        throw new Error('User already exists!')
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
    
    const user = await prisma.user.findUnique({where: {email}})

    if(!user || !await bcrypt.compare(password, user.password)){
        throw new Error('Invalid credentials')
    }

    const token = jwt.sign({userId: user.id, role: user.role}, process.env.JWT_SECRET!, {
        expiresIn: '1h'
    })

    return token
}

