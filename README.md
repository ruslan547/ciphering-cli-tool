# ciphering-cli-tool

## How to run

1. git clone https://github.com/ruslan547/ciphering-cli-tool.git

2. cd ciphering-cli-tool

3. git checkout ciphering-cli-tool

4. node cipher -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"

## CLI tool accepts 3 options:

1. -c, --config

 config for ciphers Config is a string with pattern {XY(-)}n,

 where:

  - X is a cipher mark:
  - C is for Caesar cipher (with shift 1)
  - A is for Atbash cipher
  - R is for ROT-8 cipher
  - Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
  - 1 is for encoding
  - 0 is for decoding

 2. -i, --input: a path to input file

 3. -o, --output: a path to output file

 ## How to run test

 1. ```npm run test```
 2. ```npm run test:coverage```
