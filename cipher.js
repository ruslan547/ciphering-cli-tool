const fs = require('fs');

const { getArgs, createReadStreamFromCli } = require('./utils/cli');
const { WriteStream, CipherStream } = require('./utils/streams');

const [ciphers, input, output] = getArgs();

const cipher = async (ciphers, input, output) => {


  const readStream = input
    ? fs.createReadStream(input, 'utf-8')
    : await createReadStreamFromCli();

  const writeStream = output
    ? fs.createWriteStream(output, { flags: 'a' })
    : new WriteStream();

  readStream
    .pipe(new CipherStream({ ciphers }))
    .pipe(writeStream);

  if (!input) {
    setImmediate(() => cipher(ciphers, input, output));
  }
};

cipher(ciphers, input, output);
