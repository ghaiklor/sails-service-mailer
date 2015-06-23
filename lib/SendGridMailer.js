var util = require('util');
var nodemailer = require('nodemailer');
var Promise = require('bluebird');
var extend = require('extend');
var sendGridTransport = require('nodemailer-sendgrid-transport');
var BaseMailer = require('./BaseMailer');

util.inherits(SendGridMailer, BaseMailer);

/**
 * Create instance for sending mail through SendGrid API
 * @constructor
 */
function SendGridMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(sendGridTransport(this.getConfig('transporter'))));
}

/**
 * Get nodemailer transport
 * @returns {*}
 * @private
 */
SendGridMailer.prototype._getTransporter = function () {
  return this._transporter;
};

/**
 * Set new nodemailer transport
 * @param {Object} transporter
 * @returns {SendGridMailer}
 * @private
 */
SendGridMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

/**
 * Send mail via SendGrid API
 * @param {Object} _config Configuration object for overriding
 * @returns {Promise}
 */
SendGridMailer.prototype.send = function (_config) {
  var config = extend({}, this.getConfig(), _config);

  return new Promise(function (resolve, reject) {
    this._getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = SendGridMailer;
