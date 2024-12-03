import express from 'express';
import userController from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRoutes = express.Router();

userRoutes.post('/user/register', userController.register);
userRoutes.post('/user/login', userController.login);

export default userRoutes;