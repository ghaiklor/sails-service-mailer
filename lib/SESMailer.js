var util = require('util');
var extend = require('extend');
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

  this._setTransporter(nodemailer.createTransport(sesTransport(this.getConfig('transporter'))));
}

/**
 * Get nodemailer transporter
 * @returns {*}
 * @private
 */
SESMailer.prototype._getTransporter = function () {
  return this._transporter;
};

/**
 * Set new nodemailer transporter
 * @param {Object} transporter
 * @returns {SESMailer}
 * @private
 */
SESMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

/**
 * Send mail
 * @param {Object} _config Additional configuration
 * @returns {Promise}
 */
SESMailer.prototype.send = function (_config) {
  var config = extend({}, this.getConfig(), _config);

  return new Promise(function (resolve, reject) {
    this._getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = SESMailer;
