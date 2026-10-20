# text-char-count

Standalone, dependency-free Unicode-aware text metrics for any JavaScript editor.

- countCharacters(text, { unit: 'grapheme' | 'codePoint' | 'utf16', includeWhitespace: boolean })
- countWords(text): splits on whitespace (not linguistic tokenization).
- countLines(text): empty input = 0; a trailing newline adds an empty line.
- textMetrics(text): combined object.

Example: textMetrics('안녕 세계') returns { characters: 5, charactersWithoutWhitespace: 4, words: 2, lines: 1 }.

Requires Intl.Segmenter for grapheme counting. Modern browsers and Node 18+ provide it. The package throws if unavailable rather than presenting inaccurate counts.

Run: node --test packages/text-char-count/test/*.test.js

MIT. No network calls, user content collection, or private project dependencies.
