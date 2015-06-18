var assert = require('chai').assert;
var StubMailer = require('../lib/BaseMailer');

describe('StubMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(StubMailer);
  });

  it('Should properly send message', function (done) {
    var mailer = new StubMailer();

    mailer
      .send()
      .then(function (result) {
        console.log(result);
        done();
      })
      .catch(done);
  });
});
