var util = require('util');
var BaseMailer = require('./BaseMailer');

util.inherits(SMTPMailer, BaseMailer);

/**
 * Create new mailer instance for sending via SMTP servers
 * @constructor
 */
function SMTPMailer() {
  BaseMailer.apply(this, arguments);
}

SMTPMailer.prototype.send = function () {

};

module.exports = SMTPMailer;
