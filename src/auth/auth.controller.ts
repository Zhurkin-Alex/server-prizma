import { Request, Response } from 'express';
import { AuthService, loginUserService, validateToken } from './auth.service';
import { registerUserSchema } from './auth.dto';

const authService = new AuthService();

export const registerUserController = async (req: Request, res: Response) => {
    try {
      const data = registerUserSchema.parse(req.body); // Валидация данных
      const { user, token } = await authService.registerUser(data); // Регистрация пользователя
      res.status(201).json({ message: 'User registered successfully!', user, token });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
};


export const loginUserController = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await loginUserService(email, password); // Логин пользователя
      res.status(200).json({ message: 'Login successful!', user, token });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  };


// Контроллер проверки токена
export const validateTokenController = async (req: Request, res: Response): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        res.status(401).json({ message: 'Authorization token is missing' });
        return;
      }
  
      const token = authHeader.split(' ')[1]; // Извлекаем токен из "Bearer <token>"
      const user = await validateToken(token); // Проверяем токен через сервис
      res.status(200).json({ message: 'Token is valid', user });
    } catch (error: any) {
      console.error('Token validation error:', error.message);
      res.status(403).json({ message: error.message });
    }
  };