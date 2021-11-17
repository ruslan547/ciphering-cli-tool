const { getArgs, createReadStreamFromCli } = require('./cli');

jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue(
    {
      question: jest.fn().mockImplementation(
        (question, cb) => {
          cb('mock text');
        }
      ),
      close: jest.fn()
    }
  )
}));

describe('getArgs error', () => {
  const mockWrite = jest.spyOn(process.stderr, 'write');
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });

  process.argv.push('node', 'cipher', '-c', 'C1-C1-A-R0', '-c', 'C0');

  beforeEach(() => {
    getArgs();
  });

  /**
   * Input: User passes the same cli argument twice;
   * Result: Error message is shown;
   * e.g. input: node my_caesar_cli -c C1-C1-A-R0 -c C0
   * result: Error: You provided -c argument more than once;
   */
  it('should call process.stderr.write with error message', () => {
    expect(mockWrite)
      .toHaveBeenCalledWith('Error: You provided -c argument more than once\n');
  });

  it('should call process.exit with 1', () => {
    expect(mockExit)
      .toHaveBeenCalledWith(1);
  });
});

describe('getArgs success', () => {
  /**
   * Input: User passes correct sequence of symbols as argument for --config that matches regular expression;
   * Result: test passed
   * Take cipher usage scenarios from first task description usage examples.
   */
  it('should return correct args', () => {
    process.argv.length = 0;
    process.argv.push(
      'node',
      'cipher',
      '--config',
      'C1-C1-R0-A',
      '-i',
      './input.txt',
      '-o',
      './output.txt'
    );

    expect(getArgs())
      .toEqual([['C1', 'C1', 'R0', 'A'], './input.txt', './output.txt']);
  });
});
