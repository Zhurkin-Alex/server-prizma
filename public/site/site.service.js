"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteService = void 0;
const client_1 = require("@prisma/client");
const log_1 = __importDefault(require("../utils/log"));
class SiteService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createSite(site) {
        try {
            return await this.prisma.site.create({
                data: site,
            });
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error creating site');
        }
    }
    async createSites(sites) {
        try {
            console.log('sites--->', sites);
            const createdSites = await Promise.all(sites.map(site => this.prisma.site.create({ data: site })));
            return createdSites;
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error creating sites');
        }
    }
    async getAllSites() {
        try {
            return await this.prisma.site.findMany();
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error retrieving sites');
        }
    }
    async deleteSiteById(id) {
        try {
            await this.prisma.site.delete({
                where: { id },
            });
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error deleting site');
        }
    }
    async updateSiteById(id, data) {
        try {
            return await this.prisma.site.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            log_1.default.error(error);
            throw new Error('Error updating site');
        }
    }
}
exports.SiteService = SiteService;
