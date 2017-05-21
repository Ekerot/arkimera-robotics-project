// @ts-check
const moment = require('moment');

/**
 * Payload object
 * Usage:
 * const Payload = require('../common/Payload);
 * ...
 * res.status(statusCode).send(new Payload(success, statusCode, data));
 */
class Payload {
  /**
   * @param {boolean} success
   * @param {number} statusCode
   * @param {object} data
   */
  constructor(success, statusCode, data) {
    this.success = success;
    this.code = statusCode;
    this.time = moment().format('YYY-MM-DD hh:mm:ss');
    this.data = data;
    this.message = this.buildMessage();
  }

  buildMessage() {
    if (!this.success) {
      return this.data[0].message;
    }
    return '';
  }
}

module.exports = Payload;
