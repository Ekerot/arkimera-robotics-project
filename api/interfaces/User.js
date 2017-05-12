const createError = require('http-errors');

const User = require('../models/User.js');

function formatMongoDocUser(user) {
  return {
    username: user.username,
    clientKey: user.clientKey,
    subscriptionKey: user.subscriptionKey,
    appUrl: user.appUrl,
  };
}

module.exports = {
  addNew: user => new Promise((resolve, reject) => {
    const newUser = new User(user);
    newUser.validate((err) => {
      if (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
          const keys = Object.keys(err.errors);
          const firstKey = keys[0]; // We only send the first error even if there are more
          const errMsg = err.errors[firstKey].message;
          reject(createError(400, errMsg));
        } else {
          console.log('500 in validate');
          reject(createError(500));
        }
      } else {
        newUser.save((saveErr, savedUser) => {
          if (saveErr) {
            if (saveErr.code === 11000) { // code: 11000 = user already exists
              reject(createError(403, 'User already exists'));
            } else {
              console.log('500 in save');
              reject(createError(500));
            }
          } else {
            resolve(formatMongoDocUser(savedUser));
          }
        });
      }
    });
  }),
  verifyPassword: user => new Promise((resolve, reject) => {
    if (!user.username) {
      reject(createError(400, 'Missing username'));
    } else if (!user.password) {
      reject(createError(400, 'Missing password'));
    } else {
      User.findOne({ username: user.username }, (findErr, foundUser) => {
        if (findErr) {
          reject(createError(500));
        } else if (!foundUser) {
          reject(createError(401, 'Unauthorized'));
        } else {
          foundUser.comparePassword(user.password, (err, result) => {
            if (err) {
              reject(createError(500));
            } else if (result === true) {
              resolve(formatMongoDocUser(foundUser));
            } else {
              reject(createError(401, 'Unauthorized'));
            }
          });
        }
      });
    }
  }),
};
