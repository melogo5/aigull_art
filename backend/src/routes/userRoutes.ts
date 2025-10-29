import express from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middlewares/auth';
import {
  validateUser,
  validateLogin,
  handleValidationErrors,
} from '../utils/validation';

const router = express.Router();

router.post(
  '/login',
  validateLogin,
  handleValidationErrors,
  userController.login
);

router.get('/me', auth, userController.getMe);
router.post('/logout', auth, userController.logout);
router.get('/', auth, userController.getUsers);
router.put('/:id', auth, userController.updateUser);
router.delete('/:id', auth, userController.deleteUser);

export default router;
