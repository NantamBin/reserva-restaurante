import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';


const User = require('../models/userModel');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY as string;


export default {
    // Método para obter um comentário por ID
    async register(name: string, cpf: string, email: string, password: any, userType: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name, 
            cpf, 
            email, 
            passwordHash: hashedPassword,
            userType
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
        console.log("🚀 ~ login ~ user:", user)
        const bcryptCompare = await bcrypt.compare(password, user.passwordHash)
        console.log("🚀 ~ login ~ bcryptCompare:", bcryptCompare)
        if (user && bcryptCompare) {
            const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
                expiresIn: '1h',
            });
            console.log("🚀 ~ login ~ token:", token)
            return token;
        } else {
            throw new Error("Credenciais Inválidas");
        }

    }
};
