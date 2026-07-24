# Mongoose 7.6 and connection pools

**Applies to:** `mongoose-7.6.13` and `mongodb-driver-5.9.2`. Mongoose's archived 7.x connection page currently renders the final 7.x documentation; applicability to 7.6.13 is backed by the exact 7.6.13 tag and the migration note that introduced the option before 7.x. **Retrieved:** 2026-07-24.

## Pool option and sizing (Q14, Q27, Q33)

Use `maxPoolSize`, not `poolSize`. Mongoose documents a default `maxPoolSize` of 100 connections per connection and explains that a socket runs one operation at a time. There is no universally correct production number: choose a per-process value from the database connection budget, number of app replicas/workers, observed wait-queue latency, and workload concurrency; load-test before increasing it.

The MongoDB driver 5.9 API also exposes `maxPoolSize`, `minPoolSize`, `maxConnecting`, `maxIdleTimeMS`, and `waitQueueTimeoutMS`.

## Repository impact

`server/src/db.js` passes `useNewUrlParser`, `useUnifiedTopology`, `useFindAndModify`, and `poolSize`. Those old warning options and `poolSize` were removed before Mongoose 7. The file also opens a Mongoose connection and a separate native `MongoClient`; each owns a pool, while only the obsolete Mongoose option is nominally tuned. Budget and configure both pools or reuse one connection path intentionally.

## Sources

- [Mongoose 7.6.13 release tag](https://github.com/Automattic/mongoose/releases/tag/7.6.13)
- [Mongoose 7.x connections: `maxPoolSize`](https://mongoosejs.com/docs/7.x/docs/connections.html)
- [Mongoose migration note: `poolSize` replaced](https://mongoosejs.com/docs/7.x/docs/migrating_to_6.html)
- [MongoDB driver 5.9 `MongoClientOptions`](https://mongodb.github.io/node-mongodb-native/5.9/interfaces/MongoClientOptions.html#maxPoolSize)
- [Pinned `db.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/db.js)

Cross-links: [driver data access](driver-5.9.md), [sessions](../express/cors-sessions.md), and [code audit](../CODE_AUDIT.md).
