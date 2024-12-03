import { Request, Response } from 'express';
import reservationService from '../services/reservationService';

export default {
    async getAllReservations(req: Request, res: Response) {

        try {
            const reservations = await reservationService.getAllReservations();
            return res.status(200).json({
                status: 200, msg:
                    reservations
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao listar reservas" }
            });
        }
    },
    async getReservation(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const reserva = await reservationService.getReservation(userId);
            return res.status(201).json({
                status: 201, msg:
                    reserva
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: `Erro ao obter a reserva do usuário de id: ${userId}` }
            });
        }
    },
    // Criar uma nova reserva
    async createReservation(req: Request, res: Response): Promise<Response> {
        const { restaurantId, userId, numOfPeople, reservationDate } = req.body;

        try {
            const newReservation = await reservationService.createReservation({
                restaurantId,
                userId,
                numOfPeople,
                reservationDate,
            });
            return res.status(201).json({ status: 201, data: newReservation });
        } catch (error: any) {
            return res.status(400).json({ status: 400, error: `Erro ao criar reserva: ${error.message}` });
        }
    },

    // Atualizar uma reserva
    async updateReservation(req: Request, res: Response): Promise<Response> {
        const { reservationId } = req.params;
        const updateData = req.body;

        try {
            const updatedReservation = await reservationService.updateReservation(reservationId, updateData);
            return res.status(200).json({ status: 200, data: updatedReservation });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: `Erro ao atualizar a reserva de ID: ${reservationId}`,
            });
        }
    },

    // Excluir uma reserva
    async deleteReservation(req: Request, res: Response): Promise<Response> {
        const { reservationId } = req.params;

        try {
            const deletedReservation = await reservationService.deleteReservation(reservationId);
            return res.status(200).json({ status: 200, data: deletedReservation });
        } catch (error) {
            return res.status(404).json({
                status: 404,
                error: `Erro ao excluir a reserva de ID: ${reservationId}`,
            });
        }
    },
};