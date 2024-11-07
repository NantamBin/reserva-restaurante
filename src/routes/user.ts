import express from 'express';
import userController from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.get('/user/register', authMiddleware, userController.register);
userRoutes.post('/user/login', authMiddleware, userController.login);

export default userRoutes;