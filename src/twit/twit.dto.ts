import { z } from "zod";

export const createTwitDto = z.object({
    text: z.string().min(1, 'text is required in request').max(280),
})