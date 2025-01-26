import { Router } from 'express';
import { loginUserController, registerUserController, validateTokenController } from './auth.controller';

export const authRouter = Router();

// Роут регистрации
authRouter.post('/register', registerUserController);
authRouter.post('/login', loginUserController);
authRouter.get('/validate', validateTokenController);