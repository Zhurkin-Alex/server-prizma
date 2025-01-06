import { Request, Response, Router } from 'express';
import { TwitService } from './twit.service';
import { authMiddleWare } from '../auth.middleware';
import { createTwitDto } from './twit.dto';

const router = Router();
const twitterService = new TwitService();

router.post('/', authMiddleWare, async (req: Request, res: Response): Promise<void> => {
    try {
        const validation = createTwitDto.safeParse(req.body)
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return
        }

        // Assuming `createTwit` is asynchronous
        const twit = await twitterService.createTwit(req.body);

        res.status(201).json(twit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the twit." });
    }
});

router.get('/', async(req: Request, res: Response) => {
    const twits = await twitterService.getTwits();
    res.json(twits);
})

router.delete('/', authMiddleWare, async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await twitterService.deleteTwit();
        res.status(200).json({ message: `Deleted ${result.count} twits successfully.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting all twits." });
    }
});

export const twitRouter = router;
