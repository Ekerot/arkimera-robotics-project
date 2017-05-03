const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// TODO add better validation on name and password
// Validate password
userSchema.path('password').validate((password) => {
  return password.length >= 6;
}, 'The password must be of minimum length 6 characters.');

// Hash and salt password
userSchema.pre('save', function (next) {
  let _this = this;
  bcrypt.genSalt(10, (err, salt) => {
      if (err) { return next(err); }

        // Using https://www.npmjs.com/package/bcrypt-nodejs
      bcrypt.hash(_this.password, salt, (err, hash) => {
          if (err) { return next(err); }

            // set the password to the hash
          _this.password = hash;
          next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, res) => {
      if (err) {
          return callback(err);
        }

      callback(null, res);
    });
};

let User = mongoose.model('User', userSchema);

module.exports = User;
