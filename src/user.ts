import express, { Request, Response } from 'express';
import { authMiddleware } from './middleware/authMiddleware';
import { roleMiddleware } from './middleware/roleMiddleware';
const router = express.Router();
router.get('/profile', authMiddleware, roleMiddleware(['admin', 'user']), (req: Request, res: Response) => {
    res.json({ message: 'Seu perfil', user: req.user });
});
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req: Request, res: Response) => {
    res.json({ message: 'Conteúdo exclusivo para administradores', user: req.user });

});
router.get('/secretaria', authMiddleware, roleMiddleware(['secretaria']), (req: Request, res: Response) => {
    res.json({ message: 'Conteúdo exclusivo para secretária', user: req.user });

});
router.get('/estagiario', authMiddleware, roleMiddleware(['estagiario']), (req: Request, res: Response) => {
    res.json({ message: 'Conteúdo exclusivo para estagiario', user: req.user });

});
export default router;