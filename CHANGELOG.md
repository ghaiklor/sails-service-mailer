# Changelog

## 3.0.1

- General improvements;

## 3.0.0

- Migration from ES5 to ES6 syntax;
- Remove `.create()` method. MailerService is a function itself now and you can call it `MailerService('smtp')`;
- Rename `transporter` key in service configuration to `provider`;
- Update dependencies and pin them;

## 2.0.1

- Improve branch coverage for all mailers;

## 2.0.0

- Replace `getConfig` and `setConfig` with `get` and `set` methods;
- Optimize factory method `create`;
- Update docs;

## 1.2.1

- Replace all `_.assign` calls with `_.merge` for recursive merging;

## 1.2.0

- Refactoring and cleaning up;
- Replace extend with lodash;
- Some memory optimisations;

## 1.1.0

- Update dependencies;

## 1.0.1

- Remove unused methods;
- Update docs;

## 1.0.0

- Add full support for send mail;
- Add support for direct sending to MX server;
- Add support for SendGrid API;
- Add support for sendmail command;
- Add support for Amazon SES service;
- Add support for SMTP servers;
- Add support for stub sending of mail;

## 0.1.0

- Initial release;
