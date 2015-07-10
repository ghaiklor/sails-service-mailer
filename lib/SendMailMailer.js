var util = require('util');
var _ = require('lodash');
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

  this.setTransporter(nodemailer.createTransport(sendmailTransport(this.getConfig('transporter'))));
}

/**
 * Send mail via sendmail
 * @param {Object} [_config] Additional configuration
 * @returns {Promise}
 */
SendMailMailer.prototype.send = function (_config) {
  var config = _.omit(_.merge({}, this.getConfig(), _config), 'transporter');

  return new Promise(function (resolve, reject) {
    this.getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = SendMailMailer;
