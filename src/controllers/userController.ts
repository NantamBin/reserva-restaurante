import { Request, Response } from 'express';
import userService from '../services/userService';

export default {
    async register(req: Request, res: Response) {
        const { name, cpf, email, password } = req.body;

        try {
            const comments = await userService.register(name, cpf, email, password);
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

        try {
            const newPost = await userService.login(email, password);
            return res.status(201).json({
                status: 201, msg:
                    newPost
            });
        } catch (error) {
            return res.status(400).json({
                status: 400, msg:
                    { error: "Erro ao criar post" }
            });
        }
    }
};