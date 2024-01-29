
const fs = require('fs');

const CatalogService = {
    getVideoById: async (id) => {
        let videoList = require('../videos.json');
        const video = videoList.find((item) => item.id === id);
        return video;
    },
};

module.exports = CatalogService;


