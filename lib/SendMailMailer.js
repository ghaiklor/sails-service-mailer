var util = require('util');
var nodemailer = require('nodemailer');
var sendmailTransport = require('nodemailer-sendmail-transport');
var BaseMailer = require('./BaseMailer');

function SendMailMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(sendmailTransport(this.getConfig('transporter'))));
}

SendMailMailer.prototype._getTransporter = function () {
  return this._transporter;
};

SendMailMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

module.exports = SendMailMailer;
