# Express 4.18.2

The manifest and lockfile both pin `express@4.18.2`. The [official 4.x API reference](https://expressjs.com/en/4x/api.html) is explicitly labelled “4.x API Reference.” Individual 4.x guide URLs are major-version evidence; exact 4.18.2 source is the lockfile.

## Async route errors

**Applies to:** Express 4.18.2. **Upgrade delta:** Express 5. **Confidence: High.**

Express 4 automatically catches synchronous throws. For callback or Promise failures from asynchronous work, the handler must pass the error to `next()`, typically with `try { await ... } catch (error) { next(error) }` or a wrapper that executes `Promise.resolve(handler(...)).catch(next)`. The [Express 4 error guide](https://expressjs.com/en/4x/guide/error-handling.html) explicitly says asynchronous errors must be passed to `next()`, then states separately that **starting with Express 5** rejected/throwing returned Promises call `next(value)` automatically.

`server/src/routes/orders.js:7-19` awaits database work and may throw, but neither handler accepts/calls `next`. On Express 4.18.2 the rejection does not reliably reach `server/src/app.js:21-26`; this is the cause of the hanging/unhandled request reports. The `users` routes already use the correct explicit `try/catch/next` pattern. Related: a driver callback never firing because callbacks were removed is a separate defect in [driver 5 callback removal](data-access.md#driver-5-callback-removal).

## JSON request bodies

**Applies to:** Express 4.18.2. **Confidence: High.**

Use built-in `express.json()` for JSON request bodies; a separate `body-parser` package is unnecessary for this case. `server/src/app.js:15` is correct. Source: [Express 4.x `express.json()`](https://expressjs.com/en/4x/api.html#express.json), versioned 4.x API. Parsed body content is untrusted input; this is why [password storage](auth.md#password-storage) rejects the current pass-through `passwordHash` design.

## Route-pattern delta

**Applies to:** Express 4.18.2; delta to Express 5. **Confidence: High.**

Do not assume optional parameters and wildcards have identical grammar across 4 and 5. Use the Express 4 route syntax for this app. On upgrade, named wildcards are required and the `?` optional modifier is replaced by braces. Sources: [Express 4 routing](https://expressjs.com/en/4x/guide/routing.html) for the pinned major and [Express 5 migration: path route matching](https://expressjs.com/en/guide/migrating-5.html#path-syntax) for the explicit delta.

## Credentialed CORS

**Applies to:** `cors@2.8.5` and Express 4.18.2 server; browser credentials semantics are not React-version-specific. **Confidence: Medium.**

The server must return a specific allowed origin and `Access-Control-Allow-Credentials: true`; wildcard `*` is not valid for a credentialed browser request. The browser request must opt in (`credentials: 'include'`) when cross-origin cookies are intended. `server/src/app.js:11-14` correctly selects a concrete `CLIENT_ORIGIN` and `credentials: true`. The client currently uses relative `/api/events`, so deployment/proxy topology decides whether CORS is involved; no cookie credential option is present in `LiveFeed.jsx`.

Package evidence: manifest/lockfile pin `cors@2.8.5`; configuration source is the immutable [expressjs/cors v2.8.5 README](https://github.com/expressjs/cors/tree/v2.8.5). Browser-side credential behaviour is outside Express and React versioning, so this remains Medium. See [JWT/session storage](auth.md#token-location-and-refresh-rotation) before choosing cookies.

## Streaming responses

**Applies to:** Express 4.18.2 and Node 18.19.0. **Confidence: High** for the transport pattern; data encoding remains application-specific.

`res` is the Node HTTP response. Set headers before streaming, use [Node `pipeline()`](node-18.md#streaming-and-backpressure), and pass an error onward only if the response is still recoverable. If `res.headersSent` is true, delegate to Express's default handler with `next(err)` so it can close the partial response. The pinned-major rule is explicit in the [Express 4 error guide's streaming section](https://expressjs.com/en/4x/guide/error-handling.html#the-default-error-handler). For Mongo cursor input, see [cursor streaming](data-access.md#streaming-a-mongo-cursor), which links back here.

