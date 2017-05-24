const mongoose = require('mongoose');

function mongoDB(dbName, callback) {
  const connectionString = `mongodb://localhost/${dbName || 'arkimera'}`;
  const db = mongoose.connect(connectionString);
  mongoose.Promise = global.Promise;

  db.connection.on('connected', () => {
    if (callback) {
      callback();
    }
    console.log('mongoDB connection open.');
  });

  db.connection.on('error', (err) => {
    console.error('mongoDB connection error: ', err);
    if (callback) {
      callback(err);
    }
  });

  db.connection.on('disconnected', () => {
    console.log('mongoDB connection disconnected.');
  });

  // If the Node process ends, close the Mongoose connection.
  process.on('SIGINT', () => {
    db.connection.close(() => {
      console.log('mongoDB connection disconnected through app termination.');
      process.exit(0);
    });
  });

  return db;
}

module.exports = mongoDB;
