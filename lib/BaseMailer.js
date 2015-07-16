var _ = require('lodash');

/**
 * Create new base Mailer instance
 * @param {Object} _config Additional configuration
 * @constructor
 */
function BaseMailer(_config) {
  this._config = {};

  _.forOwn(_config, function (value, key) {
    this.set(key, value);
  }.bind(this));
}

/**
 * Get configuration value
 * @param {String} [path]
 * @returns {*}
 */
BaseMailer.prototype.get = function (path) {
  return typeof path === 'undefined' ? this._config : _.get(this._config, path);
};

/**
 * Set new configuration value
 * @param {String} path
 * @param {*} value
 * @returns {BaseMailer}
 */
BaseMailer.prototype.set = function (path, value) {
  _.set(this._config, path, value);
  return this;
};

/**
 * Returns transporter
 * @returns {*}
 */
BaseMailer.prototype.getTransporter = function () {
  return this._transporter;
};

/**
 * Set new transporter
 * @param transporter
 * @returns {BaseMailer}
 */
BaseMailer.prototype.setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

BaseMailer.prototype.send = _;

module.exports = BaseMailer;
