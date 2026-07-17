# MongoDB 5 And Data Access

Version tags:

- MongoDB server: `mongo:5.0`.
- MongoDB Node driver: `mongodb@5.9.2`.
- Mongoose: `mongoose@7.6.13`.

Evidence:

- Repo: `docker-compose.yml` uses `mongo:5.0`.
- Repo: `server/package-lock.json` pins `mongodb@5.9.2` and `mongoose@7.6.13`.
- Official docs: MongoDB Manual `/docs/v5.0/` pages are versioned for server 5.0.

Recency context: MongoDB server docs differ sharply across 5.0, 5.1, 7.x, and 8.x. Driver docs URLs for `/drivers/node/v5.9/` redirected to current docs during this run, so driver-doc claims are tagged with release notes or API docs where exact 5.x evidence is needed.

## Driver Callbacks

Applies to: `mongodb@5.9.2`.

Source attribution:

- [MongoDB Node driver v5.0.0 release notes](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.0.0), which announce removal of callback support in favor of a Promise-only public API.
- Repo: `server/src/repositories/userRepo.js` passes a callback to `db.collection('users').findOne({ email }, callback)`.

Verdict: Use Promises or `async/await` with the MongoDB driver in this repo. Callback examples from older driver docs are stale for `mongodb@5.9.2`.

Code contradiction: `findUserByEmail()` wraps `findOne()` in a new Promise and passes a callback. That is incompatible with the driver 5 public API. It should be `return db.collection('users').findOne({ email });`.

