import _ from 'lodash';
import nodemailer from 'nodemailer';
import stubTransport from 'nodemailer-stub-transport';
import BaseMailer from './BaseMailer';

export default class StubMailer extends BaseMailer {
  constructor(config) {
    super(config);

    this.setProvider(nodemailer.createTransport(stubTransport(this.get('provider'))));
  }

  /**
   * Send mail
   * @param {Object} [_config] Additional configuration for overriding
   * @returns {Promise}
   */
  send(_config) {
    let config = _.omit(_.merge({}, this.get(), _config), 'provider');

    return new Promise((resolve, reject) => {
      this.getProvider().sendMail(config, (error, result) => error ? reject(error) : resolve(result));
    });
  }
}
