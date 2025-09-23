import { Router } from 'express'
import { registerUser, loginUser, deleteUser } from '../controllers/UserControllers'
import { validateUserPayload } from '../middlewares/ValidateUserPayload'
import { authToken } from '../middlewares/EnsureAuthenticated'
import { allowedRoles } from '../middlewares/AllowedRoles'

const router = Router()

router.post('/login', loginUser)
router.post('/register', validateUserPayload, registerUser)
router.patch('/delete', authToken, allowedRoles('USER'), deleteUser)

export default router