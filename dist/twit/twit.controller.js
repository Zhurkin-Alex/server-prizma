"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitRouter = void 0;
const express_1 = require("express");
const twit_service_1 = require("./twit.service");
const auth_middleware_1 = require("../auth.middleware");
const twit_dto_1 = require("./twit.dto");
const router = (0, express_1.Router)();
const twitterService = new twit_service_1.TwitService();
router.post('/', auth_middleware_1.authMiddleWare, async (req, res) => {
    try {
        const validation = twit_dto_1.createTwitDto.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return;
        }
        // Assuming `createTwit` is asynchronous
        const twit = await twitterService.createTwit(req.body);
        res.status(201).json(twit);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while creating the twit." });
    }
});
router.get('/', async (req, res) => {
    const twits = await twitterService.getTwits();
    res.json(twits);
});
router.delete('/', auth_middleware_1.authMiddleWare, async (req, res) => {
    try {
        const result = await twitterService.deleteTwit();
        res.status(200).json({ message: `Deleted ${result.count} twits successfully.` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while deleting all twits." });
    }
});
exports.twitRouter = router;
