import { Router } from "express";
import { createMessage, getMessages } from "../controllers/MessageControllers";
import { authToken } from "../middlewares/EnsureAuthenticated";
import { allowedRoles } from "../middlewares/AllowedRoles";

const router = Router({ mergeParams: true})

router.post('/', authToken, allowedRoles("USER", "AGENT"), createMessage)
router.get('/', authToken, allowedRoles("USER", "AGENT"), getMessages)

export default router