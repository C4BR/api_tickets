import express from 'express'
import { PrismaClient } from './generated/prisma'
import userRoutes from './routes/UserRoutes'
import ticketRoutes from './routes/TicketRoutes'

const app = express()
const PORT = process.env.PORT
const prisma = new PrismaClient()


app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', ticketRoutes)

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