import { PrismaClient, Twit } from "@prisma/client";
import { ICrateTwit } from "./twit.types";
import logger from "../utils/log";


export class TwitService {
    private prisma = new PrismaClient();

    createTwit(twit: ICrateTwit): Promise<Twit>{
        try {
            return this.prisma.twit.create({
                data: twit
            })
        } catch (error) {
           logger.error(error) 
           throw new Error('Error creating twit')
        }
    }

    async getTwits(): Promise<Twit[]> {
        try {
            return this.prisma.twit.findMany()
        } catch (error) {
            logger.error(error)
            throw new Error('Error getting twits')
        }
    }

    async deleteTwit(): Promise<{ count: number }> {
        try {
            const result = await this.prisma.twit.deleteMany()
            return {count: result.count}
        }
        catch (error) {
            logger.error(error)
            throw new Error('Error deleting twit')
        }
    }
}