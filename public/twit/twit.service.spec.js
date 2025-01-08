"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twit_service_1 = require("./twit.service");
describe('TwitService', () => {
    const twitService = new twit_service_1.TwitService();
    it('should create a twit', async () => {
        const twit = await twitService.createTwit({
            text: 'Hello, world!',
        });
        expect(twit).toHaveProperty('id');
        expect(twit.text).toEqual('Hello, world!');
    });
});
