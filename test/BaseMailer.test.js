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

  it('Should properly get/set from value', function () {
    var mailer = new BaseMailer();
    assert.notOk(mailer.getFrom());
    assert.instanceOf(mailer.setFrom('ghaiklor@gmail.com'), BaseMailer);
    assert.equal(mailer.getFrom(), 'ghaiklor@gmail.com');
  });

  it('Should properly get/set to value', function () {
    var mailer = new BaseMailer();
    assert.notOk(mailer.getTo());
    assert.instanceOf(mailer.setTo('ghaiklor@gmail.com'), BaseMailer);
    assert.equal(mailer.getTo(), 'ghaiklor@gmail.com');
  });

  it('Should properly get/set subject value', function () {
    var mailer = new BaseMailer();
    assert.notOk(mailer.getSubject());
    assert.instanceOf(mailer.setSubject('Hey'), BaseMailer);
    assert.equal(mailer.getSubject(), 'Hey');
  });

  it('Should properly get/set text value', function () {
    var mailer = new BaseMailer();
    assert.notOk(mailer.getText());
    assert.instanceOf(mailer.setText('Message'), BaseMailer);
    assert.equal(mailer.getText(), 'Message');
  });

  it('Should properly get/set html value', function () {
    var mailer = new BaseMailer();
    assert.notOk(mailer.getHtml());
    assert.instanceOf(mailer.setHtml('<h1>Message</h1>'), BaseMailer);
    assert.equal(mailer.getHtml(), '<h1>Message</h1>');
  });

  it('Should properly throw error on send', function () {
    var mailer = new BaseMailer();
    assert.throw(function () {
      mailer.send();
    }, Error);
  });
});
