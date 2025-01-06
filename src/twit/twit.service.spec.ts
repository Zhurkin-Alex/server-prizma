import { TwitService } from "./twit.service";

describe('TwitService', () => {
    const twitService = new TwitService();

    it('should create a twit', async () => {
        const twit = await twitService.createTwit({
            text: 'Hello, world!',
        });

        expect(twit).toHaveProperty('id');
        expect(twit.text).toEqual('Hello, world!');
    })
})