const { handleError } = require('./handleError');

const mockWrite = jest.spyOn(process.stderr, 'write');
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });

describe('handleError', () => {
  beforeEach(() => {
    handleError(new Error('mock err'));
  });

  test('should call process.stderr.write with error message', () => {
    expect(mockWrite)
      .toHaveBeenCalledWith('mock err');
  });

  test('should call process.exit with 1', () => {
    expect(mockExit)
      .toHaveBeenCalledWith(1);
  })
});
