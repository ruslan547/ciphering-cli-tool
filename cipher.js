const { pipeline } = require('stream');

const { getArgs, createReadStreamFromCli } = require('./utils/cli');
const { WriteStream, CipherStream, ReadStream } = require('./utils/streams');
const { handleError } = require('./utils/handleError');

const [ciphers, input, output] = getArgs();

const cipher = async (ciphers, input, output) => {
  const readStream = input
    ? new ReadStream(input, 'utf-8')
    : await createReadStreamFromCli();

  pipeline(
    readStream,
    new CipherStream({ ciphers }),
    new WriteStream({ output }),
    handleError
  );

  if (!input) {
    setImmediate(() => cipher(ciphers, input, output));
  }
};

cipher(ciphers, input, output);
