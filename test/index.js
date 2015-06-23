var assert = require('chai').assert;
var MailerService = require('../');
var DirectMailer = require('../lib/DirectMailer');
var SendGridMailer = require('../lib/SendGridMailer');
var SendMailMailer = require('../lib/SendMailMailer');
var SESMailer = require('../lib/SESMailer');
var SMTPMailer = require('../lib/SMTPMailer');
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

  it('Should properly create all of mailer instances', function () {
    assert.instanceOf(MailerService.create('direct'), DirectMailer);
    assert.instanceOf(MailerService.create('sendgrid', {transporter: {auth: {}}}), SendGridMailer);
    assert.instanceOf(MailerService.create('sendmail'), SendMailMailer);
    assert.instanceOf(MailerService.create('ses'), SESMailer);
    assert.instanceOf(MailerService.create('smtp'), SMTPMailer);
    assert.instanceOf(MailerService.create('stub'), StubMailer);

    assert.throw(function () {
      MailerService.create('NOT_EXISTS');
    }, Error);
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
