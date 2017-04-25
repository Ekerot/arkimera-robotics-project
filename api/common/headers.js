const secrets = require('../secrets.js');

module.exports = {
  'Client-Key': secrets.azoraOneclientKeySecret,
  'Ocp-Apim-Subscription-Key': secrets.azoraOneSubscriptionKeySecret,
};
