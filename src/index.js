import DirectMailer from './DirectMailer';
import SendGridMailer from './SendGridMailer';
import SendMailMailer from './SendMailMailer';
import SESMailer from './SESMailer';
import SMTPMailer from './SMTPMailer';
import StubMailer from './StubMailer';

const mailer = {
  direct: DirectMailer,
  sendgrid: SendGridMailer,
  sendmail: SendMailMailer,
  ses: SESMailer,
  smtp: SMTPMailer,
  stub: StubMailer
};

/**
 * Create mailer instance based on type
 * @param {String} type Type of mailer
 * @param {Object} config Configuration object
 */
export default function (type, config) {
  if (mailer[type.toLowerCase()] instanceof Function) {
    return new mailer[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized type -> ' + type);
  }
}
