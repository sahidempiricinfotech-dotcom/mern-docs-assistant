# Express 4.18.2 errors, routes, and JSON bodies

**Applies to:** `express-4.18.2` on `node-18.19.0`. **Retrieved:** 2026-07-24.

## Async errors (Q04, Q31)

Express 4 does **not** automatically forward a rejected Promise returned by an async route. Wrap the handler with a Promise-catching adapter or use `try/catch` and `next(error)`. Automatic forwarding starts in Express 5.

The two async handlers in `server/src/routes/orders.js` omit `next` and a catch path, so a rejected database call does not reliably reach the application's error middleware. Q31 also has a separate driver-5 callback problem; see [driver data access](../mongodb/driver-5.9.md).

## Route path syntax (Q11)

Express 4 and 5 are not syntax-compatible. The Express 5 migration guide requires named wildcards (`/*splat`) and replaces `?` optionals with braces (`/:file{.:ext}`). The current service is on Express 4, so use and test 4.x syntax now, then migrate route patterns explicitly during the Express 5 upgrade.

## JSON request bodies (Q13)

`express.json()` is the built-in Express 4 JSON parser and is already installed in `server/src/app.js`. A separate `body-parser` dependency is unnecessary for ordinary JSON bodies. `req.body` is untrusted input and still requires validation.

## Error handling after streaming starts (Q22, Q36)

If a stream fails after response headers were sent, an Express error handler must delegate with `next(error)` rather than attempt a second JSON response. Tie the source stream/cursor to request closure.

## Upgrade delta

Express 5 automatically forwards rejected Promise values and changes path matching syntax. That delta explains why the prior Q04 answer, sourced from Express 5, was wrong for this repository.

## Sources

- [Express error handling](https://expressjs.com/en/guide/error-handling.html) — explicitly distinguishes Express 5 automatic Promise forwarding from the earlier behavior.
- [Express 5 migration guide](https://expressjs.com/en/guide/migrating-5.html)
- [Express 4.x API](https://expressjs.com/en/4x/api/)
- [Express 4.18.2 release](https://github.com/expressjs/express/releases/tag/4.18.2)
- [Pinned order routes](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/orders.js)

Cross-links: [driver 5.9](../mongodb/driver-5.9.md), [Node streams](../node/streams-and-crypto.md), and [code audit](../CODE_AUDIT.md).
