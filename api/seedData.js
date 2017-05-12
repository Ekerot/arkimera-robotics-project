const mongoose = require('./config/mongoose.js');
const User = require('./interfaces/User.js');
const secrets = require('./secrets.js');

const db = mongoose();

const userDetails = {
  username: 'admin',
  password: 'admin',
  clientKey: secrets.clientKey,
  subscriptionKey: secrets.azoraOneSubscriptionKeySecret,
  appUrl: secrets.appUrl,
};

User.addNew(userDetails, (err, doc) => {
  if (err) console.log(err);
  if (doc) console.log(doc);
  db.disconnect();
});

// To delete entire db, in terminal use command:
// mongo <dbname> --eval "db.dropDatabase()"
