import express from 'express';
import restaurantController from '../controllers/restaurantController';
import { authMiddleware } from '../middleware/authMiddleware';

const restaurantRoutes = express.Router();

restaurantRoutes.get('/restaurant/', authMiddleware, restaurantController.getAllRestaurant);
restaurantRoutes.get('/restaurant/:id', authMiddleware, restaurantController.getRestaurant);

export default restaurantRoutes;