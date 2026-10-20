/**
 * Framework-independent debounced async save coordinator; caller injects storage.
 * @license MIT
 */
export function createAutosave({ write, delay = 600, onStatus = () => {} } = {}) {
  if (typeof write !== 'function') throw new TypeError('write must be a function');
  if (typeof onStatus !== 'function') throw new TypeError('onStatus must be a function');
  if (!Number.isFinite(delay) || delay < 0) throw new RangeError('delay must be nonnegative');

  let timer = null;
  let latest;
  let pending = false;
  let current = null;
  let status = 'idle';
  let closed = false;
  let revision = 0;

  function emit(next, error) {
    status = next;
    onStatus({ status: next, revision, error: error ? String(error.message ?? error) : undefined });
  }
  function cancelTimer() {
    if (timer !== null) clearTimeout(timer);
    timer = null;
  }
  async function flush() {
    cancelTimer();
    if (current) {
      await current;
      if (pending) return flush();
      return;
    }
    if (!pending) return;
    const writtenVersion = revision;
    const value = latest;
    pending = false;
    emit('saving');
    current = Promise.resolve().then(() => write(value));
    try {
      await current;
      if (pending) emit('pending');
      else emit('saved');
    } catch (error) {
      if (revision === writtenVersion) {
        latest = value;
        pending = true;
      }
      emit('error', error);
      throw error;
    } finally {
      current = null;
    }
    if (pending) return flush();
  }
  function schedule(value) {
    if (closed) throw new Error('autosave has been disposed');
    latest = value;
    pending = true;
    revision++;
    cancelTimer();
    emit('pending');
    timer = setTimeout(() => { void flush().catch(() => {}); }, delay);
  }
  async function dispose({ save = true } = {}) {
    if (closed) return;
    cancelTimer();
    if (save) await flush();
    else if (current) await current;
    closed = true;
    emit('disposed');
  }
  return { schedule, flush, dispose, getStatus: () => status, hasPending: () => pending || current !== null };
}
