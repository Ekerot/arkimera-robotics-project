const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const nameMinLength = 5;
const usernameValidationMsg = `The username must be of minimum length ${nameMinLength} characters.`;
userSchema.path('username').validate(name => name.length >= nameMinLength, usernameValidationMsg);

const pwMinLength = 5;
const passwordValidationMsg = `The password must be of minimum length ${pwMinLength} characters.`;
userSchema.path('password').validate(password => password.length >= pwMinLength, passwordValidationMsg);

// Have to use regular function def instead of () => {}
// because otherwise the meaning of 'this' changes.
userSchema.pre('save', function (next) {
  const that = this;
  bcrypt.genSalt(10, (saltErr, salt) => {
    if (saltErr) {
      next(saltErr);
    } else {
      bcrypt.hash(that.password, salt, (hashErr, hash) => {
        if (hashErr) {
          next(hashErr);
        } else {
          that.password = hash;
          next();
        }
      });
    }
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

userSchema.statics.addNew = function (user, callback) {
  if (!user.username) {
    callback(new TypeError('Missing username'));
  } else if (!user.password) {
    callback(new TypeError('Missing password'));
  } else {
    this.findOne({ username: user.username }, (findErr, foundUser) => {
      if (findErr) {
        callback(findErr);
      } else if (foundUser) {
        callback(new Error('User already exists'));
      } else {
        new this(user).save((saveErr, newUser) => {
          const returnedUser = { username: newUser.username };
          callback(saveErr, returnedUser);
        });
      }
    });
  }
};

userSchema.statics.verifyPassword = function (user, callback) {
  if (!user.username) {
    callback(new TypeError('Missing username'));
  } else if (!user.password) {
    callback(new TypeError('Missing password'));
  } else {
    this.findOne({ username: user.username }, (findErr, foundUser) => {
      if (findErr) {
        callback(findErr);
      } else if (!foundUser) {
        callback(new Error('No user with that username'));
      } else {
        foundUser.comparePassword(user.password, callback);
      }
    });
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
