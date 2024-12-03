import express from 'express';
import overPassApi from '../controllers/OverpassApiController';
import { authMiddleware } from '../middleware/authMiddleware';

const overpassRouter = express.Router();

// Obter todos os restaurantes
overpassRouter.get('/overpass/restaurants', authMiddleware, overPassApi.getRestaurantsByLocation);

export default overpassRouter;