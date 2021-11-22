const { Writable, Transform, Readable } = require('stream');
const fs = require('fs');

const {
  caesarShift,
  atbash
} = require('./ciphers');

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

class ReadStream extends Readable {
  constructor(filename, encoding) {
    super({ encoding });
    this.filename = filename;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = {
  WriteStream,
  CipherStream,
  ReadStream
};
