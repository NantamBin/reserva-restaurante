import mongoose from 'mongoose';
import Restaurant, { IRestaurant } from '../models/restaurantModel';

export default {
    async getAllRestaurant() {
        const allRestaurant = await Restaurant.find();
        if (allRestaurant) {
            return allRestaurant;
        } else {
            throw new Error("Erro");
        }
    },

    async getRestaurant(id: String) {
        const restaurant = await Restaurant.findById(id);
        if (restaurant) {
            return restaurant;
        } else {
            throw new Error("Erro");
        }

    },
    // Criar um novo restaurante
    async createRestaurant(data: {
        name: string;
        location: string;
        photos?: string[];
        menu?: string[];
        availableHours?: string[];
    }): Promise<IRestaurant> {
        const newRestaurant = new Restaurant(data);
        const savedRestaurant = await newRestaurant.save();
        return savedRestaurant;
    },

    // Atualizar um restaurante
    async updateRestaurant(id: string, updateData: Partial<IRestaurant>): Promise<IRestaurant | null> {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedRestaurant) {
            throw new Error(`Restaurante com ID ${id} não encontrado para atualização`);
        }
        return updatedRestaurant;
    },

    // Excluir um restaurante
    async deleteRestaurant(id: string): Promise<IRestaurant | null> {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        if (!deletedRestaurant) {
            throw new Error(`Restaurante com ID ${id} não encontrado para exclusão`);
        }
        return deletedRestaurant;
    },
};
