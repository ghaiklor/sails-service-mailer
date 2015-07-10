var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var BaseMailer = require('./BaseMailer');

util.inherits(SESMailer, BaseMailer);

/**
 * Create new instance for sending mail via Amazon SES
 * @constructor
 */
function SESMailer() {
  BaseMailer.apply(this, arguments);

  this.setTransporter(nodemailer.createTransport(sesTransport(this.getConfig('transporter'))));
}

/**
 * Send mail
 * @param {Object} _config Additional configuration
 * @returns {Promise}
 */
SESMailer.prototype.send = function (_config) {
  var config = _.omit(_.merge({}, this.getConfig(), _config), 'transporter');

  return new Promise(function (resolve, reject) {
    this.getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = SESMailer;
