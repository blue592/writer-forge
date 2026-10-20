import test from 'node:test';
import assert from 'node:assert/strict';
import { duplicateSentences, phraseOverlap, reviewText } from '../src/review.js';

test('finds duplicate sentences', () => { assert.equal(duplicateSentences('같다. 다르다. 같다.').length, 1); });
test('compares phrases without claiming infringement', () => { assert.ok(phraseOverlap('alpha beta gamma', 'alpha beta gamma').ratio > 0); assert.match(reviewText('한 문장.').copyrightNote, /not a legal/); });

