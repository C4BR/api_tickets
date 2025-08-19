import { Router } from 'express'
import { getOpenedTickets, changeTicketStatus } from '../controllers/AgentControllers'
import { authToken } from '../middlewares/EnsureAuthenticated'
import { allowedRoles } from '../middlewares/AllowedRoles'

const router = Router()

router.get('/tickets', authToken, allowedRoles('AGENT'), getOpenedTickets)
router.patch('/tickets', authToken, allowedRoles('AGENT'), changeTicketStatus)

export default router