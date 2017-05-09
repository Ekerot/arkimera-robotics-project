const bcrypt = require('bcryptjs');

const nameMinLength = 3;
const nameMaxLength = 20;

const pwMinLength = 5;
const pwMaxLength = 20;

const clientKeyLength = 22;
const subKeyLength = 32;
const urlMinLength = 2;

class User {
  constructor(user) {
    this.username = user.username;
    this.appUrl = user.appUrl;
    this.clientKey = user.clientKey;
    this.subscriptionKey = user.subscriptionKey;
    this.password = user.password;
  }

  set username(username) {
    if (username.length < nameMinLength || username.length > nameMaxLength) {
      throw new TypeError(`Username length min: ${nameMinLength}, max: ${nameMaxLength}`);
    }

    this.username = username;
  }

  get password() { // eslint-disable-line class-methods-use-this
    throw new Error('Getting password not allowed');
  }

  set password(password) { // eslint-disable-line class-methods-use-this
    throw new Error('Setting password not allowed');
  }

  set appUrl(appUrl) {
    if (appUrl.length < urlMinLength) {
      throw new TypeError(`Application url length min: ${urlMinLength}`);
    }

    this.appUrl = appUrl;
  }

  set clientKey(clientKey) {
    if (clientKey.length === clientKeyLength) {
      throw new TypeError(`Client key length must be ${clientKeyLength}`);
    }

    this.clientKey = clientKey;
  }

  set subscriptionKey(subscriptionKey) {
    if (subscriptionKey.length === subKeyLength) {
      throw new TypeError(`Subscription key length must be ${subKeyLength}`);
    }

    this.subscriptionKey = subscriptionKey;
  }

  setHashedPassword(password, callback) {
    if (password.length < pwMinLength || password.length > pwMaxLength) {
      callback(new TypeError(`Password length min: ${pwMinLength}, max: ${pwMaxLength}`));
    } else {
      const that = this;
      bcrypt.genSalt(10, (saltErr, salt) => {
        if (saltErr) {
          callback(saltErr);
        } else {
          bcrypt.hash(that.password, salt, (hashErr, hash) => {
            if (hashErr) {
              callback(hashErr);
            } else {
              that.password = hash;
              callback();
            }
          });
        }
      });
    }
  }
}

module.exports = User;
