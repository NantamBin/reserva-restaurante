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
        const { id } = req.params;

        try {
            const reservation = await reservationService.getReservationById(id);

            return res.status(201).json({
                status: 201, msg:
                    reservation
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: `Erro ao obter a reserva de id: ${id}` }
            });
        }
    },

    async createReservation(req: Request, res: Response) {
        const { restaurantId, userId, numOfPeople, reservationDate } = req.body;

        try {
            const newReservation = await reservationService.createReservation( restaurantId, userId, numOfPeople, reservationDate, 'em andamento' );

            return res.status(201).json({
                status: 201, msg:
                    newReservation
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao criar reserva" }
            });
        }
    },

    async updateReservation(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const updatedReservation = await reservationService.updateReservation(id, req.body);

            return res.status(200).json(updatedReservation);
        } catch (error: any) {
            return res.status(400).json({ error: error.message || 'Erro ao atualizar reserva' });
        }
    },

    async deleteReservation(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await reservationService.deleteReservation(id);
            return res.status(200).send();
        } catch (error) {
            return res.status(404).json({ error: 'Erro ao excluir reserva' });
        }
    },

    // Método para cancelar uma reserva
    //async cancelReservation(req: Request, res: Response) { }
};