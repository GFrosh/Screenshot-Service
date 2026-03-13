const express = require('express');
const router = express.Router();
const { takeScreenshot } = require('../services/screenshotService');

router.post('/', async (req, res) => {
	
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

module.exports = router;
