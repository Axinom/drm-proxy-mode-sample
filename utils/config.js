const { cleanEnv, port, str, url } = require('envalid');
const config = cleanEnv(process.env, {
    COMMUNICATION_KEY_ID: str(),
    COMMUNICATION_KEY: str(),
    WIDEVINE_LS_URL: url(),
    FAIRPLAY_LS_URL: url(),
    PLAYREADY_LS_URL: url(),
    PORT: port()
});
module.exports = config;