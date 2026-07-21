# Cross-stack HTTP behavior

## Credentialed CORS

Applicable versions: **cors 2.8.5**, Express 4.18.2, browser Fetch used by React 18.2.

Verdict: the server must return a specific allowed origin and `Access-Control-Allow-Credentials: true`; it cannot use `*`. The browser request must set `credentials: 'include'` for cross-origin cookie credentials. The repository's `cors` configuration correctly uses a specific origin and `credentials: true`. Evidence for server behavior: exact [cors v2.8.5 README](https://github.com/expressjs/cors/blob/v2.8.5/README.md). Browser evidence: [MDN Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) and the [credentialed-wildcard CORS error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSNotSupportingCredentials), both checked 2026-07-21 and treated as `not-versioned guidance`, not as React version claims.

Related: [Browser token location](../auth/authentication.md#browser-token-location).

## Streaming HTTP and CSV

Applicable versions: **Node.js 18.19.x, Express 4.18.2, driver 5.9.2**.

Verdict: create a Mongo cursor with a deterministic indexed sort, transform documents to correctly escaped CSV rows, and pipeline the readable cursor/transform into the Express response. Set headers before streaming; propagate pipeline errors to `next` only if headers are not sent, otherwise terminate the response. Sources: exact [Node 18.19.0 `stream.pipeline()`](https://nodejs.org/download/release/v18.19.0/docs/api/stream.html#streampipelinesource-transforms-destination-callback), exact driver 5.9 [`FindCursor.stream()`](https://mongodb.github.io/node-mongodb-native/5.9/classes/FindCursor.html#stream), and [Express error behavior](https://expressjs.com/en/guide/error-handling/), with Express 4.18.2 anchored by its [source tag](https://github.com/expressjs/express/tree/4.18.2).

Repository context: current order queries call `.limit(25)` and materialize arrays, and no CSV export route exists. A streaming export must be a distinct route rather than changing the ordinary list endpoint.

Related: [Node streams](../node/runtime-and-apis.md#streams) and [large-result pagination](../data-access/driver-and-mongoose.md#large-result-pagination).
