import mongoose, {Document, Schema} from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  location: string;
  photos: string;
  menu: string;
  availableHours: string;
}

const restaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  photos: { type: [String], default: [] },
  menu: { type: [String], default: [] },
  availableHours: { type: [String], default: [] },
});


const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);

export default Restaurant;