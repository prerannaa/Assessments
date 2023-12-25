import { ALPHABET_SET, NUMBER_SET } from './constants';

export function getRandomString(length: number): string {
  const characterSet = ALPHABET_SET + NUMBER_SET;

  let output = '';

  for (let i = 0; i < length; i++) {
    output += characterSet.charAt(
      Math.floor(Math.random() * characterSet.length)
    );
  }

  return output;
}
