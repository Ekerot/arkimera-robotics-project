const User = require('../../models/User.js');
const mongoose = require('../../config/mongoose');

const db = mongoose('test-db');

describe('User model', () => {
  describe('validation', () => {
    function createValidUser() {
      return {
        username: 'validUsername',
        password: 'validPassword',
        clientKey: new Array(22 + 1).join('a'),
        subscriptionKey: new Array(32 + 1).join('a'),
        appUrl: new Array(2 + 1).join('a'),
      };
    }

    it('should not allow empty username', (done) => {
      const user = createValidUser();
      user.username = null;

      new User(user).save((err) => {
        console.log(err);
        expect(err.name).toBe('ValidationError');
        done();
      });
    });
  });
});
