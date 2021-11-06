const fs = require('fs');

const { getArgs, createReadStreamFromCli } = require('./utils/cli');
const { WriteStream, CipherStream } = require('./utils/streams');

(async () => {
  const [ciphers, input, output] = getArgs();

  const readStream = input
    ? fs.createReadStream(input, 'utf-8')
    : await createReadStreamFromCli();

  const writeStream = output
    ? fs.createWriteStream(output, { flags: 'a' })
    : new WriteStream();

  readStream
    .pipe(new CipherStream({ ciphers }))
    .pipe(writeStream)
})()
