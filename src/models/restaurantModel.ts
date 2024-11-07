import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  photos: [String],
  menu: [String],
  availableHours: [String]
});

module.exports = mongoose.model('Usuario', restaurantSchema);