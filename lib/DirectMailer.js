var util = require('util');
var extend = require('extend');
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

  this._setTransporter(nodemailer.createTransport(directTransport(this.getConfig('transporter'))));
}

/**
 * Get nodemailer transporter
 * @returns {*}
 * @private
 */
DirectMailer.prototype._getTransporter = function () {
  return this._transporter;
};

/**
 * Set new nodemailer transporter
 * @param {Object} transporter
 * @returns {DirectMailer}
 * @private
 */
DirectMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

/**
 * Send mail
 * @param {Object} [_config] Additional configuration for overriding
 * @returns {Promise}
 */
DirectMailer.prototype.send = function (_config) {
  var config = extend({}, this.getConfig(), _config);

  return new Promise(function (resolve, reject) {
    this._getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = DirectMailer;
