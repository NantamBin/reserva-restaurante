import express from 'express';
import reservationController from '../controllers/reservationController';
import { authMiddleware } from '../middleware/authMiddleware';

const reservationRouter = express.Router();

// Obter todas as reservas
reservationRouter.get('/reservations', authMiddleware, reservationController.getAllReservations);

// Obter uma reserva específica pelo ID
reservationRouter.get('/reservations/:reservationId', authMiddleware, reservationController.getReservation);

// Criar uma nova reserva
reservationRouter.post('/reservations', authMiddleware, reservationController.createReservation);

// Atualizar uma reserva
reservationRouter.put('/reservations/:reservationId', authMiddleware, reservationController.updateReservation);

// Excluir uma reserva
reservationRouter.delete('/reservations/:reservationId', authMiddleware, reservationController.deleteReservation);

export default reservationRouter;