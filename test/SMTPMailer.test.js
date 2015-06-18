var assert = require('chai').assert;
var SMTPMailer = require('../lib/SMTPMailer');

describe('SMTPMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(SMTPMailer);
  });

  it('Should properly send message', function () {
    var mailer = new SMTPMailer({
      transporter: {}
    });
  });
});
