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
    return this.getConfig('sender');
  },

  /**
   * Set sender email
   * @param {String} sender Sender email
   * @returns {BaseMailer}
   */
  setSender: function (sender) {
    return this.setConfig('sender', sender);
  },

  /**
   * Get recipient email
   * @returns {String}
   */
  getRecipient: function () {
    return this.getConfig('recipient');
  },

  /**
   * Set recipient email
   * @param {String} recipient Recipient email
   * @returns {BaseMailer}
   */
  setRecipient: function (recipient) {
    return this.setConfig('recipient', recipient);
  },

  /**
   * Get mail subject
   * @returns {String}
   */
  getSubject: function () {
    return this.getConfig('subject');
  },

  /**
   * Set mail subject
   * @param {String} subject Mail subject
   * @returns {BaseMailer}
   */
  setSubject: function (subject) {
    return this.setConfig('subject', subject);
  },

  /**
   * Get mail message
   * @returns {String}
   */
  getText: function () {
    return this.getConfig('text');
  },

  /**
   * Set mail message
   * @param {String} text Mail message
   * @returns {BaseMailer}
   */
  setText: function (text) {
    return this.setConfig('text', text);
  },

  /**
   * Get current HTML from message
   * @returns {String}
   */
  getHtml: function () {
    return this.getConfig('html');
  },

  /**
   * Set HTML to message
   * @param {String} html New HTML for message
   * @returns {BaseMailer}
   */
  setHtml: function (html) {
    return this.setConfig('html', html);
  },

  /**
   * Send mail to recipient
   */
  send: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  }
};

module.exports = BaseMailer;
