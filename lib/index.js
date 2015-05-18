var MandrillMailer = require('./MandrillMailer');

module.exports = {
  create: function (type, options) {
    switch (type) {
      case 'mandrill':
        return new MandrillMailer(options);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  Mandrill: MandrillMailer
};
