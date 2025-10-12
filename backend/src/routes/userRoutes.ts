import express from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middlewares/auth';
import { validateUser, validateLogin, handleValidationErrors } from '../utils/validation';

const router = express.Router();

// Public routes
router.post('/register', validateUser, handleValidationErrors, userController.register);
router.post('/login', validateLogin, handleValidationErrors, userController.login);

// Protected routes
router.get('/me', auth, userController.getMe);
router.get('/', auth, userController.getUsers);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

export default router;
