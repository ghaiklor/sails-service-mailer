var util = require('util');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var BaseMailer = require('./BaseMailer');

function DirectMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(directTransport(this.getConfig('transporter'))));
}

DirectMailer.prototype._getTransporter = function () {
  return this._transporter;
};

DirectMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

module.exports = DirectMailer;
