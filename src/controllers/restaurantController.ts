import { Request, Response } from 'express';
import restaurantService from '../services/restaurantService';

export default {
    async getAllRestaurant(req: Request, res: Response) {

        try {
            const comments = await restaurantService.getAllRestaurant();
            return res.status(200).json({
                status: 200, msg:
                    comments
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao listar restaurantes" }
            });
        }
    },
    async getRestaurant(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const newPost = await restaurantService.getRestaurant(id);
            return res.status(201).json({
                status: 201, msg:
                    newPost
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: `Erro ao obter o restaurante de id: ${id}` }
            });
        }
    }
};