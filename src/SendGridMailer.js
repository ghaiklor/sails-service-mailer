var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var sendGridTransport = require('nodemailer-sendgrid-transport');
var BaseMailer = require('./BaseMailer');

util.inherits(SendGridMailer, BaseMailer);

/**
 * Create instance for sending mail through SendGrid API
 * @constructor
 */
function SendGridMailer() {
  BaseMailer.apply(this, arguments);

  this.setTransporter(nodemailer.createTransport(sendGridTransport(this.get('transporter'))));
}

/**
 * Send mail via SendGrid API
 * @param {Object} [_config] Configuration object for overriding
 * @returns {Promise}
 */
SendGridMailer.prototype.send = function (_config) {
  var config = _.omit(_.merge({}, this.get(), _config), 'transporter');

  return new Promise(function (resolve, reject) {
    this.getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = SendGridMailer;
