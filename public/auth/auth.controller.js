"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenController = exports.loginUserController = exports.registerUserController = void 0;
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const authService = new auth_service_1.AuthService();
const registerUserController = async (req, res) => {
    try {
        const data = auth_dto_1.registerUserSchema.parse(req.body); // Валидация данных
        const { user, token } = await authService.registerUser(data); // Регистрация пользователя
        res.status(201).json({ message: 'User registered successfully!', user, token });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
exports.registerUserController = registerUserController;
const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, auth_service_1.loginUserService)(email, password); // Логин пользователя
        res.status(200).json({ message: 'Login successful!', user, token });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
exports.loginUserController = loginUserController;
// Контроллер проверки токена
const validateTokenController = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: 'Authorization token is missing' });
            return;
        }
        const token = authHeader.split(' ')[1]; // Извлекаем токен из "Bearer <token>"
        const user = await (0, auth_service_1.validateToken)(token); // Проверяем токен через сервис
        res.status(200).json({ message: 'Token is valid', user });
    }
    catch (error) {
        console.error('Token validation error:', error.message);
        res.status(403).json({ message: error.message });
    }
};
exports.validateTokenController = validateTokenController;
