import { Router } from "express";
import { createTicket, getTickets, getTicketById } from "../controllers/TicketControllers";
import { authToken } from "../middlewares/EnsureAuthenticated";
import { ensureTickets } from "../middlewares/EnsureTickets";
import { allowedRoles } from "../middlewares/AllowedRoles";

const router = Router()

router.post('/tickets', authToken, allowedRoles("USER"), ensureTickets, createTicket)
router.get('/tickets', authToken, allowedRoles("USER"), getTickets)
router.get('/tickets/:id', authToken, allowedRoles("USER"), getTicketById)

export default router