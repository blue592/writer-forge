/** Dependency-free Unicode-aware text metrics. @license MIT */
function requireText(text) {
  if (typeof text !== 'string') throw new TypeError('text must be a string');
  return text;
}
/** Counts user-perceived characters (grapheme clusters) by default. */
export function countCharacters(text, { unit = 'grapheme', includeWhitespace = true } = {}) {
  requireText(text);
  if (!['grapheme', 'codePoint', 'utf16'].includes(unit)) throw new RangeError('invalid unit');
  const value = includeWhitespace ? text : text.replace(/\s/gu, '');
  if (unit === 'utf16') return value.length;
  if (unit === 'codePoint') return [...value].length;
  if (typeof Intl.Segmenter !== 'function') {
    throw new Error('Intl.Segmenter is required for grapheme counting');
  }
  return [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(value)].length;
}
export function countWords(text) {
  requireText(text);
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/u).length : 0;
}
export function countLines(text) {
  requireText(text);
  return text.length ? text.split(/\r\n|\r|\n/u).length : 0;
}
export function textMetrics(text) {
  return Object.freeze({
    characters: countCharacters(text),
    charactersWithoutWhitespace: countCharacters(text, { includeWhitespace: false }),
    words: countWords(text),
    lines: countLines(text),
  });
}
