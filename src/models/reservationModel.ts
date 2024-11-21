import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  restaurantId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  numOfPeople: number;
  reservationDate: Date;
  status: 'em andamento' | 'confirmado' | 'cancelado';
}

const reservationSchema: Schema = new Schema({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  numOfPeople: { type: Number, required: true, min: 1 },
  reservationDate: { type: Date, required: true },
  status: { type: String, enum: ['em andamento', 'confirmado', 'cancelado'] },
});

const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);

export default Reservation;