import { Request, Response } from 'express';
import reservationService from '../services/reservationService';

export default {
    async getAllReservations(req: Request, res: Response) {

        try {
            const comments = await reservationService.getAllReservations();
            return res.status(200).json({
                status: 200, msg:
                    comments
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
            const newPost = await reservationService.getReservation(userId);
            return res.status(201).json({
                status: 201, msg:
                    newPost
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: `Erro ao obter a reserva do usuário de id: ${userId}` }
            });
        }
    },
    async createReservation(req: Request, res: Response) {
        const { postagemId, autorId, conteudo } = req.body;

        try {
            const newPost = await reservationService.createReservation(postagemId, autorId, conteudo);
            return res.status(201).json({
                status: 201, msg:
                    newPost
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao criar reserva" }
            });
        }
    }
};