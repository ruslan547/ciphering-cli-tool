const { validationFile } = require('./validators');

describe('validationFile', () => {
  test('if there is no file will be false', () => {
    expect(validationFile()).toBe(false);
  });
});
