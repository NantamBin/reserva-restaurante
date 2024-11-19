import Restaurant, { IRestaurant } from "../models/restaurantModel";

export default {
    // Método para obter todos os restaurante
    async getAllRestaurant(): Promise<IRestaurant[]> {
        return await Restaurant.find();
    },

    // Método para obter um restaurante por ID
    async getRestaurant() {
        const restaurant = await Restaurant.findById("_id");
        if (restaurant) {
            return restaurant;
        } else {
            throw new Error("Restaurante não encontrado.");
        }
    },

    // Método para criar um novo restaurante
    async createRestaurant(name: string, location: string, photos: string, menu: string, availableHours: string): Promise<IRestaurant> {
        const restaurantExists = await Restaurant.findOne();

        if (restaurantExists) {
            throw new Error('Restaurante já existe');
        }

        const newRestaurant = new Restaurant({ name, location, photos, menu, availableHours });

        return await newRestaurant.save();
    },

    // Método para atualizar um restaurante
    async updateRestaurant(id: string, data: Partial<IRestaurant>): Promise<IRestaurant | null> {
        const { location } = data;

        if (location) {
            const sameRestaurantLocation = await Restaurant.findOne({
                location,
                _id: { $ne: id } // $ne = not equal
            });
            
            if (sameRestaurantLocation) {
                throw new Error('Restaurante com esse endereço já existe na base de dados.');
            }
        }

        return await Restaurant.findByIdAndUpdate(id, data, { new: true });
    },

    // Método para excluir um restaurante
    async deleteRestaurant(id: string): Promise<void> {
        await Restaurant.findByIdAndDelete(id);
    }

};
