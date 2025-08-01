import express from 'express'
import { PrismaClient } from './generated/prisma'

const app = express()
const PORT = process.env.PORT
const prisma = new PrismaClient()

app.use(express.json())

async function main(){
    await prisma.$connect()
    console.log('✅ Conexão com o banco de dados realizada com sucesso!')
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
}

main().catch((e) => {
    console.error(`❌ Erro ao conectar no banco de dados: ${e}`)
    process.exit(1)
})