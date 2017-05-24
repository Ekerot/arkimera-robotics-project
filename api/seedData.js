const mongoose = require('./config/mongoose.js');
const User = require('./interfaces/User.js');
const secrets = require('./secrets.js');

let db;

/**
 * WARNING! DO NOT RUN IN PRODUCTION!
 *
 * This script will drop the users collection from the db and add an admin user with hardcoded admin password.
 */

new Promise((resolve, reject) => {
  const tempdb = mongoose(null, (err) => {
    if (err) {
      reject(err);
    } else {
      db = tempdb;
      resolve();
    }
  });
})
.then(() => new Promise((resolve, reject) => {
  db.connection.collectionNames((err, colls) => {
    if (err) {
      reject(err);
    } else {
      console.log(colls);
    }
  });

  if (db.connection.collections.users) {
    console.log('dropping users collection');
    db.connection.collections.users.drop((error) => {
      if (error) {
        reject(error);
      } else {
        console.log('users collection dropped');
        resolve();
      }
    });
  } else {
    console.log('no users collection so dropping not needed');
    resolve();
  }
}))
.then(() => new Promise((resolve, reject) => {
  console.log('seeding new user');
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
    resolve();
  })
  .catch((err) => {
    reject(err);
  });
}))
.then(() => new Promise((resolve, reject) => {
  if (db.connection.collections.files) {
    console.log('dropping files collection');
    db.connection.collections.files.drop((error) => {
      if (error) {
        reject(error);
      } else {
        console.log('files collection dropped');
        resolve();
      }
    });
  } else {
    console.log('no files collection so dropping not needed');
    resolve();
  }
}))
.then(() => {
  console.log('Completed, shutting down');
  db.disconnect();
  process.exit();
})
.catch((err) => {
  console.log(err);
  db.disconnect();
  process.exit();
});
