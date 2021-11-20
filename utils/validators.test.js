const { validationFile, getValidatedArgs } = require('./validators');

const mockWrite = jest.spyOn(process.stderr, 'write');
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });

describe('validationFile', () => {
  // it('if not readable file will be error', () => {
  //   validationFile('./unreadable.txt');

  //   expect(mockWrite)
  //     .toHaveBeenCalledWith('file \'unreadable.txt\' is not readable\n');
  // })

  it('if there is no file will be false', () => {
    expect(validationFile()).toBe(false);
  });
});
