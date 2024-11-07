import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


const User = require('../models/commentModel');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string;


export default {
    // Método para obter um comentário por ID
    async register(name: String, cpf: String, email: String, password: any) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, cpf, email, password:
                hashedPassword
        });
        await newUser.save();

        if(newUser){
            return newUser;

        }else{
            throw new Error("Não foi possível cadastrar usuário");
            
        }
    },

    // Método para criar um novo comentário
    async login(email: String, password: any) {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
                expiresIn: '1h',
            });
            return token;
        } else {
            throw new Error("Credenciais Inválidas");
        }

    }
};
