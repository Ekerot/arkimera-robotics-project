const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const nameMinLength = 3;
const nameMaxLength = 20;

const pwMinLength = 5;
const pwMaxLength = 5;

const clientKeyLength = 22;
const subKeyLength = 32;
const urlMinLength = 2;

// subscriptionKey is Ocp-Apim-Subscription-Key, Found in Profile
// Client Key, The application's unique key.
// urlPath is 'student' in this url: https://azoraone.azure-api.net/student/api/companies

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be blank'],
    unique: [true, 'Username already taken'],
    trim: true,
    minLength: [nameMinLength, `Username min length is ${nameMinLength}`],
    maxLength: [nameMaxLength, `Username max length is ${nameMaxLength}`],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
    minLength: [pwMinLength, `Password min length is ${pwMinLength}`],
    maxLength: [pwMaxLength, `Password max length is ${pwMaxLength}`],
  },
  subscriptionKey: {
    type: String,
    required: [true, 'Subscription key cannot be blank'],
    minLength: [subKeyLength, `Subscription key min length is ${subKeyLength}`],
    maxLength: [subKeyLength, `Subscription key max length is ${subKeyLength}`],
  },
  clientKey: {
    type: String,
    required: [true, 'Client key cannot be blank'],
    minLength: [clientKeyLength, `Client key min length is ${clientKeyLength}`],
    maxLength: [clientKeyLength, `Client key max length is ${clientKeyLength}`],
  },
  appUrl: {
    type: String,
    required: [true, 'Application url cannot be blank'],
    trim: true,
    minLength: [urlMinLength, `Application url min length is ${urlMinLength}`],
  },
}, { timestamps: true });

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

/*
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
*/

function formatMongoDocUser(user) {
  return {
    username: user.username,
    clientKey: user.clientKey,
    subscriptionKey: user.subscriptionKey,
    appUrl: user.appUrl,
  };
}

userSchema.statics.addNew = function (user, callback) {
  new this(user).save((err, newUser) => {
    if (err) {
      callback(err);
    } else {
      callback(null, formatMongoDocUser(newUser));
    }
  });
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
        foundUser.comparePassword(user.password, (err, result) => {
          if (err) {
            callback(err);
          } else if (result === true) {
            callback(null, {
              username: foundUser.username,
              clientKey: foundUser.clientKey,
              subscriptionKey: foundUser.subscriptionKey,
              appUrl: foundUser.appUrl,
            });
          } else {
            callback(new Error('Wrong password'));
          }
        });
      }
    });
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
