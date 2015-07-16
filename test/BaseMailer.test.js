var assert = require('chai').assert;
var BaseMailer = require('../lib/BaseMailer');

describe('BaseMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseMailer);
    assert.isFunction(BaseMailer.prototype.get);
    assert.isFunction(BaseMailer.prototype.set);
    assert.isFunction(BaseMailer.prototype.getTransporter);
    assert.isFunction(BaseMailer.prototype.setTransporter);
    assert.isFunction(BaseMailer.prototype.send);
  });

  it('Should properly make objects configurable', function () {
    var mailer = new BaseMailer();

    assert.notOk(mailer.get('foo'));
    assert.instanceOf(mailer.set('foo', 'bar'), BaseMailer);
    assert.instanceOf(mailer.set('obj', {foo: 'bar'}), BaseMailer);
    assert.deepEqual(mailer.get('obj'), {foo: 'bar'});
    assert.equal(mailer.get('obj.foo'), 'bar');
    assert.equal(mailer.get('foo'), 'bar');
  });

  it('Should properly create mailer with pre-defined config', function () {
    var mailer = new BaseMailer({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.equal(mailer.get('foo'), 'bar');
    assert.equal(mailer.get('obj.foo'), 'bar');
    assert.deepEqual(mailer.get('obj'), {foo: 'bar'});
    assert.notOk(mailer.get('NOT_EXISTS'));
  });
});
