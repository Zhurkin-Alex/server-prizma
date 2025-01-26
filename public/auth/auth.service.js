"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.loginUserService = exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthService {
    async registerUser(data) {
        const { name, email, password } = data;
        // Проверка, существует ли пользователь
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        // Хэширование пароля
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Создание нового пользователя
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // Генерация JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecret, {
            expiresIn: '1h',
        });
        return { user, token };
    }
}
exports.AuthService = AuthService;
const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
const loginUserService = async (email, password) => {
    // Проверка наличия пользователя
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
    }
    // Проверка пароля
    const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
    }
    // Генерация JWT
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, jwtSecret, {
        expiresIn: '1h',
    });
    // Удаляем пароль из данных перед возвратом
    const { password: _, ...userWithoutPassword } = user;
    return {
        token,
        user: userWithoutPassword,
    };
};
exports.loginUserService = loginUserService;
// Логика проверки токена
const validateToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw new Error('Invalid or expired token');
    }
};
exports.validateToken = validateToken;
