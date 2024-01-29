const express = require('express');
const router = express.Router();
const Middlewares = require('./middlewares');

router.post('/fairplay', Middlewares.setTokenHeader, Middlewares.fairplayProxy);
router.post('/widevine/:id', Middlewares.setTokenHeader, Middlewares.widevineProxy);
router.post('/playready', Middlewares.setTokenHeader, Middlewares.playreadyProxy);

module.exports = router;