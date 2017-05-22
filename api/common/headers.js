const secrets = require('../secrets.js');

module.exports = {
  // TODO: Rewrite to get from req.decoded or database
  'Client-Key': secrets.azoraOneclientKeySecret,
  'Ocp-Apim-Subscription-Key': secrets.azoraOneSubscriptionKeySecret,
};
