var assert = require('chai').assert;
var sinon = require('sinon');
var SMTPMailer = require('../lib/SMTPMailer');

describe('SMTPMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(SMTPMailer);
  });

  it('Should properly instantiate', function () {
    var mailer = new SMTPMailer();
    assert.instanceOf(mailer, SMTPMailer);
  });

  it('Should properly send mail', function (done) {
    var mailer = new SMTPMailer({
      from: 'no-reply@ghaiklor.com'
    });

    sinon.stub(mailer.getTransporter(), 'sendMail', function (config, cb) {
      cb();
    });

    mailer
      .send({
        to: 'another@mail.com'
      })
      .then(function () {
        assert(mailer.getTransporter().sendMail.calledOnce);
        assert.deepEqual(mailer.getTransporter().sendMail.getCall(0).args[0], {
          from: 'no-reply@ghaiklor.com',
          to: 'another@mail.com'
        });
        assert.isFunction(mailer.getTransporter().sendMail.getCall(0).args[1]);

        mailer.getTransporter().sendMail.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly throw exception on send', function (done) {
    var mailer = new SMTPMailer();
    mailer.getTransporter().transporter = 'WRONG';

    mailer
      .send()
      .then(done)
      .catch(function (error) {
        assert.instanceOf(error, Error);
        done();
      });
  });
});
