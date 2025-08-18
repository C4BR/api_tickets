import { Router } from "express";
import { createTicket, getTickets, getTicketById } from "../controllers/TicketControllers";
import { authToken } from "../middlewares/EnsureAuthenticated";
import { ensureTickets } from "../middlewares/EnsureTickets";

const router = Router()

router.post('/tickets', authToken, ensureTickets, createTicket)
router.get('/tickets', authToken, getTickets)
router.get('/tickets/:id', authToken, getTicketById)

export default router