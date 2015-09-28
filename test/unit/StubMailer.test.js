var assert = require('chai').assert;
var StubMailer = require('../lib/StubMailer');

describe('StubMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(StubMailer);
  });

  it('Should properly send message with pre-defined options', function (done) {
    var mailer = new StubMailer({
      from: 'some@mail.com',
      to: 'ghaiklor@gmail.com',
      subject: 'Hello',
      text: 'Hello, World!'
    });

    mailer
      .send()
      .then(function (result) {
        assert.equal(result.envelope.from, 'some@mail.com');
        assert.equal(result.envelope.to, 'ghaiklor@gmail.com');
        assert.ok(/Subject: Hello/.test(result.response.toString()));
        assert.ok(/Hello, World!/.test(result.response.toString()));
        done();
      })
      .catch(done);
  });

  it('Should properly override pre-defined options', function (done) {
    var mailer = new StubMailer({
      from: 'some@mail.com',
      subject: 'Hello',
      text: 'Hello, world!'
    });

    mailer
      .send({
        to: ['ghaiklor@gmail.com', 'another@mail.com']
      })
      .then(function (result) {
        assert.equal(result.envelope.from, 'some@mail.com');
        assert.deepEqual(result.envelope.to, ['ghaiklor@gmail.com', 'another@mail.com']);
        assert.ok(/Subject: Hello/.test(result.response.toString()));
        assert.ok(/Hello, world!/.test(result.response.toString()));
        done();
      })
      .catch(done);
  });

  it('Should properly throw exception on send', function (done) {
    var mailer = new StubMailer({transporter: {error: new Error('Send is unsuccessful')}});

    mailer
      .send()
      .then(done)
      .catch(function (error) {
        assert.instanceOf(error, Error);
        done();
      });
  });
});
