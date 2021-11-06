const fs = require('fs');

const { getArgs } = require('./utils/cli');
const { WriteStream } = require('./utils/streams');

let readStream;
let writeStream;

const [ciphers, input, output] = getArgs();

if (input) {
  readStream = fs.createReadStream(input, 'utf-8');
}

if (output) {
  writeStream = fs.createWriteStream(output, { flags: 'a' });
}

if (readStream) {
  readStream
    .pipe(writeStream || new WriteStream())
}
