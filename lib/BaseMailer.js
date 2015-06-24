/**
 * Message for implement method
 * @type {String}
 */
var IMPLEMENT_MESSAGE = 'Not implemented';

/**
 * Create new base Mailer instance
 * @param {Object} _config Additional configuration
 * @constructor
 */
function BaseMailer(_config) {
  var config = _config || {};

  Object.keys(config).forEach(function (key) {
    this.setConfig(key, config[key]);
  }.bind(this));
}

BaseMailer.prototype = {
  /**
   * Get configuration value
   * @param {String} [key]
   * @returns {*}
   */
  getConfig: function (key) {
    return typeof key === 'undefined' ? this._config : this._config && this._config[key];
  },

  /**
   * Set new configuration value
   * @param {String} key
   * @param {*} value
   * @returns {BaseMailer}
   */
  setConfig: function (key, value) {
    this._config = this._config || {};
    this._config[key] = value;
    return this;
  },

  /**
   * Send mail to recipient or recipients
   */
  send: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  }
};

module.exports = BaseMailer;
