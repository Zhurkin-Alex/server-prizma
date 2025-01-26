import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { RegisterUserInput } from './auth.dto';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
  async registerUser(data: RegisterUserInput) {
    const { name, email, password } = data;

    // Проверка, существует ли пользователь
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Генерация JWT
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret!, {
        expiresIn: '1h',
    });

    return { user, token };
  }
}

const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

export const loginUserService = async (email: string, password: string) => {
    // Проверка наличия пользователя
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error = new Error('Invalid email or password');
      (error as any).status = 401;
      throw error;
    }
  
    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      (error as any).status = 401;
      throw error;
    }
  
    // Генерация JWT
    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret!, {
      expiresIn: '1h',
    });
  
    // Удаляем пароль из данных перед возвратом
    const { password: _, ...userWithoutPassword } = user;
  
    return {
      token,
      user: userWithoutPassword,
    };
};

// Логика проверки токена
export const validateToken = async (token: string) => {
    try {
      const decoded = jwt.verify(token, jwtSecret) as { id: number; email: string };
  
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, name: true, email: true },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      return user;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
};