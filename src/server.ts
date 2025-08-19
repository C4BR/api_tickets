import express from 'express'
import { PrismaClient } from './generated/prisma'
import userRoutes from './routes/UserRoutes'
import ticketRoutes from './routes/TicketRoutes'
import agentRoutes from './routes/AgentRoutes'

const app = express()
const PORT = process.env.PORT
const prisma = new PrismaClient()


app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', ticketRoutes)
app.use('/api/agent', agentRoutes)

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