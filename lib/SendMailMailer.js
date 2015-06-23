var util = require('util');
var extend = require('extend');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var sendmailTransport = require('nodemailer-sendmail-transport');
var BaseMailer = require('./BaseMailer');

util.inherits(SendMailMailer, BaseMailer);

/**
 * Create new instance of sendmail
 * @constructor
 */
function SendMailMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(sendmailTransport(this.getConfig('transporter'))));
}

/**
 * Get nodemailer transport
 * @returns {*}
 * @private
 */
SendMailMailer.prototype._getTransporter = function () {
  return this._transporter;
};

/**
 * Set new nodemailer transport
 * @param {Object} transporter
 * @returns {SendMailMailer}
 * @private
 */
SendMailMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

/**
 * Send mail via sendmail
 * @param {Object} [_config] Additional configuration
 * @returns {Promise}
 */
SendMailMailer.prototype.send = function (_config) {
  var config = extend({}, this.getConfig(), _config);

  return new Promise(function (resolve, reject) {
    this._getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = SendMailMailer;
