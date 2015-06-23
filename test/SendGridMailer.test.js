var assert = require('chai').assert;
var Promise = require('bluebird');
var sinon = require('sinon');
var SendGridMailer = require('../lib/SendGridMailer');

var transporterConfig = {
  auth: {
    api_user: 'test',
    api_key: 'test'
  }
};

describe('SendGridMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(SendGridMailer);
  });

  it('Should properly instantiate', function () {
    var mailer = new SendGridMailer({transporter: transporterConfig});
    assert.instanceOf(mailer, SendGridMailer);
  });

  it('Should properly send mail', function (done) {
    var mailer = new SendGridMailer({
      from: 'no-reply@ghaiklor.com',
      transporter: transporterConfig
    });

    sinon.stub(mailer._transporter, 'sendMail', function (config, cb) {
      cb();
    });

    mailer
      .send({
        to: 'another@mail.com'
      })
      .then(function () {
        assert(mailer._transporter.sendMail.calledOnce);
        assert.equal(mailer._transporter.sendMail.getCall(0).args[0].from, 'no-reply@ghaiklor.com');
        assert.equal(mailer._transporter.sendMail.getCall(0).args[0].to, 'another@mail.com');
        assert.isFunction(mailer._transporter.sendMail.getCall(0).args[1]);

        mailer._transporter.sendMail.restore();

        done();
      })
      .catch(done);
  });
});
