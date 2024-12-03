import { Request, Response } from 'express';
import userService from '../services/userService';

export default {
    async register(req: Request, res: Response) {
        const { name, cpf, email, password, userType } = req.body;

        try {
            const comments = await userService.register(name, cpf, email, password, userType);
            return res.status(200).json({
                status: 200, msg:
                    comments
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao listar posts" }
            });
        }
    },
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log("🚀 ~ login ~ email, password:", email, password)

        try {
            const user = await userService.login(email, password);
            console.log("🚀 ~ login ~ user:", user)
            return res.status(201).json({
                status: 201, msg:
                    user
            });
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao fazer login" }
            });
        }
    }
};