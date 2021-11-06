const { Writable } = require('stream');

class WriteStream extends Writable {
  constructor(options = {}) {
    super({ ...options, decodeStrings: false });
  }

  _write = (chunk) => process.stdout.write(chunk);
}

module.exports = {
  WriteStream
};
