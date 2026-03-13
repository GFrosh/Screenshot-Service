import express from 'express';
import { Request, Response } from 'express';
import takeScreenshot from '../services/screenshotService';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	
	const url = req.body?.url;
	if (!url) return res.status(400).json({ success: false, error: 'URL is required' });

	try {
		const imagePath = await takeScreenshot(url);
		res.json({ success: true, screenshot_url: imagePath });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: 'Failed to take screenshot' });
	}
});

export default router;
