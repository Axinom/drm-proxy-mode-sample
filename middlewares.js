const EntitlementService = require('./services/entitlement.service.js');
const CatalogService = require('./services/catalog.service.js');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');
const config = require('./utils/config');

const ProxyHelpers = {
    onProxyRes: (proxyRes, req, res) => {
        if (proxyRes.statusCode != 200) {
            console.log(proxyRes.headers);
            res.sendStatus(500);
        } else {
            console.log(proxyRes.headers['x-axdrm-message']);
            //The License Request Info Message is only for consumption by the proxy. This should not be returned to the end-user.
            delete proxyRes.headers['x-axdrm-message'];
        }
    }, onError: (err, req, res, target) => {
        console.log(err);
        res.writeHead(500, {
            'Content-Type': 'text/plain',
        });
        res.end();
    }
};

const Middlewares = {
    fairplayProxy: createProxyMiddleware({
        target: config.FAIRPLAY_LS_URL,
        secure: false, ignorePath: true, changeOrigin: true, ...ProxyHelpers
    }),

    playreadyProxy: createProxyMiddleware({
        target: config.PLAYREADY_LS_URL,
        secure: false, ignorePath: true, changeOrigin: true, ...ProxyHelpers
    }),

    widevineProxy: createProxyMiddleware({
        target: config.WIDEVINE_LS_URL,
        secure: false, ignorePath: true, changeOrigin: true, ...ProxyHelpers
    }),
    setTokenHeader: async (req, res, next) => {
        const videoId = req.params.id;
        console.log(videoId);
        const targetVideo = await CatalogService.getVideoById(videoId);

        if (targetVideo) {
            // The video with the specified id was found
            console.log('Found video:', targetVideo);
        } else {
            // No video with the specified id was found
            console.log('Video not found');
            res.sendStatus(500);
        }

        const token = await EntitlementService.getToken(targetVideo);

        req.headers['X-AxDRM-Message'] = token;
        next();

    }
};

module.exports = Middlewares;