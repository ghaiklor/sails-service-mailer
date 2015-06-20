# sails-service-mailer

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-mailer.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-mailer.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-mailer.svg) ![npm version](https://img.shields.io/npm/v/sails-service-mailer.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-mailer.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-mailer.svg) ![License](https://img.shields.io/npm/l/sails-service-mailer.svg)

Service for Sails framework with Mailer features.

## List of supported mail transports

- direct (sends email directly to MX server)
- SendGrid ([SendGrid API](https://sendgrid.com/docs/API_Reference/Web_API/mail.html))
- sendmail (sends email via sendmail)
- Amazon SES (sends email via Amazon SES services)
- SMTP (sends email via some of SMTP servers)
- Stub (stub sending of email)

## Getting Started

Install this module.

```shell
npm install sails-service-mailer
```

Then require it in your service.

```javascript
// api/services/MailerService.js
module.exports = require('sails-service-mailer');
```

That's it, you can create instances of mailer for your needs in your project.

```javascript
// api/controllers/MailController.js
var sendmail = MailerService.create('sendmail', {
  from: 'no-reply@my-project.com',
  subject: 'Hello, there',
  text: 'And of course, Hello World!',
  transporter: {
    path: '/usr/bin/sendmail'
  }
});

module.exports = {
  send: function(req, res) {
    sendmail
      .send({
        to: req.param('to')
      })
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## Configuration

There is two kind of configuration - transporter configuration and mail configuration.

When you instantiate new instance of mailer, in configuration object you can add `transporter` object.
This object will send directly to one of nodemailer transports.

And all keys that don't belongs to `transporter` will send directly to `sendMail` function.

So basic configuration can be:

```javascript
var mailer = new DirectMailer({
  from: 'no-reply@some.com' // this will go to sendMail,
  transporter: { // this will go to nodemailer.createTransport
    name: 'some.mx-server.com'
  }
});
```

Each of available options you can find in nodemailer transport repositories.

## API

Each of Mailer instances has only one method

- send(config) - In config you can override pre-defined options. Returns Promise.

## Examples

### sendmail

```javascript
var sendmail = MailerService.create('sendmail', {
  from: 'no-reply@my-project.com',
  subject: 'Hello, there',
  text: 'And of course, Hello World!',
  transporter: {
    path: '/usr/bin/sendmail'
  }
});

sendmail
  .send({
    to: 'ghaiklor@gmail.com'
  })
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
```

### SES Mailer

```javascript
var ses = MailerService.create('ses', {
  from: 'no-reply@my-project.com',
  subject: 'Hello, there',
  text: 'And of course, Hello World!',
  transporter: {
    accessKeyId: 'MY_KEY',
    secretAccessKey: 'MY_SECRET'
  }
});

ses
  .send({
    to: 'ghaiklor@gmail.com'
  })
  .then(console.log.bind(console))
  .catch(console.error.bind(console))
```

## License

The MIT License (MIT)

Copyright (c) 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
