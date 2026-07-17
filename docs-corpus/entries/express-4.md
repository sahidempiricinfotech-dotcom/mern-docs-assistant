# Express 4

Version tag: `express@4.18.2`.

Evidence:

- Repo: `server/package-lock.json` pins `express@4.18.2`.
- Official docs: [Express 4.x API reference](https://expressjs.com/en/4x/api/), explicitly versioned for 4.x.

Recency context: Express 5 behavior differs in error propagation and route path matching. Express 5 docs are upgrade notes, not the default behavior for this repo.

## Async Route Errors

Applies to: Express 4.18.2.

Source attribution:

- [Express error handling guide](https://expressjs.com/en/guide/error-handling/). The guide says async errors in invoked functions must be passed to `next()`, and separately says Express 5 promise rejections are forwarded automatically.
- Repo: `server/src/routes/orders.js` uses async route handlers without `try/catch` or `next(error)`.

Verdict: Under Express 4, an async route that rejects after an awaited DB call is not automatically forwarded just because the handler returns a rejected Promise. Use a wrapper such as `fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)` or local `try/catch(next)`.

Code contradiction: `server/src/routes/orders.js` throws `new Error('Order not found')` inside an async route without passing the error to `next`. That matches the stale Q04 answer's Express 5 behavior, not this repo's Express 4 runtime.

Related entry: [MongoDB driver callbacks](mongodb-5-data-access.md#driver-callbacks), because Promise-only data-access failures need Express 4 error forwarding.

## JSON Body Parser

Applies to: Express 4.18.2.

Source attribution:

- [Express 4.x API reference for `express.json()`](https://expressjs.com/en/4x/api/#express.json), versioned for Express 4.x.
- Repo: `server/src/app.js` already uses `app.use(express.json())`.

Verdict: `body-parser` is not needed for ordinary JSON request bodies in this repo. Keep `express.json()` unless a route needs a parser not included in Express.

## Route Pattern Differences In Express 5

Applies to: Express 4.18.2 now; Express 5 only on upgrade.

Source attribution:

- [Express 5 migration guide](https://expressjs.com/en/guide/migrating-5/) documents changed path route matching syntax, including named wildcards and replacing optional `?` syntax with braces.

Verdict: Do not apply Express 5 route-pattern examples to this Express 4 repo. The day we upgrade, optional params and wildcard splats need a route audit.

## Credentialed CORS

Applies to: `cors@2.8.5` with Express 4.18.2.

Source attribution:

- [expressjs/cors README](https://github.com/expressjs/cors#configuration-options), package README, version-unverified for the exact installed `2.8.5` but directly relevant to the package family.
- Repo: `server/src/app.js` sets `origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'` and `credentials: true`.

Verdict: Credentialed browser requests need a specific allowed origin and `credentials: true` server-side, plus the browser request must opt in with credentials. The repo's server-side default is consistent for local Vite, but production must set `CLIENT_ORIGIN` explicitly.

Confidence note: Medium, because the README is not a versioned `2.8.5` page.
