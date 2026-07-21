# MongoDB driver 5.9.2 and Mongoose 7.6.13

## Promise-only driver calls

Applicable version: **MongoDB Node.js driver 5.9.2**.

Verdict: migrate callbacks to Promises. The official [v5.0.0 release notes](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.0.0) state that callbacks were removed in favor of a Promise-only public API. The repository's exact installed line is evidenced by the [v5.9.2 tag](https://github.com/mongodb/node-mongodb-native/tree/v5.9.2).

Code impact: [C06](../code-audit.md#c06-driver-5-call-uses-a-removed-callback-api).

## Connection pool sizing

Applicable version: **Mongoose 7.x / driver 5.9.2**.

Verdict: use `maxPoolSize`, not legacy `poolSize`. The [Mongoose 6 migration guide](https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options) records the `poolSize` to `maxPoolSize` rename and removal of `useNewUrlParser`, `useUnifiedTopology`, and `useFindAndModify`; those removals remain applicable to Mongoose 7. Mongoose 7.x documents a default maximum of 100 sockets and says to tune against concurrent operations, slow operations, app-instance count, and server connection limits; see [Mongoose 7 connections](https://mongoosejs.com/docs/7.x/docs/connections.html#connection-pools). There is no universal production number. Start with the default unless load tests or a connection budget justify a lower cap; compute `instances × maxPoolSize` before rollout.

Code impact: [C05](../code-audit.md#c05-mongoose-7-receives-removed-connection-options).

## Multi-document transactions

Applicable version: **driver 5.9.2 with MongoDB 5.0**.

Verdict: create a client session, execute all operations with that session, prefer `withTransaction()`, and end the session. The versioned driver API exposes [`MongoClient.startSession()`](https://mongodb.github.io/node-mongodb-native/5.9/classes/MongoClient.html#startSession) and [`ClientSession.withTransaction()`](https://mongodb.github.io/node-mongodb-native/5.9/classes/ClientSession.html#withTransaction). MongoDB 5.0 supports distributed transactions on replica sets and sharded clusters; see the versioned [MongoDB 5.0 transaction page](https://www.mongodb.com/docs/v5.0/core/transactions/). The repository's single standalone `mongo:5.0` container is therefore not sufficient for production-like transaction testing.

## Bulk upserts

Applicable version: **driver 5.9.2**.

Verdict: call collection `bulkWrite()` with deterministic `updateOne` models, each using a stable unique-key filter, `$set`/`$setOnInsert`, and `upsert: true`. The exact driver line documents [`Collection.bulkWrite()`](https://mongodb.github.io/node-mongodb-native/5.9/classes/Collection.html#bulkWrite) and the [`UpdateOneModel.upsert` flag](https://mongodb.github.io/node-mongodb-native/5.9/interfaces/UpdateOneModel.html). Create a matching [MongoDB 5.0 unique index](https://www.mongodb.com/docs/v5.0/core/index-unique/) so retries cannot create duplicates.

## Large-result pagination

Applicable version: **MongoDB 5.0 / driver 5.9.2**.

Verdict: for deep pages, use keyset/range pagination on a stable indexed sort such as `{ createdAt: -1, _id: -1 }`, carrying the last tuple as the next cursor. Avoid growing `skip()` offsets. The versioned [MongoDB 5.0 `cursor.skip()` page](https://www.mongodb.com/docs/v5.0/reference/method/cursor.skip/) says offsets get slower as they grow and gives a last-seen-value range-pagination procedure. The compound tuple is a repository-specific extension needed to make `createdAt` ties deterministic, so the answer remains Medium confidence.

Related: [Streaming HTTP and CSV](../cross-stack/http-and-streaming.md#streaming-http-and-csv).
