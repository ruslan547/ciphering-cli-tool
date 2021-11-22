const { atbash, caesarShift } = require('./ciphers');

describe('atbash', () => {
  test('a -> z', () => {
    expect(atbash('a')).toBe('z');
  });

  test('A -> Z', () => {
    expect(atbash('A')).toBe('Z');
  });

  test('Ф -> Ф', () => {
    expect(atbash('Ф')).toBe('Ф');
  });
});

describe('caesarShift', () => {
  test('a -> b', () => {
    expect(caesarShift('a')).toBe('b');
  });

  test('A -> B', () => {
    expect(caesarShift('A')).toBe('B');
  });

  test('A -> Z', () => {
    expect(caesarShift('A', -1)).toBe('Z');
  });
});
