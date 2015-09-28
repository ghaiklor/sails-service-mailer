import { assert } from 'chai';
import BaseMailer from '../../src/BaseMailer';

describe('BaseMailer', () => {
  it('Should properly export', () => {
    assert.isFunction(BaseMailer);
  });

  it('Should properly make objects configurable', () => {
    let mailer = new BaseMailer();

    assert.notOk(mailer.get('foo'));
    assert.instanceOf(mailer.set('foo', 'bar'), BaseMailer);
    assert.instanceOf(mailer.set('obj', {foo: 'bar'}), BaseMailer);
    assert.deepEqual(mailer.get('obj'), {foo: 'bar'});
    assert.equal(mailer.get('obj.foo'), 'bar');
    assert.equal(mailer.get('foo'), 'bar');
  });

  it('Should properly create mailer with pre-defined config', () => {
    let mailer = new BaseMailer({
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

  it('Should properly get/set provider', () => {
    let storage = new BaseMailer();

    assert.deepEqual(storage.getProvider(), {});
    assert.instanceOf(storage.setProvider('PROVIDER'), BaseMailer);
    assert.equal(storage.getProvider(), 'PROVIDER');
  });
});
