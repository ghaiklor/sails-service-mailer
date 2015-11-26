import _ from 'lodash';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';
import BaseMailer from './BaseMailer';

export default class SESMailer extends BaseMailer {
  constructor(config) {
    super(config);

    this.setProvider(nodemailer.createTransport(sesTransport(this.get('provider'))));
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
