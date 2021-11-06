const { validateArgs } = require('./validators');

const getArgs = () => {
  const args = process.argv.splice(2);

  if (validateArgs(args)) {
    const [, conf, , input, , output] = args;
    const ciphers = conf.split('-');

    return [ciphers, input, output];
  }

  return [];
}

module.exports = {
  getArgs
}
