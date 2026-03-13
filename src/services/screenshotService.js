const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle2' });

	// Make screenshots folder if it doesn't exist
	const folder = path.join(__dirname, '../../screenshots');
	if (!fs.existsSync(folder)) fs.mkdirSync(folder);

	const filename = `screenshot-${Date.now()}.png`;
	const filepath = path.join(folder, filename);

	await page.screenshot({ path: filepath, fullPage: true });

	await browser.close();
	return `/screenshots/${filename}`;
}

module.exports = { takeScreenshot };
