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

const mockWrite = jest.spyOn(process.stderr, 'write');
const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => { });

/**
   * Input: User passes the same cli argument twice;
   * Result: Error message is shown;
   * e.g. input: node my_caesar_cli -c C1-C1-A-R0 -c C0
   * result: Error: You provided -c argument more than once;
   */
describe('getArgs the same cli argument twice', () => {
  beforeEach(() => {
    process.argv.length = 0;
    process.argv.push('node', 'cipher', '-c', 'C1-C1-A-R0', '-c', 'C0');
    getArgs();
  });

  it('should call process.stderr.write with error message', () => {
    expect(mockWrite)
      .toHaveBeenCalledWith('Error: You provided -c argument more than once\n');
  });

  it('should call process.exit with 1', () => {
    expect(mockExit)
      .toHaveBeenCalledWith(1);
  });
});

/**
 * Input: User doesn't pass -c or --config argument;
 * Result: Error message is shown;
 */
describe('getArgs without config', () => {
  beforeEach(() => {
    process.argv.length = 0;
    process.argv.push('node', 'cipher');
    getArgs();
  });

  it('should call process.stderr.write with error message', () => {
    expect(mockWrite)
      .toHaveBeenCalledWith('error: option -c, --config <value> missing\n');
  });

  it('should call process.exit with 1', () => {
    expect(mockExit)
      .toHaveBeenCalledWith(1);
  });
});

/**
 * Input: User passes -i argument with path that doesn't exist or with no read access;
 * Result: Error message is shown;
 */
describe('getArgs without correct input file', () => {
  beforeEach(() => {
    process.argv.length = 0;
    process.argv.push('node', 'cipher', '-c', 'R1', '-i', 'file.txt');
    getArgs();
  });

  it('should call process.stderr.write with error message', () => {
    expect(mockWrite)
      .toHaveBeenCalledWith("file 'file.txt' does not exist\n");
  });

  it('should call process.exit with 1', () => {
    expect(mockExit)
      .toHaveBeenCalledWith(1);
  });
});

/**
 * Input: User passes -o argument with path to directory that doesn't exist or with no read access;
 * Result: Error message is shown;
 */
describe('getArgs without correct output file', () => {
  beforeEach(() => {
    process.argv.length = 0;
    process.argv.push('node', 'cipher', '-c', 'R1', '-o', 'file.txt');
    getArgs();
  });

  it('should call process.stderr.write with error message', () => {
    expect(mockWrite)
      .toHaveBeenCalledWith("file 'file.txt' does not exist\n");
  });

  it('should call process.exit with 1', () => {
    expect(mockExit)
      .toHaveBeenCalledWith(1);
  });
});

/**
   * Input: User passes correct sequence of symbols as argument for --config that matches regular expression;
   * Result: test passed
   * Take cipher usage scenarios from first task description usage examples.
   */
describe('getArgs success', () => {
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

describe('createReadStreamFromCli', () => {
  it('should return promised stream', () => {
    return createReadStreamFromCli()
      .then(stream => {
        stream.on('data', chunk => {
          expect(chunk).toBe('mock text\n');
        });
      })
  });
});
