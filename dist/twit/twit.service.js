"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitService = void 0;
const client_1 = require("@prisma/client");
const log_1 = __importDefault(require("../utils/log"));
class TwitService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    createTwit(twit) {
        try {
            return this.prisma.twit.create({
                data: twit
            });
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error creating twit');
        }
    }
    async getTwits() {
        try {
            return this.prisma.twit.findMany();
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error getting twits');
        }
    }
    async deleteTwit() {
        try {
            const result = await this.prisma.twit.deleteMany();
            return { count: result.count };
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error deleting twit');
        }
    }
}
exports.TwitService = TwitService;
