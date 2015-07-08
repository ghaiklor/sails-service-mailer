var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
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

  this.setTransporter(nodemailer.createTransport(smtpTransport(this.getConfig('transporter'))));
}

/**
 * Send message
 * @param {Object} _config Configuration object for overriding default config
 * @returns {Promise}
 */
SMTPMailer.prototype.send = function (_config) {
  var config = _.omit(_.assign({}, this.getConfig(), _config), 'transporter');

  return new Promise(function (resolve, reject) {
    this.getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = SMTPMailer;
