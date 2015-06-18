var util = require('util');
var extend = require('extend');
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var stubTransport = require('nodemailer-stub-transport');
var BaseMailer = require('./BaseMailer');

util.inherits(StubMailer, BaseMailer);

/**
 * Create mailer instance for stub sending
 * @constructor
 */
function StubMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(stubTransport()));
}

/**
 * Get nodemailer transporter
 * @returns {*}
 * @private
 */
StubMailer.prototype._getTransporter = function () {
  return this._transporter;
};

/**
 * Set new nodemailer transporter
 * @param {Object} transporter New nodemailer transporter created via nodemailer.createTransport()
 * @returns {StubMailer}
 * @private
 */
StubMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

/**
 * Send message
 * @param {Object} _config Additional configuration for overriding default
 * @returns {Promise}
 */
StubMailer.prototype.send = function (_config) {
  var config = extend({}, this.getConfig(), _config);

  return new Promise(function (resolve, reject) {
    this._getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = StubMailer;
