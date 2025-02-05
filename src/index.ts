import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { twitRouter } from './twit/twit.controller';
import { PrismaClient } from '@prisma/client';
import logger from './utils/log';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { siteRouter } from './site/site.controller';
import { templatesRouter } from './templates/templates.controller';
import { authRouter } from './auth/auth.routes';

// dotenv.config();
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env' });
}

const app = express();
const PORT = process.env.PORT || 4100;
const prisma = new PrismaClient();

app.use(helmet())
app.use(compression())

// Set up views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware for parsing JSON
app.use(express.json());

// app.use(cors({
//     origin: 'http://localhost:8080'
// }));
const allowedOrigins = [
    'http://localhost:8080', // Локальный фронтенд
    'https://server-prizma-supabase.vercel.app', // Домен фронтенда на Vercel
    'http://localhost:3001',
    'https://nextjs-snowy-six-62.vercel.app',
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

// Routes
app.use('/api/twits', twitRouter);
app.use('/api/site', siteRouter);
app.use('/api/site/templates', templatesRouter);
app.use('/api/auth', authRouter)

// Profile route
app.get('/profile', (req: Request, res: Response) => {
    const user = {
        name: 'John Doe',
        age: 30,
    };
    res.render('profile', { user });
});

// Error route for testing
app.get('/error', (req: Request, res: Response) => {
    throw new Error('Test error');
});

// 404 handler
app.all('*', (req: Request, res: Response) => {
    res.status(404).send({ message: 'Not found' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack)
    res.status(500).send({ message: err.message });
});

// Main function to start the server
async function main() {
    try {
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`)
        });
    } catch (err) {
        logger.error(`Failed to start server: ${(err as Error).message}`);
        process.exit(1);
    }
}


if (process.env.NODE_ENV === 'development') {
    // Main function to start the server
    async function main() {
        try {
            app.listen(PORT, () => {
                logger.info(`Server is running on port ${PORT}`)
            });
        } catch (err) {
            logger.error(`Failed to start server: ${(err as Error).message}`);
            process.exit(1);
        }
    }

    main().then(async()=> {
        await prisma.$connect()
    }).catch(async(e)=>{
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
}

export default app;
