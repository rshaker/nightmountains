# nightmountains

<p align="left">
  <img height="240" src="assets/nightmountains.png">
</p>

![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Template](https://img.shields.io/badge/Status-Template-green)
![License](https://img.shields.io/github/license/rshaker/nightmountains)

## Overview

Nightmountains provides a ready-to-use template for developing libraries that work in both standard web pages and browser extensions. It includes preconfigured TypeScript, WebPack, and Playwright testing tools.

This project is unfinished, unstable, and under development.

## Installation

```bash
# Clone the private repo
git clone git@github.com:rshaker/nightmountains.git
cd nightmountains

# Requires node v22.12.0+ 
nvm use
npm install

# Hermetic brower installation requires `PLAYWRIGHT_BROWSERS_PATH=0`
cp template.env .env
# .env is automatically applied when invoking playwright from w/in VSCode IDE,
# but you'll need to set this variable manually from the command line:
PLAYWRIGHT_BROWSERS_PATH=0 npx playwright install

# Build library
npm run build:dev

# Build browser all extensions
npm run build:webext:dev
```

## Features

This section was GPT's idea...

- 🔧 **Development Ready** - Preconfigured TypeScript, WebPack, and testing setup
- 📦 **Library Template** - Structure optimized for publishing as an npm package
- 🧪 **Testing Framework** - Includes Playwright for end-to-end testing
- 🌐 **Web Extension Ready** - Sample implementation for browser extension environments
- 🔍 **Context Detection** - Utilities for identifying the current browser context

## Prerequisites

- Node.js (22.12.0+)
- npm (10.9.0+)

## License

MIT