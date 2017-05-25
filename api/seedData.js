const mongoose = require('./config/mongoose.js');
const User = require('./interfaces/User.js');
const secrets = require('./secrets.js');

const db = mongoose();

/**
 * WARNING! DO NOT RUN IN PRODUCTION!
 *
 * This script will drop the users collection from the db and add an admin user with hardcoded admin password.
 */

db.connection.collections.users.drop((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('collection dropped');

    const userDetails = {
      username: 'admin',
      password: 'admin',
      clientKey: secrets.azoraOneclientKeySecret,
      subscriptionKey: secrets.azoraOneSubscriptionKeySecret,
      appUrl: secrets.appUrl,
    };

    User.addNew(userDetails)
      .then((doc) => {
        console.log(doc);
        console.log('successfully seeded new user');
        db.disconnect();
        process.exit();
      })
      .catch((err) => {
        console.log(err);
        db.disconnect();
        process.exit();
      });
  }
});

db.connection.collection.files.drop((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('collection dropped');
  }
});
