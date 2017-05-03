<<<<<<< HEAD
const mongoose = require('./config/mongoose.js');
const User = require('./interfaces/User.js');

const db = mongoose();

const userDetails = { username: 'admin', password: 'admin' };

User.addNew(userDetails, (err, doc) => {
  if (err) console.log(err);
  if (doc) console.log(doc);
  db.disconnect();
=======
const db = require('./config/mongoose.js');
const User = require('./models/User.js');

db();

const userDetails = { username: 'admin', password: 'admin' };

const user = new User({ userDetails });
/*user.save((err, doc) => {
  if (err) console.log(err);
  if (doc) console.log(doc);
});*/

User.addNew(userDetails, (err, doc) => {
  if (err) console.log(err);
  if (doc) console.log(doc);
>>>>>>> Working on seedData function
});
