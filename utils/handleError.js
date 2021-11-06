const ERROR_CODE = 1;

const handleArgsError = (message) => {
  process.stderr.write(message);
  process.exit(ERROR_CODE);
};

const handleAccessError = (err) => {
  if (err.code === 'ENOENT') {
    process.stderr.write(`file '${err.path}' does not exist\n`);
  } else if (err.code === 'EACCES') {
    process.stderr.write(`file '${err.path}' is not readable\n`);
  } else {
    process.stderr.write(err);
  }

  process.exit(ERROR_CODE);
};

module.exports = {
  handleArgsError,
  handleAccessError
}
