var assert = require('chai').assert;
var MandrillMailer = require('../lib/MandrillMailer');

describe('MandrillMailer', function () {
  it('Should properly export', function () {
    assert.isFunction(MandrillMailer);
  });
});
