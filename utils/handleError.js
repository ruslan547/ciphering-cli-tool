const ERROR_CODE = 1;

const handleError = (message) => {
  process.stderr.write(message);
  process.exit(ERROR_CODE);
};

module.exports = {
  handleError,
};
