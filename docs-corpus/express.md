# Express 4.18.2

Pinned evidence: `server/package.json` and `server/package-lock.json` lock Express 4.18.2. The [4.x API page](https://expressjs.com/en/4x/api/) is the pinned landing page; the [4.18.2 source tag](https://github.com/expressjs/express/tree/4.18.2) proves exact implementation details.

## Async route errors (Q04, Q31)

**Pinned verdict:** Express 4 does not automatically forward a rejected Promise from an `async` route handler. Catch the rejection and call `next(error)`, or wrap handlers in a small function that resolves the returned Promise and `.catch(next)`.

The official [error-handling guide](https://expressjs.com/en/guide/error-handling/) says asynchronous errors must be passed to `next()` and explicitly identifies automatic Promise rejection forwarding as starting with Express 5. This version statement is the evidence for the 4/5 boundary.

**Repository contradiction:** both `server/src/routes/orders.js:7` and `:12` are bare async Express 4 handlers. A rejected Mongoose query can bypass `server/src/app.js:21` and leave the request without the intended JSON 500 response.

**Upgrade delta:** Express 5 automatically calls `next(value)` for a rejected/throwing returned Promise. Do not backport that behavior in an answer to this Express 4 app.

Related: [Mongo promise-only APIs](data-access.md#promise-only-driver-api-q03) and [JWT middleware](auth.md#jwt-verification-q16-q32-q34).

## Route path syntax (Q11)

**Pinned verdict:** optional `?` parameters and wildcard splats do not behave identically across Express 4 and 5. Keep Express 4 syntax for this app and test every path during migration. The official [Express 5 migration guide](https://expressjs.com/en/guide/migrating-5.html#path-route-matching-syntax) states that `*` must be named and that `?` is replaced by brace syntax in Express 5.

**Routing correction:** Q11's Sheet hint says MongoDB; the question is routed to Express.

## JSON request bodies (Q13)

**Pinned verdict:** use `express.json()`; a separate direct `body-parser` dependency is unnecessary for JSON parsing in Express 4.18.2. The exact [4.18.2 source](https://github.com/expressjs/express/blob/4.18.2/lib/express.js#L77-L80) exports `json` from its bundled body-parser dependency.

**Repository check:** `server/src/app.js:15` already uses `express.json()` correctly.

## Credentialed CORS (Q20)

**Pinned verdict:** the server must return an explicit allowed origin and `Access-Control-Allow-Credentials: true`; the browser request must opt into credentials. The exact [`cors@2.8.5` README](https://github.com/expressjs/cors/tree/v2.8.5#configuration-options) defines `origin` and `credentials` behavior. Browser cookie delivery rules are in [auth.md](auth.md#browser-token-storage-q25).

**Repository check:** `server/src/app.js:11-14` correctly uses one explicit origin and `credentials: true`. `client/src/components/LiveFeed.jsx:8` calls `fetch()` without `credentials: 'include'`; if that request is cross-origin and cookie-authenticated, the browser will omit the cookie. CORS is not authentication or CSRF protection.

## Streaming error boundary (Q22, Q36)

Set response headers before starting the pipeline, propagate pre-header errors with `next(error)`, and destroy/close the stream on abort. The [Express error guide](https://expressjs.com/en/guide/error-handling/) notes that when an error occurs after headers are sent, the default handler closes the connection; custom middleware should delegate with `next(error)` when `res.headersSent` is true.

Related: [Node streaming](node.md#streaming-large-responses-q22-q36) and [Mongo cursor streaming](data-access.md#cursor-streaming-q22-q36).

