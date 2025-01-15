"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const client_1 = require("@prisma/client");
const log_1 = __importDefault(require("../utils/log"));
class TemplateService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createTemplate(template) {
        try {
            return await this.prisma.template.create({
                data: template,
            });
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error creating template');
        }
    }
    async createTemplates(templates) {
        try {
            console.log('template--->', templates);
            const createdTemplates = await Promise.all(templates.map(template => this.prisma.template.create({ data: template })));
            return createdTemplates;
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error creating templates');
        }
    }
    async getAllTemplates() {
        try {
            return await this.prisma.template.findMany();
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error retrieving templates');
        }
    }
    async deleteTemplateById(id) {
        try {
            await this.prisma.template.delete({
                where: { id },
            });
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error deleting template');
        }
    }
    async updateTemplateById(id, data) {
        try {
            return await this.prisma.template.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error updating template');
        }
    }
}
exports.TemplateService = TemplateService;
