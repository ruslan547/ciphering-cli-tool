const { Writable, Transform } = require('stream');

const {
  caesarShift,
  atbash
} = require('./ciphers');

class WriteStream extends Writable {
  constructor(options = {}) {
    super({ ...options, decodeStrings: false });
  }

  _write = (chunk) => process.stdout.write(chunk);
}

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

module.exports = {
  WriteStream,
  CipherStream
};
