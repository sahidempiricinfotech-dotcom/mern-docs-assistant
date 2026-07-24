# MongoDB Node driver 5.9.2 and Mongoose 7.6.13

Pinned evidence: `server/package.json` and `server/package-lock.json` lock the two packages. Exact driver signatures use the generated [5.9 API reference](https://mongodb.github.io/node-mongodb-native/5.9/), whose pages link to v5.9.0 source. Current guide pages reached through old `/v5.9/` URLs redirect to `current`; they are not used alone to claim 5.9 applicability.

## Promise-only driver API (Q03)

**Pinned verdict:** move MongoDB driver calls to Promises/`async`–`await`. In the versioned [5.9 `Collection.findOne()` API](https://mongodb.github.io/node-mongodb-native/5.9/classes/Collection.html#findOne), every overload returns a Promise and none accepts a callback.

**Repository contradiction:** `server/src/repositories/userRepo.js:23` passes a callback as the second argument to `findOne()`. On driver 5.9 this position is options, not a callback; the outer Promise can remain unresolved. Replace it with `return db.collection('users').findOne({ email })`.

Related: [Express 4 rejected Promises](express.md#async-route-errors-q04-q31).

## Mongoose pool configuration (Q14, Q33)

**Pinned verdict:** use `maxPoolSize` (and only set `minPoolSize` when there is an evidenced warm-pool need). The versioned [Mongoose 7 connections page](https://mongoosejs.com/docs/7.x/docs/connections.html#options) documents a default `maxPoolSize` of 100, one operation per socket, and tuning against slow operations and deployment connection limits. The [Mongoose 6 migration guide](https://mongoosejs.com/docs/migrating_to_6.html#mongodb-driver-40) records that `poolSize` was replaced by `minPoolSize`/`maxPoolSize`; this change remains true in 7.x.

**Repository contradictions:** `server/src/db.js:14` passes obsolete `poolSize`. Lines 11–13 also pass `useNewUrlParser`, `useUnifiedTopology`, and `useFindAndModify`, which the migration guide says are no longer supported from Mongoose 6 onward.

Q33's vague “pool size??” is interpreted as this code-specific configuration question and consolidated into Q14.

## Exact production pool size (Q27)

**Low-confidence gap:** no documentation can derive one production value from this repository. Required inputs are per-process concurrency, number of app instances, slow-query distribution, Mongo topology/connection limits, and observed checkout latency. Start with the driver/Mongoose default or an explicitly budgeted `maxPoolSize`, load-test, and change one variable at a time. Do not treat the current fallback of 5 as a documented recommendation.

## Multi-document transactions (Q18)

**Pinned verdict:** start a client session, call `session.withTransaction(async () => { ... })`, pass `{ session }` to every operation, `await` each operation, and end the session in `finally`. Avoid parallel operations inside one transaction.

The versioned [driver 5.9 `ClientSession.withTransaction()` API](https://mongodb.github.io/node-mongodb-native/5.9/classes/ClientSession.html#withTransaction) documents retry behavior and requires a Promise-returning callback whose operations are awaited. MongoDB Server 5.0 supports the required server features.

## Bulk upsert (Q19)

**Pinned verdict:** use collection-level `bulkWrite()` with deterministic `updateOne` models: a unique indexed identity filter, `$set` for mutable fields, `$setOnInsert` for creation-only fields, and `upsert: true`. Choose `ordered: false` only when independent records may continue after an error and result/error reporting is handled.

The versioned [driver 5.9 `Collection.bulkWrite()` API](https://mongodb.github.io/node-mongodb-native/5.9/classes/Collection.html#bulkWrite) lists `updateOne`/`updateMany` and returns a `BulkWriteResult`. Client-wide bulk writes in newer driver docs require later driver/server versions and do not apply here.

## Large-result pagination (Q21)

**Pinned verdict:** use keyset/range pagination over a stable, indexed, unique ordering rather than large `skip()` offsets. For recent orders, sort on `{ createdAt: -1, _id: -1 }`, encode both values in the cursor, and query the lexicographic “after” range. Create a matching compound index including the equality prefix such as `userId`.

The versioned [MongoDB 5.0 `cursor.skip()` page](https://www.mongodb.com/docs/v5.0/reference/method/cursor.skip/) says `skip()` scans from the beginning and gets slower as the offset grows; it recommends indexed range queries and a unique sort field.

**Repository check:** `server/src/repositories/orderRepo.js:20-21` sorts only by non-unique `createdAt` and returns a fixed first 25 rows. It is not a stable pagination implementation.

## Cursor streaming (Q22, Q36)

The versioned [driver 5.9 `FindCursor.stream()` API](https://mongodb.github.io/node-mongodb-native/5.9/classes/FindCursor.html#stream) returns a Node Readable/AsyncIterable. Transform each document to correctly escaped CSV and pipe it to the Express response with Node's Promise pipeline; close/destroy the cursor on client abort.

**Repository check:** the existing Mongoose order query calls `.lean()` and materializes at most 25 rows. It cannot power a large CSV export. Add a dedicated cursor/aggregation path rather than removing the safety limit from the list endpoint.

Related: [Node streaming](node.md#streaming-large-responses-q22-q36) and [Express streaming errors](express.md#streaming-error-boundary-q22-q36).

