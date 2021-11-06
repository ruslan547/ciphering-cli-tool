const { Readable } = require('stream');
const readline = require('readline');

const { validateArgs } = require('./validators');

const getArgs = () => {
  const args = process.argv.splice(2);

  if (validateArgs(args)) {
    const [, conf, , input, , output] = args;
    const ciphers = conf.split('-');

    return [ciphers, input, output];
  }

  return [];
};

const createReadStreamFromCli = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Type your text\n', (answer) => {
      rl.close();
      resolve(Readable.from([answer + '\n']));
    });
  })
};

module.exports = {
  getArgs,
  createReadStreamFromCli
}
