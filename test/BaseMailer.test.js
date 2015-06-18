var assert = require('chai').assert;
var BaseMailer = require('../lib/BaseMailer');

describe('BaseMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseMailer);
    assert.isFunction(BaseMailer.prototype.getConfig);
    assert.isFunction(BaseMailer.prototype.setConfig);
    assert.isFunction(BaseMailer.prototype.getFrom);
    assert.isFunction(BaseMailer.prototype.setFrom);
    assert.isFunction(BaseMailer.prototype.getTo);
    assert.isFunction(BaseMailer.prototype.setTo);
    assert.isFunction(BaseMailer.prototype.getSubject);
    assert.isFunction(BaseMailer.prototype.setSubject);
    assert.isFunction(BaseMailer.prototype.getText);
    assert.isFunction(BaseMailer.prototype.setText);
    assert.isFunction(BaseMailer.prototype.getHtml);
    assert.isFunction(BaseMailer.prototype.setHtml);
    assert.isFunction(BaseMailer.prototype.send);

    assert.throw(function () {
      BaseMailer.prototype.send();
    }, Error);
  });

  it('Should properly make objects configurable', function () {
    var mailer = new BaseMailer();

    assert.notOk(mailer.getConfig('foo'));
    assert.instanceOf(mailer.setConfig('foo', 'bar'), BaseMailer);
    assert.equal(mailer.getConfig('foo'), 'bar');
  });

  it('Should properly create mailer with pre-defined config', function () {
    var mailer = new BaseMailer({
      foo: 'bar'
    });

    assert.equal(mailer.getConfig('foo'), 'bar');
    assert.notOk(mailer.getConfig('NOT_EXISTS'));
  });
});
