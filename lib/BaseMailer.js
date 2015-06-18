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
   * Get email address of the sender
   * @returns {String}
   */
  getFrom: function () {
    return this.getConfig('from');
  },

  /**
   * Set email address of the sender
   * @param {String} from New email address
   * @returns {BaseMailer}
   */
  setFrom: function (from) {
    return this.setConfig('from', from);
  },

  /**
   * Get recipients email addresses
   * @returns {String|Array} Returns comma separated string or an array with emails
   */
  getTo: function () {
    return this.getConfig('to');
  },

  /**
   * Set new recipients email addresses
   * @param {String|Array} to Comma separated string or an array with emails
   * @returns {BaseMailer}
   */
  setTo: function (to) {
    return this.setConfig('to', to);
  },

  /**
   * Get subject of the email
   * @returns {String}
   */
  getSubject: function () {
    return this.getConfig('subject');
  },

  /**
   * Set new subject of the email
   * @param {String} subject Subject of the mail
   * @returns {BaseMailer}
   */
  setSubject: function (subject) {
    return this.setConfig('subject', subject);
  },

  /**
   * Get the plain text version of the message
   * @returns {String}
   */
  getText: function () {
    return this.getConfig('text');
  },

  /**
   * Set new plain text version of the message
   * @param {String} text Unicode string with plain text version
   * @returns {BaseMailer}
   */
  setText: function (text) {
    return this.setConfig('text', text);
  },

  /**
   * Get HTML version of the message
   * @returns {String}
   */
  getHtml: function () {
    return this.getConfig('html');
  },

  /**
   * Set new HTML version of the message
   * @param {String} html Unicode string with HTML version
   * @returns {BaseMailer}
   */
  setHtml: function (html) {
    return this.setConfig('html', html);
  },

  /**
   * Send mail to recipient or recipients
   */
  send: function () {
    throw new Error(IMPLEMENT_MESSAGE);
  }
};

module.exports = BaseMailer;
