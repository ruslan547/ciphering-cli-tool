const { validateArgs } = require('./validators');

const args = process.argv.splice(2);

validateArgs(args);
