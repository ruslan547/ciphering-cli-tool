const { getArgs } = require('./cli');

const mockWrite = jest.spyOn(process.stderr, 'write');
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });

process.argv.push('node', 'cipher', '-c', 'C1-C1-A-R0', '-c', 'C0');

describe('cli', () => {
  /**
   * Input: User passes the same cli argument twice;
   * Result: Error message is shown;
   * e.g. input: node my_caesar_cli -c C1-C1-A-R0 -c C0
   * result: Error: You provided -c argument more than once;
   */
  it('should call process.stderr.write with error message', () => {
    getArgs();

    expect(mockWrite)
      .toHaveBeenCalledWith('Error: You provided -c argument more than once\n');
  });
});
