import test from 'node:test';
import assert from 'node:assert/strict';
import { createAutosave } from '../index.js';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
test('debounces rapid edits', async () => {
  const saved = [];
  const a = createAutosave({ write: async x => saved.push(x), delay: 12 });
  a.schedule('a');
  a.schedule('abc');
  await pause(70);
  assert.deepEqual(saved, ['abc']);
  assert.equal(a.getStatus(), 'saved');
  await a.dispose();
});
test('persists edits arriving during the first save', async () => {
  const saved = [];
  let resolveFirst;
  const a = createAutosave({ delay: 1000, write: async value => {
    saved.push(value);
    if (value === 'first') await new Promise(resolve => { resolveFirst = resolve; });
  }});
  a.schedule('first');
  const p = a.flush();
  await pause(1);
  a.schedule('second');
  resolveFirst();
  await p;
  assert.deepEqual(saved, ['first','second']);
  assert.equal(a.hasPending(), false);
  await a.dispose();
});
test('failed write can be retried without losing draft', async () => {
  let attempts = 0;
  const saved = [];
  const a = createAutosave({ delay: 1000, write: async x => {
    if (++attempts === 1) throw Error('quota exceeded');
    saved.push(x);
  }});
  a.schedule('keep me');
  await assert.rejects(a.flush(), /quota exceeded/);
  assert.equal(a.getStatus(), 'error');
  assert.equal(a.hasPending(), true);
  await a.flush();
  assert.deepEqual(saved, ['keep me']);
  await a.dispose();
});
test('dispose saves and prevents further writes', async () => {
  const saved = [];
  const a = createAutosave({ delay: 1000, write: async x => saved.push(x) });
  a.schedule('final');
  await a.dispose();
  assert.deepEqual(saved, ['final']);
  assert.throws(() => a.schedule('not allowed'), /disposed/);
});
test('settings validation', () => {
  assert.throws(() => createAutosave({ write: null }), TypeError);
  assert.throws(() => createAutosave({ write: async () => {}, delay: -1 }), RangeError);
});
