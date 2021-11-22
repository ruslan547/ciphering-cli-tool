const ERROR_CODE = 1;

const handleError = (err) => {
  process.stderr.write(err.message);
  process.exit(ERROR_CODE);
};

module.exports = {
  handleError,
};
