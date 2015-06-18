var util = require('util');
var nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');
var BaseMailer = require('./BaseMailer');

function SESMailer() {
  BaseMailer.apply(this, arguments);

  this._setTransporter(nodemailer.createTransport(sesTransport(this.getConfig('transporter'))));
}

SESMailer.prototype._getTransporter = function () {
  return this._transporter;
};

SESMailer.prototype._setTransporter = function (transporter) {
  this._transporter = transporter;
  return this;
};

module.exports = SESMailer;
