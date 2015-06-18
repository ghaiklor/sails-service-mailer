module.exports = {
  create: function (type, options) {
    switch (type) {
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  }
};
