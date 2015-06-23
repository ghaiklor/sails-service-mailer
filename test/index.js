var assert = require('chai').assert;
var MailerService = require('../');
var StubMailer = require('../lib/StubMailer');

describe('MailerService', function () {
  it('Should properly export', function () {
    assert.isObject(MailerService);
    assert.isFunction(MailerService.create);
    assert.isFunction(MailerService.DirectMailer);
    assert.isFunction(MailerService.SendGridMailer);
    assert.isFunction(MailerService.SendMailMailer);
    assert.isFunction(MailerService.SESMailer);
    assert.isFunction(MailerService.SMTPMailer);
    assert.isFunction(MailerService.StubMailer);
  });

  it('Should properly create mailer instance', function () {
    assert.instanceOf(MailerService.create('stub'), StubMailer);
  });

  it('Should properly send mail', function (done) {
    var stubMailer = MailerService.create('stub', {
      from: 'no-reply@ghaiklor.com'
    });

    stubMailer
      .send({
        to: 'another@mail.com'
      })
      .then(function (result) {
        assert.equal(result.envelope.from, 'no-reply@ghaiklor.com');
        assert.equal(result.envelope.to, 'another@mail.com');
        done();
      })
      .catch(done);
  });
});
