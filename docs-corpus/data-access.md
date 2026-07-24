# MongoDB driver and Mongoose entries

## D01: driver 5 callback removal

**Applies to:** MongoDB Node driver **5.x**, pinned **5.9.2**. **Evidence:** the [v5.0.0 release notes](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.0.0) explicitly remove callbacks in favor of a Promise-only public API; the [versioned 5.9 Collection API](https://mongodb.github.io/node-mongodb-native/5.9/classes/Collection.html#findOne) exposes `findOne(): Promise`; the [tagged v5.9.2 README](https://github.com/mongodb/node-mongodb-native/blob/v5.9.2/README.md) links the official API and v5 upgrade guide. **Recency:** immutable release/tag and minor-line API, inspected 2026-07-24. The API URL proves 5.9, not an invented patch-specific behavioral difference.

Use `await collection.findOne(filter)` and normal Promise rejection handling. [`userRepo.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/repositories/userRepo.js#L22) wraps a callback-style `findOne` in a new Promise; driver 5 does not support that callback, so the wrapper can remain unsettled and the login request hang: [C04](code-audit.md#c04-native-driver-callback-wrapper). Route-level rejected promises still require Express 4 handling [E01](express.md#e01-async-errors-in-express-4-and-5), which links back.

## D02: Mongoose and driver pools

**Applies to:** Mongoose **7.x**, pinned **7.6.13**, and driver **5.9.2**. **Evidence:** [Mongoose 7.x connections](https://mongoosejs.com/docs/7.x/docs/connections.html#connection-pools) documents `maxPoolSize` and its default; [Mongoose migration to 6](https://mongoosejs.com/docs/7.x/docs/migrating_to_6.html#no-more-deprecation-warning-options) says `poolSize` became `maxPoolSize` and `useNewUrlParser`, `useUnifiedTopology`, and `useFindAndModify` are no longer supported; the [7.6.13 release tag](https://github.com/Automattic/mongoose/releases/tag/7.6.13) corroborates the exact package line. The [driver 5.9 MongoClientOptions API](https://mongodb.github.io/node-mongodb-native/5.9/interfaces/MongoClientOptions.html#maxPoolSize) defines `maxPoolSize`. **Recency:** major-line documentation and immutable release tag, inspected 2026-07-24.

Use `maxPoolSize`, not legacy `poolSize`; remove the old deprecation-warning options. [`db.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/db.js#L9) passes all four stale options and also opens a separate native `MongoClient`, creating separate pools: [C06](code-audit.md#c06-mongoose-legacy-options-and-two-pools). An exact production number is not in documentation: measure concurrency, query latency, server/Atlas connection limits, process/replica count, and both clients. **Q27 is Low / G-003**, while Q14 answers the option spelling and Q33 consolidates to it.

## D03: driver transactions

**Applies to:** Node driver **5.9** API, pinned **5.9.2**, against MongoDB **5.0**. **Evidence:** [5.9 `ClientSession.withTransaction`](https://mongodb.github.io/node-mongodb-native/5.9/classes/ClientSession.html#withTransaction) requires a returned/awaited Promise and retries eligible transaction/commit errors; [M06](mongodb-server.md#m06-transaction-deployment-prerequisite) supplies the versioned server prerequisite. **Recency:** versioned minor API and archived server manual, inspected 2026-07-24.

Start a session from the client, use `withTransaction(async () => { ... })`, pass the same session to each operation, await each operation, avoid parallel operations in a transaction, and end the session. Keep side effects outside retryable callback logic or make them idempotent. The compose standalone prerequisite fails locally ([C08](code-audit.md#c08-standalone-compose-cannot-run-transactions)); do not present an untested transaction as working there. [M06](mongodb-server.md#m06-transaction-deployment-prerequisite) links back.

## D04: bulk upsert

**Applies to:** Node driver **5.9** API, pinned **5.9.2**, MongoDB server **5.0**. **Evidence:** [5.9 Collection.bulkWrite](https://mongodb.github.io/node-mongodb-native/5.9/classes/Collection.html#bulkWrite), [5.9 UpdateOneModel](https://mongodb.github.io/node-mongodb-native/5.9/interfaces/UpdateOneModel.html), [5.9 BulkWriteOptions](https://mongodb.github.io/node-mongodb-native/5.9/interfaces/BulkWriteOptions.html), and the [v5.0 bulkWrite manual](https://www.mongodb.com/docs/v5.0/reference/method/db.collection.bulkWrite/). [v5.0 unique indexes](https://www.mongodb.com/docs/v5.0/core/index-unique/) establish the uniqueness constraint. **Recency:** versioned minor API and archived server pages, inspected 2026-07-24.

Batch `updateOne` models with a stable business-key `filter`, `$set`/`$setOnInsert`, and `upsert: true`; enforce that key with a suitable unique index to avoid competing inserts. Choose ordered versus unordered semantics intentionally, bound batch size, inspect counts/errors, and make retry behavior idempotent. Do not replace the whole document accidentally or claim unordered operations are atomic as a batch.

## D05: cursor streaming

**Applies to:** driver **5.9** API, pinned **5.9.2**, Node **18.19.0**. **Evidence:** [5.9 FindCursor API](https://mongodb.github.io/node-mongodb-native/5.9/classes/FindCursor.html#stream) exposes `stream(): Readable & AsyncIterable` and warns `toArray` requires enough memory; [N05](node.md#n05-streams-and-http-pipelines) supplies versioned pipeline semantics. **Recency:** versioned API and exact Node release docs, inspected 2026-07-24.

For large exports, project only required fields, iterate/stream the cursor, transform each object to a correctly escaped CSV row, and pipe to the HTTP response with backpressure and cleanup on failure/disconnect. Do not materialize the full cursor. Validate CSV formula-injection policy and encoding in an implementation review; the repository does not contain an export route. See [E06](express.md#e06-streaming-an-http-response) and [N05](node.md#n05-streams-and-http-pipelines), which link back. Keyset pagination is the distinct server query pattern [M04](mongodb-server.md#m04-large-result-pagination).

## D06: session-store compatibility

**Applies to:** **`version-unverified`** for this app; no session-store package is pinned. **Evidence:** the living [`connect-mongo` README](https://github.com/jdesboeufs/connect-mongo) shows a Mongo-backed store and describes version/migration concerns; the living [`express-session` README](https://github.com/expressjs/session) defines store semantics. **Recency:** inspected 2026-07-24, not an immutable selected release pair.

Select and pin mutually compatible versions against Node 18, Express 4, and the chosen Mongo driver, then test TTL, touch/resave, connection ownership, shutdown, and migration. Current README syntax is not proof of compatibility with the repository's driver 5.9.2. This is part of **G-004**. See [E05](express.md#e05-session-middleware-boundary) and [A05](auth.md#a05-signed-session-cookie-and-mongo-store); both link back.
