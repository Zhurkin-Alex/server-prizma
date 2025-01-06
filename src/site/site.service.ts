import { PrismaClient, Site } from "@prisma/client";
import { ICrateSite } from "./site.types";
import logger from "../utils/log";


export class SiteService {
    private prisma = new PrismaClient();

    async createSite(site: ICrateSite): Promise<Site> {
        try {
            return await this.prisma.site.create({
                data: site,
            });
        } catch (error) {
            logger.error(error);
            throw new Error('Error creating site');
        }
    }

    async createSites(sites: ICrateSite[]): Promise<Site[]> {
        try {
            console.log('sites--->', sites);
            const createdSites = await Promise.all(
                sites.map(site => this.prisma.site.create({ data: site }))
            );
            return createdSites;
        } catch (error) {
            logger.error(error);
            throw new Error('Error creating sites');
        }
    }

    async getAllSites(): Promise<Site[]> {
        try {
            return await this.prisma.site.findMany();
        } catch (error) {
            logger.error(error);
            throw new Error('Error retrieving sites');
        }
    }

    async deleteSiteById(id: number): Promise<void> {
        try {
            await this.prisma.site.delete({
                where: { id },
            });
        } catch (error) {
            logger.error(error);
            throw new Error('Error deleting site');
        }
    }

    async updateSiteById(id: number, data: Partial<ICrateSite>): Promise<Site> {
        try {
            return await this.prisma.site.update({
                where: { id },
                data,
            });
        } catch (error) {
            logger.error(error);
            throw new Error('Error updating site');
        }
    }
}