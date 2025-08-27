import { Router } from "express";
import { createMessage } from "../controllers/MessageControllers";
import { authToken } from "../middlewares/EnsureAuthenticated";
import { allowedRoles } from "../middlewares/AllowedRoles";

const router = Router({ mergeParams: true})

router.post('/', authToken, allowedRoles("USER", "AGENT"), createMessage)

export default router