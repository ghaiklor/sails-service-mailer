var util = require('util');
var extend = require('extend');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var BaseMailer = require('./BaseMailer');

util.inherits(SMTPMailer, BaseMailer);

/**
 * Create new mailer instance for sending via SMTP servers
 * @constructor
 */
function SMTPMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(smtpTransport(this.getConfig().transporter)));
}

/**
 * Returns instantiated instance of nodemailer transporter
 * @returns {*}
 * @private
 */
SMTPMailer.prototype._getTransporter = function () {
  return this._transporter;
};

/**
 * Set new instance of the nodemailer transporter
 * @param {Object} transporter New transporter instantiated with nodemailer.createTransport()
 * @returns {SMTPMailer}
 * @private
 */
SMTPMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

/**
 * Send message
 * @param {Object} _config Configuration object for overriding default config
 * @returns {SMTPMailer}
 */
SMTPMailer.prototype.send = function (_config) {
  var config = extend({}, this.getConfig(), _config);

  this._getTransporter().sendMail(config);

  return this;
};

module.exports = SMTPMailer;
