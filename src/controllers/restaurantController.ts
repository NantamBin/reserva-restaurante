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
    },
    // Criar um novo restaurante
    async createRestaurant(req: Request, res: Response): Promise<Response> {
        const { name, location, photos, menu, availableHours } = req.body;

        try {
            const newRestaurant = await restaurantService.createRestaurant({
                name,
                location,
                photos,
                menu,
                availableHours,
            });
            return res.status(201).json({ status: 201, data: newRestaurant });
        } catch (error: any) {
            return res.status(400).json({ status: 400, error: error.message });
        }
    },

    // Atualizar um restaurante
    async updateRestaurant(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const updateData = req.body;

        try {
            const updatedRestaurant = await restaurantService.updateRestaurant(id, updateData);
            return res.status(200).json({ status: 200, data: updatedRestaurant });
        } catch (error: any) {
            return res.status(404).json({ status: 404, error: error.message });
        }
    },

    // Excluir um restaurante
    async deleteRestaurant(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const deletedRestaurant = await restaurantService.deleteRestaurant(id);
            return res.status(200).json({ status: 200, data: deletedRestaurant });
        } catch (error: any) {
            return res.status(404).json({ status: 404, error: error.message });
        }
    },
};