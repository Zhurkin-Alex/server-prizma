"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const twit_controller_1 = require("./twit/twit.controller");
const client_1 = require("@prisma/client");
const log_1 = __importDefault(require("./utils/log"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const site_controller_1 = require("./site/site.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4100;
const prisma = new client_1.PrismaClient();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
// Set up views
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middleware for parsing JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080'
}));
// Routes
app.use('/api/twits', twit_controller_1.twitRouter);
app.use('/api/site', site_controller_1.siteRouter);
// Profile route
app.get('/profile', (req, res) => {
    const user = {
        name: 'John Doe',
        age: 30,
    };
    res.render('profile', { user });
});
// Error route for testing
app.get('/error', (req, res) => {
    throw new Error('Test error');
});
// 404 handler
app.all('*', (req, res) => {
    res.status(404).send({ message: 'Not found' });
});
// Error handling middleware
app.use((err, req, res, next) => {
    log_1.default.error(err.stack);
    res.status(500).send({ message: err.message });
});
// Main function to start the server
async function main() {
    try {
        app.listen(PORT, () => {
            log_1.default.info(`Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        log_1.default.error(`Failed to start server: ${err.message}`);
        process.exit(1);
    }
}
main().then(async () => {
    await prisma.$connect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
