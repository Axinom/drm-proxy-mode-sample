const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../utils/config');

const NO_SUCH_VIDEO_STATUS_CODE = 400;
const NEED_TO_KNOW_SECRETS_STATUS_CODE = 500;

const EntitlementService = {
    getToken: async (video) => {
        const communicationKeyAsBuffer = Buffer.from(config.COMMUNICATION_KEY, 'base64');

        const now = moment();
        const validTo = now.clone().add(1, 'days');

        const message = {
            type: 'entitlement_message',
            version: 2,
            license: {

                expiration_datetime: validTo.toISOString(),
                allow_persistence: true,
            },
            content_keys_source: {
                inline: [],
            },
            content_key_usage_policies: [
                {
                    name: 'Policy A',
                },
            ],
            license_server: { return_license_request_info: true }
        };

        video.keys.forEach(function(key) {
            // A key ID is always required. In this demo, we'll also reference the previously defined
            // key usage policy.
            let inlineKey = {
                "id": key.keyId,
                "usage_policy": "Policy A"
            };

            message.content_keys_source.inline.push(inlineKey);
        });

        const envelope = {
            version: 1,
            com_key_id: config.COMMUNICATION_KEY_ID,
            message,

            expiration_date: validTo.toISOString(),
        };

        console.log('Creating license token with payload: ' + JSON.stringify(envelope));

        // The license token must be digitally signed to prove that it came from the token service.
        const licenseToken = jwt.sign(envelope, communicationKeyAsBuffer, {
            algorithm: 'HS256',
            noTimestamp: true,
        });

        return licenseToken;
    },
};


module.exports = EntitlementService;
