"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
exports.authRouter = (0, express_1.Router)();
// Роут регистрации
exports.authRouter.post('/register', auth_controller_1.registerUserController);
exports.authRouter.post('/login', auth_controller_1.loginUserController);
exports.authRouter.get('/validate', auth_controller_1.validateTokenController);
