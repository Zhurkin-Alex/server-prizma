import { PrismaClient, Template } from "@prisma/client";
import { ICrateTemplate } from "./templates.types";
import logger from "../utils/log";


export class TemplateService {
    private prisma = new PrismaClient();

    async createTemplate(template: ICrateTemplate): Promise<Template> {
        try {
            return await this.prisma.template.create({
                data: template,
            });
        } catch (error) {
            logger.error(error);
            throw new Error('Error creating template');
        }
    }

    async createTemplates(templates: ICrateTemplate[]): Promise<Template[]> {
        try {
            console.log('template--->', templates);
            const createdTemplates = await Promise.all(
                templates.map(template => this.prisma.template.create({ data: template }))
            );
            return createdTemplates;
        } catch (error) {
            logger.error(error);
            throw new Error('Error creating templates');
        }
    }

    async getAllTemplates(): Promise<Template[]> {
        try {
            return await this.prisma.template.findMany();
        } catch (error) {
            logger.error(error);
            throw new Error('Error retrieving templates');
        }
    }

    async deleteTemplateById(id: number): Promise<void> {
        try {
            await this.prisma.template.delete({
                where: { id },
            });
        } catch (error) {
            logger.error(error);
            throw new Error('Error deleting template');
        }
    }

    async updateTemplateById(id: number, data: Partial<ICrateTemplate>): Promise<Template> {
        try {
            return await this.prisma.template.update({
                where: { id },
                data,
            });
        } catch (error) {
            logger.error(error);
            throw new Error('Error updating template');
        }
    }
}