const axios = require('axios');

const api = axios.create({
    baseURL: 'https://www.thecolorapi.com',
});

module.exports = api;
