import { PrismaClient } from "../generated/prisma/client";
import bcrypt from 'bcrypt'

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

    if(!user){
        throw new Error('Invalid credentials')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw new Error ('Invalid credentials')
    }

    return console.log("Login successful")
}