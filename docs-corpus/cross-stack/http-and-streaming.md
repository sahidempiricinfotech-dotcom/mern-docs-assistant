# Cross-stack HTTP behavior

## Credentialed CORS

Applicable versions: **cors 2.8.5**, Express 4.18.2, browser Fetch used by React 18.2.

Verdict: the server must return a specific allowed origin and `Access-Control-Allow-Credentials: true`; it cannot use `*`. The browser request must set `credentials: 'include'` for cookie credentials. The repository's `cors` configuration correctly uses a specific origin and `credentials: true`. Evidence for server behavior: exact [cors v2.8.5 README](https://github.com/expressjs/cors/blob/v2.8.5/README.md). Fetch credential semantics are web-platform behavior and are not a React version claim.

Related: [Browser token location](../auth/authentication.md#browser-token-location).

## Streaming HTTP and CSV

Applicable versions: **Node.js 18.19.x, Express 4.18.2, driver 5.9.2**.

Verdict: create a Mongo cursor with a deterministic indexed sort, transform documents to correctly escaped CSV rows, and pipeline the readable cursor/transform into the Express response. Set headers before streaming; propagate pipeline errors to `next` only if headers are not sent, otherwise terminate the response. Sources: [Node 18 streams](https://nodejs.org/docs/latest-v18.x/api/stream.html), [MongoDB cursor streaming](https://www.mongodb.com/docs/drivers/node/current/crud/query/cursor/), and [Express streaming error behavior](https://expressjs.com/en/guide/error-handling/). Exact driver applicability is anchored by the v5.9.2 tag.

Repository context: current order queries call `.limit(25)` and materialize arrays, and no CSV export route exists. A streaming export must be a distinct route rather than changing the ordinary list endpoint.

Related: [Node streams](../node/runtime-and-apis.md#streams) and [large-result pagination](../data-access/driver-and-mongoose.md#large-result-pagination).
