import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/UserControllers'
import { authToken } from '../middlewares/EnsureAuthenticated'

const router = Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

export default router