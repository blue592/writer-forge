export function sentences(text) { return String(text).split(/[.!?。！？]+/).map(s => s.trim()).filter(Boolean); }
export function duplicateSentences(text) {
  const list = sentences(text); const seen = new Map(); const duplicates = [];
  for (const sentence of list) { const key = sentence.replace(/\s+/g, ' ').toLowerCase(); if (seen.has(key)) duplicates.push({ sentence, firstIndex: seen.get(key) }); else seen.set(key, list.indexOf(sentence)); }
  return duplicates;
}
export function phraseOverlap(a, b, size = 4) {
  const grams = text => new Set(sentences(text).flatMap(s => { const words = s.split(/\s+/); const width = Math.min(size, Math.max(1, words.length)); return words.slice(0, Math.max(1, words.length - width + 1)).map((_, i) => words.slice(i, i + width).join(' ')); }));
  const left = grams(a); const right = grams(b); const shared = [...left].filter(x => right.has(x));
  return { shared, ratio: left.size ? shared.length / left.size : 0 };
}
export function reviewText(text, sources = []) {
  const duplicate = duplicateSentences(text); const missingSources = sources.filter(source => !source.url || !source.title);
  return { characters: [...String(text)].length, sentences: sentences(text).length, duplicateSentences: duplicate, sourceWarnings: missingSources, copyrightNote: 'This is a similarity and attribution aid, not a legal determination of copyright infringement.' };
}

