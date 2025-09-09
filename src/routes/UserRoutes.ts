import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/UserControllers'
import { validateUserPayload } from '../middlewares/ValidateUserPayload'

const router = Router()

router.post('/login', loginUser)
router.post('/register', validateUserPayload, registerUser)

export default router