import { Router } from 'express'
import { changeTicketStatus, getTicketById, getTickets } from '../controllers/AgentControllers'
import { authToken } from '../middlewares/EnsureAuthenticated'
import { allowedRoles } from '../middlewares/AllowedRoles'
import { allowedStatus } from '../middlewares/AllowedStatus'

const router = Router()

router.get('/tickets', authToken, allowedRoles('AGENT'), allowedStatus, getTickets)
router.get('/tickets/:id', authToken, allowedRoles('AGENT'), getTicketById)
router.patch('/tickets', authToken, allowedRoles('AGENT'), changeTicketStatus)

export default router