# Repository discrepancy audit

Input is immutable commit [`e508acf`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/tree/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e), inspected 2026-07-24. Count **distinct findings**, not affected question rows. These are documentation/audit findings only; this PR deliberately does not modify application code.

## C01: JWT decode is used as authentication

[`server/src/auth.js:11`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/auth.js#L11) calls `jwt.decode` and accepts a payload with `sub`. The [tagged 9.0.2 README and A02](auth.md#a02-jwt-verification-and-expiry) distinguish decode from signature/expiry verification. A forged or expired token with a `sub` can pass. Use configured verification and reject errors; do not use the development secret fallback in production.

## C02: token subject field mismatch

[`auth.js:28`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/auth.js#L28) signs `sub: user.id`, while [`users.js:25–26`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/users.js#L25) passes the native record and separately exposes `user._id` as the response ID. The native repository returns `_id`, not `id`. Normalize and validate the subject before signing; otherwise the app can issue a token with no usable `sub` and then reject it. See [A02](auth.md#a02-jwt-verification-and-expiry).

## C03: password lifecycle is not implemented

[`userRepo.js:7–16`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/repositories/userRepo.js#L7) trusts `input.passwordHash` and returns it in the user object; [`users.js:10–11`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/users.js#L10) sends that object in the create response; [`users.js:19–25`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/users.js#L19) issues a token after email lookup without password verification. This disagrees with the server-side hash/verify boundary in [A01](auth.md#a01-password-storage-and-login). Treat as one password-lifecycle finding with multiple manifestations.

## C04: native driver callback wrapper

[`userRepo.js:22–31`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/repositories/userRepo.js#L22) passes a callback to driver 5 `findOne` inside a manually constructed Promise. The [v5 removal and 5.9 Promise API in D01](data-access.md#d01-driver-5-callback-removal) contradict it. The callback is not the supported completion path, so the wrapper can never settle and login can hang.

## C05: Express 4 rejected route promises

[`orders.js:7–20`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/orders.js#L7) uses async handlers without a catch/`next` wrapper and explicitly throws when an order is missing. [E01](express.md#e01-async-errors-in-express-4-and-5) establishes that automatic rejected-Promise forwarding is an Express 5 change. The error middleware in `app.js` cannot be assumed to receive these rejections on 4.18.2.

## C06: Mongoose legacy options and two pools

[`db.js:9–20`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/db.js#L9) passes `useNewUrlParser`, `useUnifiedTopology`, `useFindAndModify`, and `poolSize` to Mongoose 7, then opens a separate native client. [D02](data-access.md#d02-mongoose-and-driver-pools) documents removal of the legacy options and `maxPoolSize`. The environment's intended limit of 5 is not a reliable cap on all connections; two clients have separate pools. Remove unsupported options, use the correct option, and budget both clients/processes.

## C07: effect timer has no cleanup

[`LiveFeed.jsx:17–19`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/src/components/LiveFeed.jsx#L17) starts an interval but returns no cleanup. React 18 StrictMode is enabled in `main.jsx`; [R03](react.md#r03-strictmode-effect-cleanup) explains the development setup/cleanup stress test. Repeated mounts can leave duplicate polling timers and stale requests.

## C08: standalone compose cannot run transactions

[`docker-compose.yml:4–10`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/docker-compose.yml#L4) starts `mongo:5.0` without a replica-set configuration. The [5.0 production considerations in M06](mongodb-server.md#m06-transaction-deployment-prerequisite) state standalone deployments do not support transactions. A driver `withTransaction` example cannot be validated against this compose setup until a replica set is configured.
