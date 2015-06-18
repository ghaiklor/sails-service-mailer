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
   * Get sender email
   * @returns {String}
   */
  getSender: function () {
    return this._sender;
  },

  /**
   * Set sender email
   * @param {String} sender Sender email
   * @returns {BaseMailer}
   */
  setSender: function (sender) {
    this._sender = sender;
    return this;
  },

  /**
   * Get recipient email
   * @returns {String}
   */
  getRecipient: function () {
    return this._recipient;
  },

  /**
   * Set recipient email
   * @param {String} recipient Recipient email
   * @returns {BaseMailer}
   */
  setRecipient: function (recipient) {
    this._recipient = recipient;
    return this;
  },

  /**
   * Get mail subject
   * @returns {String}
   */
  getSubject: function () {
    return this._subject;
  },

  /**
   * Set mail subject
   * @param {String} subject Mail subject
   * @returns {BaseMailer}
   */
  setSubject: function (subject) {
    this._subject = subject;
    return this;
  },

  /**
   * Get mail message
   * @returns {String}
   */
  getMessage: function () {
    return this._message;
  },

  /**
   * Set mail message
   * @param {String} message Mail message
   * @returns {BaseMailer}
   */
  setMessage: function (message) {
    this._message = message;
    return this;
  },

  /**
   * Send mail to recipient
   */
  send: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  }
};

module.exports = BaseMailer;
