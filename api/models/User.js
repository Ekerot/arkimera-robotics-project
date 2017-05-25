const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const nameMinLength = 3;
const nameMaxLength = 20;

const pwMinLength = 5;
const pwMaxLength = 20;

const clientKeyLength = 22;
const subKeyLength = 32;
const urlMinLength = 2;

// subscriptionKey is Ocp-Apim-Subscription-Key, Found in Profile
// Client Key, The application's unique key.
// appUrl is 'student' in this url: https://azoraone.azure-api.net/student/api/companies

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username cannot be blank'],
    unique: true,
    trim: true,
    minlength: [nameMinLength, `username min length is ${nameMinLength}`],
    maxlength: [nameMaxLength, `username max length is ${nameMaxLength}`],
  },
  password: {
    type: String,
    required: [true, 'password cannot be blank'],
    minlength: [pwMinLength, `password min length is ${pwMinLength}`],
    maxlength: [pwMaxLength, `password max length is ${pwMaxLength}`],
  },
  subscriptionKey: {
    type: String,
    required: [true, 'subscriptionKey cannot be blank'],
    minlength: [subKeyLength, `subscriptionKey key min length is ${subKeyLength}`],
    maxlength: [subKeyLength, `subscriptionKey key max length is ${subKeyLength}`],
  },
  clientKey: {
    type: String,
    required: [true, 'clientKey cannot be blank'],
    minlength: [clientKeyLength, `clientKey min length is ${clientKeyLength}`],
    maxlength: [clientKeyLength, `clientKey max length is ${clientKeyLength}`],
  },
  appUrl: {
    type: String,
    required: [true, 'appUrl cannot be blank'],
    trim: true,
    minlength: [urlMinLength, `Application url min length is ${urlMinLength}`],
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

const User = mongoose.model('User', userSchema);

module.exports = User;
