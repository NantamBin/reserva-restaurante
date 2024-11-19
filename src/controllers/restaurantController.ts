import { Request, Response } from 'express';
import restaurantService from '../services/restaurantService';

export default {
    async getAllRestaurant(req: Request, res: Response) {

        try {
            const restaurants = await restaurantService.getAllRestaurant();
            
            return res.status(200).json({
                status: 200, msg:
                    restaurants
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
            const restaurant = await restaurantService.getRestaurant(id);

            return res.status(201).json({
                status: 201, msg:
                    restaurant
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: `Erro ao obter o restaurante de id: ${id}` }
            });
        }
    },

    async createRestaurant(req: Request, res: Response) {
        const { name, location, photos, menu, availableHours } = req.body;

        try {
            const restaurant = await restaurantService.createRestaurant(name, location, photos, menu, availableHours);

            return res.status(201).json(restaurant);
        } catch (error: any) {
            console.error('Erro ao criar usuário:', error);

            return res.status(400).json({ error: error.message || 'Erro ao criar restaurante' });
        }
    },

    async updateRestaurant(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const updatedRestaurant = await restaurantService.updateRestaurant(id, req.body);

            return res.status(200).json(updatedRestaurant);
        } catch (error: any) {
            return res.status(400).json({ error: error.message || 'Erro ao atualizar restaurante' });
        }
    },

    async deleteRestaurant(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await restaurantService.deleteRestaurant(id);
            return res.status(200).send();
        } catch (error) {
            return res.status(404).json({ error: 'Erro ao excluir restaurante' });
        }
    }
};