Related entry: [Express async route errors](express-4.md#async-route-errors), because rejected data-access Promises need Express 4 forwarding.

## Mongoose Pool Sizing

Applies to: `mongoose@7.6.13`, `mongodb@5.9.2`.

Source attribution:

- [Mongoose 7 migration guide](https://mongoosejs.com/docs/7.x/docs/migrating_to_7.html), versioned for 7.x, says Mongoose 7 requires MongoDB Node Driver >=5.0.0 and documents dropped callback support.
- [Mongoose 7 connection docs](https://mongoosejs.com/docs/7.x/docs/connections.html), versioned for 7.x, document `maxPoolSize`, default 100, and one operation per socket.
- [MongoDB Node driver connection options](https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/) document `maxPoolSize`; this page redirected from a `v5.9` URL to current, so exact version tag is supported by the Mongoose 7 page and driver 5 release line, not by the redirected URL alone.
- Repo: `server/src/db.js` uses `poolSize: Number(process.env.MONGO_POOL_SIZE || 5)`.

Verdict: Configure Mongoose pool size with `maxPoolSize`, not `poolSize`. Start from the default or a measured value, then tune from request concurrency, query latency, MongoDB connection limits, and slow-query behavior.

Code contradiction: `server/src/db.js` uses `poolSize` plus legacy options `useNewUrlParser`, `useUnifiedTopology`, and `useFindAndModify`. For Mongoose 7 / driver 5, this should be modernized to `maxPoolSize` and the removed legacy flags should be deleted.

## Lookup And Sharded Collections

Applies to: MongoDB server 5.0.

Source attribution:

- [MongoDB 5.0 `$lookup` docs](https://www.mongodb.com/docs/v5.0/reference/operator/aggregation/lookup/) say `$lookup` performs a left outer join to an unsharded collection.
- [MongoDB 7.0 `$lookup` docs](https://www.mongodb.com/docs/v7.0/reference/operator/aggregation/lookup/) say starting in MongoDB 5.1, `$lookup` can be used with sharded collections.

Verdict: On this repo's MongoDB 5.0 server, a `$lookup` join target should be treated as unsharded. The behavior changes after an upgrade to MongoDB 5.1+.

Upgrade delta: When the server moves from 5.0 to 5.1 or later, sharded `$lookup` becomes available, but performance and shard-key design still matter.

## Default Write Concern

Applies to: MongoDB server 5.0.

Source attribution:

- [MongoDB 5.0 write concern docs](https://www.mongodb.com/docs/v5.0/reference/write-concern/) state that starting in MongoDB 5.0, the implicit default write concern is `w: majority`, except deployments with arbiters can fall back to `{ w: 1 }` under the documented conditions.

Verdict: For normal replica set and sharded deployments without the arbiter exception, default writes are majority acknowledged in MongoDB 5.0. If the deployment uses arbiters, verify the data-bearing voting member condition before assuming majority.

## Time-Series TTL

Applies to: MongoDB server 5.0.

Source attribution:

- [MongoDB 5.0 time-series TTL docs](https://www.mongodb.com/docs/v5.0/core/timeseries/timeseries-automatic-removal/) show `expireAfterSeconds` on a time-series collection and describe automatic removal of expired buckets.

Verdict: MongoDB 5.0 time-series collections can use `expireAfterSeconds` for retention.

## Transactions

Applies to: `mongodb@5.9.2` with MongoDB server 5.0 deployments that support transactions.

Source attribution:

- [MongoDB Node driver transactions docs](https://www.mongodb.com/docs/drivers/node/current/crud/transactions/), reached from the `v5.9` path but redirected to current, document sessions, transaction APIs, and warn against parallelism such as `Promise.all()` in a transaction.

Verdict: Use `client.withSession()` / `session.withTransaction()` or explicit session transaction APIs, pass `{ session }` to every operation, await operations sequentially, and do not use `Promise.all()` on one session.

Confidence note: Medium for exact driver 5.9 wording because the page redirected to current.

## Bulk Upserts

Applies to: `mongodb@5.9.2`.

Source attribution:

- [MongoDB Node driver bulk operations docs](https://www.mongodb.com/docs/drivers/node/current/crud/bulk-write/), reached from the `v5.9` path but redirected to current, document `bulkWrite()` operation models.

Verdict: Use collection-level `bulkWrite()` with `updateOne` models containing a stable `filter`, `$set` or pipeline update, and `upsert: true`. Batch work to respect document size and operational limits.

Confidence note: Medium for exact driver 5.9 wording because the page redirected to current.

## Large Pagination

Applies to: MongoDB server 5.0.

Source attribution:

- [MongoDB 5.0 `cursor.skip()` docs](https://www.mongodb.com/docs/v5.0/reference/method/cursor.skip/) say `skip()` scans from the beginning and slows as offset grows; range queries can use indexes and perform better as offsets grow.

Verdict: Avoid deep offset pagination with `skip()`. Use stable range/cursor pagination on an indexed sort key such as `createdAt` plus `_id`.

## In Operator Size

Applies to: MongoDB server 5.0.

Source attribution:

- [MongoDB 5.0 `$in` docs](https://www.mongodb.com/docs/v5.0/reference/operator/query/in/) recommend limiting parameters to tens of values and warn that hundreds or more can hurt performance.

Verdict: There is no useful fixed count limit for `$in` in app code beyond BSON and query planner constraints, but the versioned docs recommend tens of values, indexed fields, and avoiding hundreds or more.

## Cursor Streaming

Applies to: `mongodb@5.9.2`, Node 18.

Source attribution:

- [MongoDB Node driver 5.9 `FindCursor` API docs](https://mongodb.github.io/node-mongodb-native/5.9/classes/FindCursor.html) document `stream()` returning a Node Readable and `toArray()` requiring enough memory for results.
- [MongoDB Node driver cursor docs](https://www.mongodb.com/docs/drivers/node/current/crud/query/cursor/) document cursor batching, `for await...of`, and stream APIs; the `v5.9` path redirected to current.
- [Node 18 HTTP docs](node-18.md#http-streaming) cover streaming HTTP responses.

Verdict: Stream large exports with a cursor or async iterator and write rows to the response incrementally. Do not call `toArray()` for large exports.
