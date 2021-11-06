const fs = require('fs');

const { handleArgsError, handleAccessError } = require('./handleError');

const { F_OK, R_OK } = fs.constants;

const validateConf = (conf) => !conf
  .split('-')
  .some(item =>
    item !== 'C1' &&
    item !== 'C0' &&
    item !== 'R1' &&
    item !== 'R0' &&
    item !== 'A'
  );

const validationFile = (file) => {
  if (file && typeof file !== 'boolean') {
    try {
      fs.accessSync(file, F_OK | R_OK);

      return true;
    } catch (err) {
      handleAccessError(err);
    }
  }

  return false;
}

const validateArgs = (args) => {
  const confPredicate = item => item === '-c' || item === '--config';
  const inputPredicate = item => item === '-i' || item === '--input';
  const outputPredicate = item => item === '-o' || item === '--output';
  const configs = args.filter(confPredicate);
  const confIndex = args.findIndex(confPredicate);
  const confValue = args[confIndex + 1];
  const inputs = args.filter(inputPredicate);
  const inputIndex = args.findIndex(inputPredicate);
  const inputValue = args[inputIndex + 1];
  const outputs = args.filter(outputPredicate);
  const outputIndex = args.findIndex(outputPredicate);
  const outputValue = args[outputIndex + 1];

  if (!configs.length) {
    handleArgsError('error: option -c, --config <value> missing\n');
  }

  if (configs.length > 1) {
    handleArgsError('error: option -c, --config <value> repeated more than once\n');
  }

  if (!confValue || confIndex + 1 === inputIndex) {
    handleArgsError('error: option -c, --config <value> without value\n');
  }

  if (!validateConf(confValue)) {
    handleArgsError('error: option -c, --config <value> value invalid\n');
  }

  if (inputs.length > 1) {
    handleArgsError('error: option -i, --input <value> repeated more than once\n');
  }

  if (inputs.length && !validationFile(inputValue)) {
    handleArgsError('error: option -i, --input <value> without value\n');
  }

  if (outputs.length > 1) {
    handleArgsError('error: option -o, --output <value> repeated more than once\n');
  }

  if (outputs.length && !validationFile(outputValue)) {
    handleArgsError('error: option -o, --output <value> without value\n');
  }

  return true;
}

module.exports = {
  validateArgs
};
