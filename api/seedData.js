const mongoose = require('./config/mongoose.js');
const User = require('./interfaces/User.js');
const secrets = require('./secrets.js');

const db = mongoose();

/**
 * WARNING! DO NOT RUN IN PRODUCTION!
 *
 * This script will drop the users and files collections from the db and add an admin user with hardcoded admin password.
 * If there is no files collection, the error from that operation can be ignored.
 */
db.connection.collection('users').drop((error) => {
  if (error) {
    console.log('users collection dropped not dropped due to error');
    console.log(error);
    console.log('----end of users error ----');
  } else {
    console.log('users collection dropped');

    const userDetails = {
      username: 'admin',
      password: 'admin',
      clientKey: secrets.azoraOneclientKeySecret,
      subscriptionKey: secrets.azoraOneSubscriptionKeySecret,
      appUrl: secrets.appUrl,
    };

    User.addNew(userDetails)
      .then((doc) => {
        console.log('successfully seeded new user');
        console.log(doc);
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

db.connection.collection('files').drop((error) => {
  if (error) {
    console.log('files collection not dropped due to error');
    console.log('this error can be ignored if files collection did not exist before running script');
    console.log(error);
    console.log('----end of files error ----');
  } else {
    console.log('files collection dropped');
  }
});
