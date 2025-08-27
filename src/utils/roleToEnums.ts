import { SentBy } from "../generated/prisma";

export function roleToEnum(role: string): SentBy{
    if(!Object.values(SentBy).includes (role as SentBy)){
        throw new Error
    }
    return role as SentBy
}