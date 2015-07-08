var util = require('util');
var _ = require('lodash');
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

  this.setTransporter(nodemailer.createTransport(stubTransport(this.getConfig('transporter'))));
}

/**
 * Send message
 * @param {Object} [_config] Additional configuration for overriding default
 * @returns {Promise}
 */
StubMailer.prototype.send = function (_config) {
  var config = _.omit(_.assign({}, this.getConfig(), _config), 'transporter');

  return new Promise(function (resolve, reject) {
    this.getTransporter().sendMail(config, function (error, result) {
      return error ? reject(error) : resolve(result);
    });
  }.bind(this));
};

module.exports = StubMailer;
