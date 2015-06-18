var util = require('util');
var nodemailer = require('nodemailer');
var sendGridTransport = require('nodemailer-sendgrid-transport');
var BaseMailer = require('./BaseMailer');

function SendGridMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(sendGridTransport(this.getConfig().transporter)));
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

module.exports = SendGridMailer;
