const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(url: string): Promise<string> {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	try {
		const page = await browser.newPage();
		await page.goto(url, { waitUntil: 'networkidle2' });

		// Make screenshots folder if it doesn't exist
		const folder = path.join(__dirname, '../../screenshots');
		if (!fs.existsSync(folder)) fs.mkdirSync(folder);

		const screenshotBuffer = await page.screenshot({ fullPage: true });
		return screenshotBuffer.toString('base64');
	} finally {
		await browser.close();
	}
}

export default takeScreenshot;
