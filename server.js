/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const express = require('express');
const next = require('next');

// const secure = require('express-force-https');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT || 443;
// const options = {
// 	key: fs.readFileSync('/path/privkey.pem'),
// 	cert: fs.readFileSync('/path/fullchain.pem')
// };

app
	.prepare()
	.then(() => {
		const server = express();
		// const server = express()

		// redirect to SSL
		if (!dev) {
			// server.use(secure)
		}

		server.get('*', (req, res) => {
			return handle(req, res)
		})


		const httpServer = http.createServer(server);
		// const httpServer = https.createServer(options, server);

		httpServer.listen(PORT, () => {
			console.log('Server has started on port ' + PORT);

		});
	})
	.catch(ex => {
		console.error(ex.stack)
		process.exit(1)
	})


