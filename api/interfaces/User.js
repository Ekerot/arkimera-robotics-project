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
  addNew: user =>
    new Promise((resolve, reject) => {
      const newUser = new User(user);
      newUser.validate((err) => {
        if (err) {
          if (err.name === 'ValidationError') {
            const keys = Object.keys(err.errors);
            const firstKey = keys[0];
            const errMsg = err.errors[firstKey].message;
            return reject(createError(400, errMsg));
          }
          return reject(createError(500));
        }
        newUser.save((saveErr, savedUser) => {
          if (saveErr) {
            if (saveErr.code === 11000) {
              return reject(createError(403, 'User already exists'));
            }
            return reject(createError(500));
          }
          return resolve(formatMongoDocUser(savedUser));
        });
      });
    }),
  verifyPassword: user =>
    new Promise((resolve, reject) => {
      if (!user.username) {
        return reject(createError(400, 'Missing username'));
      } else if (!user.password) {
        return reject(createError(400, 'Missing password'));
      }
      User.findOne({ username: user.username }, (findErr, foundUser) => {
        if (findErr) {
          return reject(createError(500));
        } else if (!foundUser) {
          return reject(createError(401, 'Unauthorized'));
        }
        foundUser.comparePassword(user.password, (err, result) => {
          if (err) {
            return reject(createError(500));
          } else if (result === true) {
            return resolve(formatMongoDocUser(foundUser));
          }
          return reject(createError(401, 'Unauthorized'));
        });
      });
    }),
};
