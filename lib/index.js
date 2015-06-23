var DirectMailer = require('./DirectMailer');
var SendGridMailer = require('./SendGridMailer');
var SendMailMailer = require('./SendMailMailer');
var SESMailer = require('./SESMailer');
var SMTPMailer = require('./SMTPMailer');
var StubMailer = require('./StubMailer');

module.exports = {
  /**
   * Create mailer instance based on type
   * @param {String} type Type of mailer
   * @param {Object} config Configuration object
   */
  create: function (type, config) {
    switch (type) {
      case 'direct':
        return new DirectMailer(config);
      case 'sendgrid':
        return new SendGridMailer(config);
      case 'sendmail':
        return new SendMailMailer(config);
      case 'ses':
        return new SESMailer(config);
      case 'smtp':
        return new SMTPMailer(config);
      case 'stub':
        return new StubMailer(config);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  DirectMailer: DirectMailer,
  SendGridMailer: SendGridMailer,
  SendMailMailer: SendMailMailer,
  SESMailer: SESMailer,
  SMTPMailer: SMTPMailer,
  StubMailer: StubMailer
};
