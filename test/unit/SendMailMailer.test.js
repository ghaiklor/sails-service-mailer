var assert = require('chai').assert;
var sinon = require('sinon');
var SendMailMailer = require('../lib/SendMailMailer');

describe('SendMailMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(SendMailMailer);
  });

  it('Should properly instantiate', function () {
    var mailer = new SendMailMailer();
    assert.instanceOf(mailer, SendMailMailer);
  });

  it('Should properly send mail', function (done) {
    var mailer = new SendMailMailer({
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
    var mailer = new SendMailMailer();
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
