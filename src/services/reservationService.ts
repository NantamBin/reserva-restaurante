import mongoose from 'mongoose';
import Reservation, { IReservation } from '../models/reservationModel';

export default {
    async getAllReservations() {
        const rerservations = await Reservation.find();
        if (rerservations) {
            return rerservations;
        } else {
            throw new Error("Erro ao buscar todas as reservas");
        }
    },

    async getReservation(userId: String) {
        const reservation = await Reservation.findById(userId).populate('restaurantId userId');;
        if (reservation) {
            return reservation;
        } else {
            throw new Error("Erro");
        }

    },
    // Criar uma nova reserva
    async createReservation({
        restaurantId,
        userId,
        numOfPeople,
        reservationDate,
    }: {
        restaurantId: string;
        userId: string;
        numOfPeople: number;
        reservationDate: Date;
    }): Promise<IReservation> {
        try {
            // Verificar se já existe uma reserva para o mesmo usuário na mesma data
            const existingReservation = await Reservation.findOne({
                userId,
                reservationDate: { $eq: reservationDate },
            });

            if (existingReservation) {
                throw new Error('Já existe uma reserva para esse usuário nesta data e horário.');
            }

            const newReservation = new Reservation({
                restaurantId,
                userId,
                numOfPeople,
                reservationDate,
            });

            const savedReservation = await newReservation.save();
            return savedReservation;
        } catch (error: any) {
            throw new Error(`Erro ao criar reserva: ${error.message}`);
        }
    },

    // Atualizar uma reserva pelo ID
    async updateReservation(
        reservationId: string,
        updateData: Partial<IReservation>
    ): Promise<IReservation | null> {
        try {
            const updatedReservation = await Reservation.findByIdAndUpdate(reservationId, updateData, {
                new: true,
            });
            if (!updatedReservation) {
                throw new Error('Reserva não encontrada para atualização.');
            }
            return updatedReservation;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar reserva: ${error.message}`);
        }
    },

    // Excluir uma reserva pelo ID
    async deleteReservation(reservationId: string): Promise<IReservation | null> {
        try {
            const deletedReservation = await Reservation.findByIdAndDelete(reservationId);
            if (!deletedReservation) {
                throw new Error('Reserva não encontrada para exclusão.');
            }
            return deletedReservation;
        } catch (error: any) {
            throw new Error(`Erro ao excluir reserva: ${error.message}`);
        }
    },
};
