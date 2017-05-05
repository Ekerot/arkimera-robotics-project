const User = require('../models/User.js');

module.exports = {
  addNew: (user, callback) => {
    User.addNew(user, callback);
  },
  verifyPassword: (user, callback) => {
    User.verifyPassword(user, callback);
  },
};
