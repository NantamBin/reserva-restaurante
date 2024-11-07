import express from 'express';
import reservationController from '../controllers/reservationController';
import { authMiddleware } from '../middleware/authMiddleware';

const reservationRouter = express.Router();

reservationRouter.get('/reservation/', authMiddleware, reservationController.getAllReservations);
reservationRouter.get('/reservation/user/:userId', authMiddleware, reservationController.getReservation);
reservationRouter.post('/reservation/:id/confirmado', authMiddleware, reservationController.createReservation);

export default reservationRouter;