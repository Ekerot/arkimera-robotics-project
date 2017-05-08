const mongoose = require('./config/mongoose.js');
const User = require('./interfaces/User.js');

const db = mongoose();

const userDetails = { username: 'admin', password: 'admin' };

User.addNew(userDetails, (err, doc) => {
  if (err) console.log(err);
  if (doc) console.log(doc);
  db.disconnect();
});
