# Screenshot Service

A small Express + TypeScript API that captures full-page screenshots with Puppeteer.

## Features

- `POST /screenshot` endpoint to capture a webpage screenshot
- Saves images to the local `screenshots/` directory
- Serves saved files from `GET /screenshots/<filename>`
- TypeScript build output in `dist/`
- Integration tests for the screenshot route

## Requirements

- Node.js 20+
- npm

## Install

```bash
npm install
```

## Run

Development mode (build then run with nodemon):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server listens on `http://localhost:3000`.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

The test script compiles TypeScript and runs Node's built-in test runner against `dist/`.

## API

### `POST /screenshot`

Request body:

```json
{
  "url": "https://example.com"
}
```

Success response (`200`):

```json
{
  "success": true,
  "screenshot_url": "/screenshots/screenshot-1700000000000.png"
}
```

Validation error (`400`):

```json
{
  "success": false,
  "error": "URL is required"
}
```

Server error (`500`):

```json
{
  "success": false,
  "error": "Failed to take screenshot"
}
```

## Notes

- Screenshot filenames are generated with a timestamp.
- The `screenshots/` folder is created automatically if it does not exist.
- Route tests use a stubbed screenshot function, so tests do not launch a browser.
