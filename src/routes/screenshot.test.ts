import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import request from 'supertest';
import { buildScreenshotRouter } from './screenshot';

function createTestApp(screenshotFn: (url: string) => Promise<string>) {
    const app = express();
    app.use(express.json());
    app.use('/screenshot', buildScreenshotRouter(screenshotFn));
    return app;
}

test('POST /screenshot returns 400 when url is missing', async () => {
    const app = createTestApp(async () => '/screenshots/ignored.png');

    const response = await request(app).post('/screenshot').send({});

    assert.equal(response.status, 400);
    assert.deepEqual(response.body, {
        success: false,
        error: 'URL is required'
    });
});

test('POST /screenshot returns screenshot_url on success', async () => {
    const app = createTestApp(async (url: string) => {
        assert.equal(url, 'https://example.com');
        return '/screenshots/example.png';
    });

    const response = await request(app)
        .post('/screenshot')
        .send({ url: 'https://example.com' });

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
        success: true,
        screenshot_url: '/screenshots/example.png'
    });
});

test('POST /screenshot returns 500 when screenshot service fails', async () => {
    const app = createTestApp(async () => {
        throw new Error('boom');
    });

    const response = await request(app)
        .post('/screenshot')
        .send({ url: 'https://example.com' });

    assert.equal(response.status, 500);
    assert.deepEqual(response.body, {
        success: false,
        error: 'Failed to take screenshot'
    });
});
