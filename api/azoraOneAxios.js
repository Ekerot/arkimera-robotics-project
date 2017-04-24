const axios = require('axios');
const secrets = require('./secrets.js');

const instance = axios.create({
  baseURL: 'https://azoraone.azure-api.net/',
  headers: {
    'Client-Key': secrets.azoraOneclientKeySecret,
    'Ocp-Apim-Subscription-Key': secrets.azoraOneSubscriptionKeySecret,
  },
});

module.exports = instance;
