/**
 * Puppeteer configuration for Render compatibility.
 * Ensures Chromium is downloaded during npm install and cached properly.
 */

const os = require('os');
const path = require('path');

module.exports = {
  // Cache directory for browser downloads
  cacheDirectory: path.join(process.env.HOME || os.homedir(), '.cache', 'puppeteer'),
  
  // Skip executable verification during install
  skipDownload: false,
  
  // Use the downloaded Chrome executable
  restoreDefaultCache: true,
};
