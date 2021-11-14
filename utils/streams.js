const { Writable, Transform } = require('stream');
const fs = require('fs');

const {
  caesarShift,
  atbash
} = require('./ciphers');
const { handleError } = require('./handleError');

class CipherStream extends Transform {
  constructor(options = {}) {
    const { ciphers } = options;

    super({ ...options, decodeStrings: false });

    this.ciphers = ciphers;
  }

  _transform = (chunk, encoding, callback) => {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only UTF-8 sources are supported'));

      return callback();
    }

    this.ciphers.forEach(cipher => {
      if (cipher[0] === 'C') {
        if (cipher[1] === '1') {
          chunk = caesarShift(chunk);
        } else {
          chunk = caesarShift(chunk, -1);
        }
      }

      if (cipher[0] === 'A') {
        chunk = atbash(chunk);
      }

      if (cipher[0] === 'R') {
        if (cipher[0] === '1') {
          chunk = caesarShift(chunk, 8);
        } else {
          chunk = caesarShift(chunk, -8);
        }
      }
    });

    this.push(chunk);
  }
}

class WriteStream extends Writable {
  constructor(options = {}) {
    super({ ...options, decodeStrings: false });

    const { output } = options;

    this.output = output;
  }

  _write = (chunk, encoding, callback) => {
    if (this.output) {
      fs.appendFile(this.output, chunk, callback);
    } else {
      process.stdout.write(chunk, callback);
    }
  };
}

module.exports = {
  WriteStream,
  CipherStream
};
