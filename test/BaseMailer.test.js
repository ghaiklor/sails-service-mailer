var assert = require('chai').assert;
var BaseMailer = require('../lib/BaseMailer');

describe('BaseMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseMailer);
    assert.isFunction(BaseMailer.prototype.getConfig);
    assert.isFunction(BaseMailer.prototype.setConfig);
    assert.isFunction(BaseMailer.prototype.send);

    assert.throw(function () {
      BaseMailer.prototype.send();
    }, Error);
  });

  it('Should properly make objects configurable', function () {
    var mailer = new BaseMailer();

    assert.notOk(mailer.getConfig('foo'));
    assert.instanceOf(mailer.setConfig('foo', 'bar'), BaseMailer);
    assert.instanceOf(mailer.setConfig('transporter', {foo: 'bar'}), BaseMailer);
    assert.deepEqual(mailer.getConfig('transporter'), {foo: 'bar'});
    assert.equal(mailer.getConfig('transporter').foo, 'bar');
    assert.equal(mailer.getConfig('foo'), 'bar');
  });

  it('Should properly create mailer with pre-defined config', function () {
    var mailer = new BaseMailer({
      from: 'ghaiklor@gmail.com',
      to: 'ghaiklor@gmail.com',
      transporter: {
        bar: 'foo',
        foo: {
          bar: 'foo'
        }
      }
    });

    assert.equal(mailer.getConfig('from'), 'ghaiklor@gmail.com');
    assert.equal(mailer.getConfig('to'), 'ghaiklor@gmail.com');
    assert.equal(mailer.getConfig('transporter').bar, 'foo');
    assert.deepEqual(mailer.getConfig('transporter').foo, {bar: 'foo'});
    assert.notOk(mailer.getConfig('NOT_EXISTS'));
  });

  it('Should properly get/set transporter', function () {
    var mailer = new BaseMailer();

    assert.notOk(mailer.getTransporter());
    assert.instanceOf(mailer.setTransporter('SOME_TRANSPORTER'), BaseMailer);
    assert.equal(mailer.getTransporter(), 'SOME_TRANSPORTER');
  });

  it('Should properly throw error on send', function () {
    var mailer = new BaseMailer();
    assert.throw(function () {
      mailer.send();
    }, Error);
  });
});
