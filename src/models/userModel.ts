import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    cpf: String,
    passwordHash: String,
    userType: { type: String, enum: ['Cliente', 'Restaurante'] }
  });

module.exports = mongoose.model('Usuario', userSchema);