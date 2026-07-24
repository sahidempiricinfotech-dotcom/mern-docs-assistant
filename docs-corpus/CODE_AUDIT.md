# Repository code contradictions

Audit target: commit `e508acf871cc5b8c09d4928ddfd246c8ecaccc6e`. Exactly eight distinct findings are counted below. Multiple question rows may cite one finding, but the summary count remains eight.

## C-01 — Driver-5 callback will not settle

[`server/src/repositories/userRepo.js:23`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/repositories/userRepo.js#L23) passes a callback to `findOne()`. Driver 5 removed callbacks, so the surrounding Promise can remain pending. Replace it with `return db.collection('users').findOne({ email })`.

Evidence: [driver 5.0 release](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.0.0) and [driver entry](mongodb/driver-5.9.md).

## C-02 — Express-4 async errors are not forwarded

[`server/src/routes/orders.js:7`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/orders.js#L7) and line 12 use async handlers without a catch/`next(error)` path. Express 4 does not automatically forward rejected handler Promises.

Evidence: [Express entry](express/errors-routing-body.md).

## C-03 — Removed Mongoose connection options

[`server/src/db.js:9`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/db.js#L9) passes `useNewUrlParser`, `useUnifiedTopology`, `useFindAndModify`, and `poolSize`. These warning-era options and `poolSize` do not match Mongoose 7; use supported options including `maxPoolSize`.

Evidence: [pooling entry](mongodb/pooling-mongoose7.md).

## C-04 — Two pools, one obsolete setting

[`server/src/db.js:9`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/db.js#L9) opens Mongoose's client and [line 17](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/db.js#L17) opens a second `MongoClient`. Each owns a pool, but the configuration treats pool size as one global knob. Budget/configure both or intentionally reuse one lifecycle.

Evidence: [driver pool options](https://mongodb.github.io/node-mongodb-native/5.9/interfaces/MongoClientOptions.html#maxPoolSize) and [pooling entry](mongodb/pooling-mongoose7.md).

## C-05 — Passwords are neither hashed nor verified

[`server/src/repositories/userRepo.js:9`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/repositories/userRepo.js#L9) accepts a caller-provided `passwordHash`; [`server/src/routes/users.js:19`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/users.js#L19) finds only by email and never verifies the password.

Evidence: [password entry](auth/passwords-jwt-storage.md).

## C-06 — JWTs are decoded, not verified

[`server/src/auth.js:11`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/auth.js#L11) uses `jwt.decode()`. It accepts an unverified payload and does not reject expiration. The same file falls back to a source-known `dev-secret` at line 29.

Evidence: [JWT entry](auth/passwords-jwt-storage.md).

## C-07 — Effect interval has no cleanup

[`client/src/components/LiveFeed.jsx:18`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/src/components/LiveFeed.jsx#L18) creates an interval but the Effect returns no cleanup. React 18 StrictMode's extra setup/cleanup cycle exposes duplicate polling.

Evidence: [React 18 entry](react/react-18-behavior.md).

## C-08 — Transaction recipe conflicts with topology

[`docker-compose.yml:5`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/docker-compose.yml#L5) starts a standalone MongoDB 5.0 container. Multi-document transactions require a replica set or sharded cluster, so Q18's driver recipe cannot execute in the repository topology as written.

Evidence: [MongoDB 5.0 transactions](https://www.mongodb.com/docs/v5.0/core/transactions/) and [server entry](mongodb/server-5.0.md).
