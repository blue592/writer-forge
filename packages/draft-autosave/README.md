# draft-autosave

Small async debounce coordinator for any app. Storage is supplied by the caller; no network calls, private code or document collection.

API: createAutosave({ write: async draft => storage.save(draft), delay: 600, onStatus: ({status,error}) => {} }). Returns schedule(value), flush(), dispose({save:true}), getStatus(), hasPending().

When editing, call schedule(draft). Call await flush() or await dispose() before leaving the editor. Failed writes preserve the unsaved value for retry. Draft contents are not included in error status messages. No crash-consistent data guarantee: injected storage must manage its own transactions.

Run: node --test packages/draft-autosave/test/*.test.js

MIT. This is a reusable module, not the private writing application.
