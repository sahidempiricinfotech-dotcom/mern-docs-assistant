# Express and HTTP entries

## E01: async errors in Express 4 and 5

**Applies to:** Express **4.18.2** current; **5.x** upgrade delta. **Evidence:** the [4.x error-handling guide](https://expressjs.com/en/4x/guide/error-handling/) says asynchronous errors must be passed to `next`, and explicitly distinguishes automatic rejected-Promise forwarding as starting in Express 5. The [Express 5 migration guide](https://expressjs.com/en/guide/migrating-5.html#rejected-promises-handled-from-middleware-and-handlers) confirms the changed behavior. **Recency:** 4.x versioned guide and living migration guide with an explicit 5 boundary; inspected 2026-07-24.

On 4.18.2, wrap an `async` route in `try/catch` and call `next(err)`, or use a consistently tested Promise wrapper such as `Promise.resolve(handler(...)).catch(next)`. Synchronous throws are caught; rejected promises are not automatically forwarded on this line. The stale sheet answer cited Express 5 for an Express 4 service. [`orders.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/orders.js#L7) has unwrapped async handlers and an explicit throw: [C05](code-audit.md#c05-express-4-rejected-route-promises). The login hang has an additional driver-specific cause [D01](data-access.md#d01-driver-5-callback-removal), which links back here.

## E02: route-pattern migration

**Applies to:** Express **4.18.2** current, **5.x** delta. **Evidence:** [Express 5 migration guide, path route syntax](https://expressjs.com/en/guide/migrating-5.html#path-route-matching-syntax) says `*` must be named, `?` optional syntax is replaced by braces, and documents changed wildcard/optional `req.params` behavior. The [4.x API](https://expressjs.com/en/4x/api/) is explicitly the 4.x reference. **Recency:** versioned 4 line and living migration guide with explicit version comparison; inspected 2026-07-24.

Do not assume `:id?` and `*` string routes have identical meaning across the upgrade. Audit each route, use named splats and brace syntax on 5, and test root matching and parameter shape. The present `/:orderId` route is not itself optional, so this is an upgrade warning rather than a present code contradiction.

## E03: JSON body parsing

**Applies to:** Express **4.18.2**. **Evidence:** the [4.x `express()` API](https://expressjs.com/en/4x/api/express/#express.json) says `express.json()` is built-in, based on `body-parser`, and added in 4.16.0; the [4.16.0 release](https://github.com/expressjs/express/releases/tag/4.16.0) records the addition. **Recency:** versioned API and dated release tag; inspected 2026-07-24.

For normal JSON requests, use `app.use(express.json())`; a separate `body-parser` dependency is not required for that parser. Configure limits/type and validate untrusted `req.body`. [`app.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/app.js#L15) already uses the correct built-in middleware.

## E04: credentialed CORS server side

**Applies to:** `cors` **2.8.5** with Express **4.18.2**; browser behavior is a living web-platform boundary. **Evidence:** the [tagged `cors` v2.8.5 README](https://github.com/expressjs/cors/tree/v2.8.5) documents explicit/reflected `origin` and `credentials: true` setting `Access-Control-Allow-Credentials`; [MDN's credentialed wildcard error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSNotSupportingCredentials) explains `*` cannot be used with credentials. **Recency:** immutable package tag plus living MDN page, inspected 2026-07-24. MDN is **`version-unverified`** with respect to library releases, but is browser-platform evidence.

For credentialed cross-origin browser requests, allow the specific trusted origin (or a validated allowlist), send credentials support, handle preflight, and have the client opt in. Do not pair credentials with `Access-Control-Allow-Origin: *`. [`app.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/app.js#L11) uses a specific default origin and `credentials: true`; the deployment must set `CLIENT_ORIGIN` correctly. The client half is [R05](react.md#r05-credentialed-browser-fetch-and-cors), which links back.

## E05: session middleware boundary

**Applies to:** **`version-unverified` for this app**. Neither `express-session` nor `connect-mongo` is installed or pinned in [V01](versions.md#v01-repository-pinned-stack). **Sources:** living upstream [`express-session` README](https://github.com/expressjs/session) and [`connect-mongo` README](https://github.com/jdesboeufs/connect-mongo), inspected 2026-07-24. The former says only the session ID is in the cookie, `MemoryStore` is not for production, and secure cookies behind a proxy require appropriate `trust proxy`; the latter shows `MongoStore.create(options)`. No compatible exact pair is established here.

The architectural pattern is a signed, opaque session-ID cookie with server-side session data in a compatible Mongo store, not the entire session in the cookie. Pin and compatibility-test the middleware/store pair, configure a strong secret, lifetime, `HttpOnly`, `Secure`, `SameSite`, proxy trust, TTL, regeneration, and CSRF controls before implementation. This is a **Low-confidence implementation gap**, not permission to paste current README syntax into the pinned app. See [A05](auth.md#a05-signed-session-cookie-and-mongo-store) and [D06](data-access.md#d06-session-store-compatibility); both link back.

## E06: streaming an HTTP response

**Applies to:** Express **4.18.2** response on Node **18.19.0**. **Evidence:** [4.x response API](https://expressjs.com/en/4x/api/response/) identifies the framework response object; [Node 18.19 stream pipeline](https://nodejs.org/download/release/v18.19.0/docs/api/stream.html#streampipelinesource-transforms-destination-callback) documents piping, error cleanup, and the response-socket caveat. **Recency:** versioned lines, inspected 2026-07-24.

Set `Content-Type` and, for a download, `Content-Disposition` before body bytes. Pipe the source through a transform into `res`, honor backpressure, and treat post-header failure as stream termination rather than a new JSON response. For Mongo CSV, use [D05](data-access.md#d05-cursor-streaming) and [N05](node.md#n05-streams-and-http-pipelines); both link back. The repository has no CSV endpoint, so this is a proposed pattern, not a claim about existing behavior.
