import express from 'express';
import path from 'path';
import screenshotRoute from './routes/screenshot';

export function createApp() {
    const app = express();
    app.use(express.json());
    app.get('/', (req, res) => {
        res.json({ message: 'service is running!' });
    });
    app.use('/screenshots', express.static(path.resolve(process.cwd(), 'screenshots')));
    app.use('/screenshot', screenshotRoute);
    return app;
}

if (require.main === module) {
    const app = createApp();
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
        console.log('Server is active on port:', port);
    });
}
