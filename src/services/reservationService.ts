import Reservation, { IReservation } from '../models/reservationModel';
import Restaurant from '../models/restaurantModel';

export default {
    // Método para obter todas as reservas
    async getAllReservations(): Promise<IReservation[]> {
        return await Reservation.find().populate('restaurantId userId');
    },

    // Método para obter uma reserva por ID
    async getReservationById(id: string): Promise<IReservation> {
        const reservation = await Reservation.findById(id).populate('restaurantId userId');

        if (reservation) {
            return reservation;
        } else {
            throw new Error('Reserva não encontrada.');
        }
    },

    // Método para criar uma nova reserva
    async createReservation(restaurantId: string, userId: string, numOfPeople: number, reservationDate: Date, status: string): Promise<IReservation> {

        // Verifica se o restaurante existe
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw new Error('Restaurante não encontrado.');
        }

        // Verifica se existe reserva p horario
        const existingReservation = await Reservation.findOne({userId, reservationDate});
        if (existingReservation) {
            throw new Error('O usuário já possui uma reserva para este horário.');
        }

        const newReservation = new Reservation({ restaurantId, userId, numOfPeople, reservationDate, status });
        return await newReservation.save();
    },

    // Método para atualizar um restaurante
    async updateReservation(id: string, data: Partial<IReservation>): Promise<IReservation | null> {
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            throw new Error('Reserva não encontrada.');
        }

        // Verifica se o usuário está tentando alterar para um horário já reservado
        if (data.reservationDate) {
            const hasReservation = await Reservation.findOne({
                userId: reservation.userId,
                reservationDate: data.reservationDate,
                _id: { $ne: id }, // $ne = not equal
            });

            if (hasReservation) {
                throw new Error('O usuário já possui uma reserva para este horário.');
            }
        }

        return await Reservation.findByIdAndUpdate(id, data, { new: true });
    },

    // Método para excluir um restaurante
    async deleteReservation(id: string): Promise<void> {
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            throw new Error('Reserva não encontrada.');
        }

        await Reservation.findByIdAndDelete(id);
    },

    // Método para cancelar uma reserva
    //async cancelReservation(id: string) { }
};