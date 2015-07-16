var assert = require('chai').assert;
var sinon = require('sinon');
var SESMailer = require('../lib/SESMailer');

describe('SESMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(SESMailer);
  });

  it('Should properly instantiate', function () {
    var mailer = new SESMailer();
    assert.instanceOf(mailer, SESMailer);
  });

  it('Should properly send mail', function (done) {
    var mailer = new SESMailer({
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
});
