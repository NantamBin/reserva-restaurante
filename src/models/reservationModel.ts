import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  restaurantId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  numOfPeople: Number,
  reservationDate: Date,
  status: { type: String, enum: ['em andamento', 'confirmado', 'cancelado'] }
});

module.exports = mongoose.model('Usuario', reservationSchema);