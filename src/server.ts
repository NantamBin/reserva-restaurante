import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user';
import restaurantRoutes from './routes/reservation';
import reservationRoutes from './routes/restaurant';

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI as string).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});
// Rotas
app.use('/', userRoutes);
app.use('/', reservationRoutes);
app.use('/', restaurantRoutes);
// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on <http://localhost>:${PORT}`);
});