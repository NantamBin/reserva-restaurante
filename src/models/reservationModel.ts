import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  restaurantId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  numOfPeople: number;
  reservationDate: Date;
  status: 'em andamento' | 'confirmado' | 'cancelado';
}

const reservationSchema: Schema = new Schema(
  {
    restaurantId: { type: Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    numOfPeople: { type: Number, required: true, min: 1 },
    reservationDate: { type: Date, required: true },
    status: { type: String, enum: ['em andamento', 'confirmado', 'cancelado'], default: 'em andamento' },
  },
  { timestamps: true }
);

export default mongoose.model<IReservation>('Reservation', reservationSchema);
