var assert = require('chai').assert;
var MailerService = require('../');

describe('MailerService', function () {
  it('Should properly export', function () {
    assert.isObject(MailerService);
    assert.isFunction(MailerService.create);
    assert.isFunction(MailerService.Mandrill);
  });
});
