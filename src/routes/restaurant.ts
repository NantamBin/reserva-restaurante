import express from 'express';
import restaurantController from '../controllers/restaurantController';
import { authMiddleware } from '../middleware/authMiddleware';

const restaurantRoutes = express.Router();

// Obter todos os restaurantes
restaurantRoutes.get('/restaurants', authMiddleware, restaurantController.getAllRestaurant);

// Obter um restaurante específico pelo ID
restaurantRoutes.get('/restaurants/:id', authMiddleware, restaurantController.getRestaurant);

// Criar um novo restaurante
restaurantRoutes.post('/restaurants', authMiddleware, restaurantController.createRestaurant);

// Atualizar um restaurante
restaurantRoutes.put('/restaurants/:id', authMiddleware, restaurantController.updateRestaurant);

// Excluir um restaurante
restaurantRoutes.delete('/restaurants/:id', authMiddleware, restaurantController.deleteRestaurant);

export default restaurantRoutes;