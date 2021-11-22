const { Readable } = require('stream');
const readline = require('readline');

const { getValidatedArgs } = require('./validators');
const { handleError } = require('./handleError');

const getArgs = () => {
  const args = process.argv.splice(2);

  try {
    return getValidatedArgs(args);
  } catch (err) {
    handleError(err);
  }
};

const createReadStreamFromCli = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('', (answer) => {
      rl.close();
      resolve(Readable.from([answer + '\n']));
    });
  })
};

module.exports = {
  getArgs,
  createReadStreamFromCli
}
