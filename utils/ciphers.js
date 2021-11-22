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

const atbash = (str) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const tebahpla = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
  const alphabet1 = 'abcdefghijklmnopqrstuvwxyz';
  const tebahpla1 = 'zyxwvutsrqponmlkjihgfedcba';
  let decoded_string = '';

  for (let i = 0; i < str.length; i++) {
    const coded_letra = str.charAt(i);

    if (/[^a-zA-Z]/.test(str[i])) {
      decoded_string = decoded_string + str[i];
    } else if (str[i] === str[i].toUpperCase()) {
      const letraPosMayus = alphabet.indexOf(coded_letra);
      const tebLetraPosMayus = tebahpla.charAt(letraPosMayus);

      decoded_string = decoded_string + tebLetraPosMayus;
    } else {
      const letraPosMinus1 = alphabet1.indexOf(coded_letra);
      const tebLetraPosMinus1 = tebahpla1.charAt(letraPosMinus1);

      decoded_string = decoded_string + tebLetraPosMinus1;
    }
  }

  return decoded_string;
}

module.exports = {
  caesarShift,
  atbash
}
