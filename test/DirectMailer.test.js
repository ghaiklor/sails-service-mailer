var assert = require('chai').assert;
var Promise = require('bluebird');
var sinon = require('sinon');
var DirectMailer = require('../lib/DirectMailer');

describe('DirectMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(DirectMailer);
  });

  it('Should properly instantiate', function () {
    var mailer = new DirectMailer();
    assert.instanceOf(mailer, DirectMailer);
  });

  it('Should properly send mail', function (done) {
    var sendMailStub = sinon.stub().returns(Promise.resolve());
    var mailer = new DirectMailer({
      from: 'no-reply@ghaiklor.com'
    });

    mailer._transporter.sendMail = sendMailStub;

    mailer
      .send()
      .then(done)
      .catch(done);
  });
});
