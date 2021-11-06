const ALPHABET_COUNT = 26;

const caesarShift = (str, shift = 1) => {
  if (shift < 0) {
    return caesarShift(str, shift + ALPHABET_COUNT);
  }

  let output = '';

  for (let i = 0; i < str.length; i++) {
    let c = str[i];

    if (c.match(/[a-z]/i)) {
      let code = str.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + shift) % ALPHABET_COUNT) + 65);
      }

      else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + shift) % ALPHABET_COUNT) + 97);
      }
    }

    output += c;
  }

  return output;
};

module.exports = {
  ALPHABET_COUNT,
  caesarShift
}
