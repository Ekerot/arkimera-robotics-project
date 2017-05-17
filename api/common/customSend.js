const moment = require('moment');

module.exports = (success, statusCode, data) => {
  console.log(data);
//   'typeof x' will give object if null so we must check for it not being null as well
  if (
    typeof success !== 'boolean' ||
    typeof statusCode !== 'number' ||
    (typeof data !== 'object' && data !== null)
  ) {
    throw new TypeError('Incorrect usage of customSend');
//   if (typeof success !== 'boolean') {
//     success = success || false;
//   }
//   if (isNaN(statusCode)) {
//     statusCode = parseInt(statusCode);
//   }
//   if (typeof data !== 'object' && data !== null) {
//     data = { data };
//   }
  }

  let message = '';

  if (!success) {
    message = data[0].message;
  }

  const payload = {
    success,
    data,
    time: moment().format('YYYY-MM-DD hh:mm:ss'),
    code: statusCode,
    message,
  };

  res.status(statusCode).json(payload);
};
