const fs = require('fs');

const {
  handleError,
  handleAccessError
} = require('./handleError');

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
};

const getValidatedArgs = (args) => {
  const confPredicate = item => item === '-c' || item === '--config';
  const inputPredicate = item => item === '-i' || item === '--input';
  const outputPredicate = item => item === '-o' || item === '--output';
  const configs = args.filter(confPredicate);
  const confIndex = args.findIndex(confPredicate);
  const confValue = args[confIndex + 1];
  const inputs = args.filter(inputPredicate);
  const inputIndex = args.findIndex(inputPredicate);
  const inputValue = inputIndex !== -1 ? args[inputIndex + 1] : undefined;
  const outputs = args.filter(outputPredicate);
  const outputIndex = args.findIndex(outputPredicate);
  const outputValue = outputIndex !== -1 ? args[outputIndex + 1] : undefined;
  const other = args.filter(item =>
    item !== confValue &&
    item !== inputValue &&
    item !== outputValue &&
    !confPredicate(item) &&
    !inputPredicate(item) &&
    !outputPredicate(item)
  );

  if (!configs.length) {
    handleError('error: option -c, --config <value> missing\n');
  }

  if (configs.length > 1) {
    handleError('error: option -c, --config <value> repeated more than once\n');
  }

  if (!confValue || confIndex + 1 === inputIndex) {
    handleError('error: option -c, --config <value> without value\n');
  }

  if (!validateConf(confValue)) {
    handleError('error: option -c, --config <value> value invalid\n');
  }

  if (inputs.length > 1) {
    handleError('error: option -i, --input <value> repeated more than once\n');
  }

  if (inputs.length && !validationFile(inputValue)) {
    handleError('error: option -i, --input <value> without value\n');
  }

  if (outputs.length > 1) {
    handleError('error: option -o, --output <value> repeated more than once\n');
  }

  if (outputs.length && !validationFile(outputValue)) {
    handleError('error: option -o, --output <value> without value\n');
  }

  if (other.length) {
    handleError(`error: invalid option${other.length ? 's' : ''} ${other.join(', ')}\n`);
  }

  const ciphers = confValue.split('-');
  const input = inputs.length ? inputValue : undefined;
  const output = outputs.length ? outputValue : undefined;

  return [ciphers, input, output];
}

module.exports = {
  getValidatedArgs
};
