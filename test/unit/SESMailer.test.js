import { assert } from 'chai';
import sinon from 'sinon';
import SESMailer from '../../src/SESMailer';

describe('SESMailer', () => {
  it('Should properly export', () => {
    assert.isFunction(SESMailer);
  });

  it('Should properly instantiate', () => {
    let mailer = new SESMailer();
    assert.instanceOf(mailer, SESMailer);
  });

  it('Should properly send mail', done => {
    let mailer = new SESMailer({
      from: 'no-reply@ghaiklor.com'
    });

    sinon.stub(mailer.getProvider(), 'sendMail', (config, cb) => cb());

    mailer
      .send({
        to: 'another@mail.com'
      })
      .then(() => {
        assert(mailer.getProvider().sendMail.calledOnce);
        assert.deepEqual(mailer.getProvider().sendMail.getCall(0).args[0], {
          from: 'no-reply@ghaiklor.com',
          to: 'another@mail.com'
        });
        assert.isFunction(mailer.getProvider().sendMail.getCall(0).args[1]);

        mailer.getProvider().sendMail.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly throw exception on send', done => {
    let mailer = new SESMailer();
    mailer.getProvider().transporter = 'WRONG';

    mailer
      .send()
      .then(done)
      .catch(error => {
        assert.instanceOf(error, Error);
        done();
      });
  });
});
