# Axinom DRM Proxy Mode

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2012-brightgreen.svg)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/)

## Description

In the proxy mode, the Entitlement Service acts as a License Service Proxy to the Player (hence the name). The player sends a License Request to the Entitlement Service. Having received the request, Entitlement Service first authorizes it. If access can be granted, it generates an Entitlement Message. Then it forwards the License Request, which it received from the client device, together with the Entitlement Message to the License Service. In response it receives the DRM License and forwards it to the requesting Player. In between, Entitlement Service has another chance to deny the request.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)

## Installation

```bash
# Clone the repository
https://github.com/COUNTZERO-DEV/drm-proxy.git

# Navigate to the project directory
cd drm-proxy

# Install dependencies
npm install
```

## Configuration

- Rename .env.template to .env and add values
- Add entries to videos.json in below format

```javascript
{
		"id": "",
		"keys": [
			{
				"keyId": ""
			},
			{
				"keyId": ""
			},
			{
				"keyId": ""
			}
		]
	}

```

- Update the `manifestUri` and `id` parameters in public > index.html

```javascript
const id = '3af89f70-7b5e-4ece-b12a-87d550661b5a'
const manifestUri =
	'https://855a9fc3487ea8637e749dd9.blob.core.windows.net/video-output/6AF6FsgTSeyjQqQdoBp2pt/dash/manifest.mpd'
```

## Usage

- Run web server

```bash
npm run start
```

- navigate to http://localhost:3000 to access the player.
