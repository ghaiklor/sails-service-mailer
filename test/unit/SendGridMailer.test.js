import { assert } from 'chai';
import sinon from 'sinon';
import SendGridMailer from '../../src/SendGridMailer';

const TRANSPORTER_CONFIG = {
  auth: {
    api_user: 'test',
    api_key: 'test'
  }
};

describe('SendGridMailer', () => {
  it('Should properly export', () => {
    assert.isFunction(SendGridMailer);
  });

  it('Should properly instantiate', () => {
    let mailer = new SendGridMailer({transporter: TRANSPORTER_CONFIG});
    assert.instanceOf(mailer, SendGridMailer);
  });

  it('Should properly send mail', done => {
    let mailer = new SendGridMailer({
      from: 'no-reply@ghaiklor.com',
      transporter: TRANSPORTER_CONFIG
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
    let mailer = new SendGridMailer({transporter: TRANSPORTER_CONFIG});
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
