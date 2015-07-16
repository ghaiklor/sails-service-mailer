var mailers = {
  direct: require('./DirectMailer'),
  sendgrid: require('./SendGridMailer'),
  sendmail: require('./SendMailMailer'),
  ses: require('./SESMailer'),
  smtp: require('./SMTPMailer'),
  stub: require('./StubMailer')
};

module.exports = {
  /**
   * Create mailer instance based on type
   * @param {String} type Type of mailer
   * @param {Object} config Configuration object
   */
  create: function (type, config) {
    if (mailers[type.toLowerCase()] instanceof Function) {
      return new mailers[type.toLowerCase()](config);
    } else {
      throw new Error('Unrecognized type -> ' + type);
    }
  },

  DirectMailer: mailers.direct,
  SendGridMailer: mailers.sendgrid,
  SendMailMailer: mailers.sendmail,
  SESMailer: mailers.ses,
  SMTPMailer: mailers.smtp,
  StubMailer: mailers.stub
};
