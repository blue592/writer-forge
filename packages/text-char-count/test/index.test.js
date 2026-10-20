import test from 'node:test';
import assert from 'node:assert/strict';
import { countCharacters, countWords, countLines, textMetrics } from '../index.js';

test('Korean text and whitespace', () => {
  assert.deepEqual(textMetrics('안녕 세계'), { characters: 5, charactersWithoutWhitespace: 4, words: 2, lines: 1 });
});
test('emoji sequences are one visible character', () => {
  assert.equal(countCharacters('👩‍💻'), 1);
  assert.ok(countCharacters('👩‍💻', { unit: 'codePoint' }) > 1);
});
test('combining accent and utf16 units', () => {
  assert.equal(countCharacters('e\u0301'), 1);
  assert.equal(countCharacters('e\u0301', { unit: 'utf16' }), 2);
});
test('empty and multiline input', () => {
  assert.equal(countLines(''), 0);
  assert.equal(countLines('a\r\nb\n'), 3);
  assert.equal(countWords(' \n \t '), 0);
});
test('invalid input', () => {
  assert.throws(() => countCharacters(null), TypeError);
  assert.throws(() => countCharacters('x', { unit: 'bytes' }), RangeError);
});
