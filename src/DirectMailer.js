var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var BaseMailer = require('./BaseMailer');

util.inherits(DirectMailer, BaseMailer);

/**
 * Create mailer instance for direct sending mail to MX server
 * @constructor
 */
function DirectMailer() {
  BaseMailer.apply(this, arguments);

  this.setTransporter(nodemailer.createTransport(directTransport(this.get('transporter'))));
}

/**
 * Send mail
 * @param {Object} [_config] Additional configuration for overriding
 * @returns {Promise}
 */
DirectMailer.prototype.send = function (_config) {
  var config = _.omit(_.merge({}, this.get(), _config), 'transporter');

  return new Promise(function (resolve, reject) {
    this.getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = DirectMailer;
