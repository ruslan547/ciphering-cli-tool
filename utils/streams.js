const { Writable, Transform } = require('stream');

const {
  ALPHABET_COUNT,
  caesarShift
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

    // const shift = this.action === 'decode'
    //   ? +this.shift
    //   : (ALPHABET_COUNT - this.shift) % ALPHABET_COUNT;

    this.ciphers.forEach(cipher => {
      if (cipher[0] === 'C') {
        if (cipher[1] === '1') {
          chunk = caesarShift(chunk);
        } else {
          chunk = caesarShift(chunk, -1);
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
