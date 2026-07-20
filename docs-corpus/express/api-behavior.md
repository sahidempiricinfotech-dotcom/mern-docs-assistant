# Express 4.18.2 behavior

## Async error forwarding

Applicable version: **Express 4.18.2**.

Verdict: a rejected async route handler does **not** automatically reach error middleware in Express 4. Wrap the handler or use `try/catch` and call `next(error)`. The [Express error-handling guide](https://expressjs.com/en/guide/error-handling/) distinguishes the general `next(error)` rule from automatic Promise forwarding “starting with Express 5.” The exact package line is evidenced by the [4.18.2 source tag](https://github.com/expressjs/express/tree/4.18.2).

Upgrade delta: on Express 5, returned rejected Promises call `next(value)` automatically.

Code impact: [C07 in the code audit](../code-audit.md#c07-express-4-async-routes-do-not-forward-errors).

## Route path syntax

Applicable version: **Express 4.18.2**, with an explicit Express 5 comparison.

Verdict: optional `:id?` and splat behavior is not portable unchanged. The [Express 5 migration guide](https://expressjs.com/en/guide/migrating-5.html#path-syntax) says `?` is replaced by braces, `*` must be named, wildcard values become arrays, and unmatched parameters are omitted. Keep Express 4 syntax today and include route tests in the Express 5 migration.

## JSON request bodies

Applicable version: **Express 4.18.2**.

Verdict: use `express.json()`; a separate `body-parser` dependency is unnecessary for JSON. The versioned [Express 4 API](https://expressjs.com/en/4x/api.html#express.json) documents the built-in middleware. The repository already does this in `server/src/app.js`.

Related: [CORS and streaming](../cross-stack/http-and-streaming.md).
