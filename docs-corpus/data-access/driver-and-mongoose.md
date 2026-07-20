# MongoDB driver 5.9.2 and Mongoose 7.6.13

## Promise-only driver calls

Applicable version: **MongoDB Node.js driver 5.9.2**.

Verdict: migrate callbacks to Promises. The driver's [upgrade guide](https://www.mongodb.com/docs/drivers/node/current/reference/upgrade/) records callback removal as a version 5.0 breaking change; the repository's exact line is evidenced by the [v5.9.2 tag](https://github.com/mongodb/node-mongodb-native/tree/v5.9.2).

Code impact: [C06](../code-audit.md#c06-driver-5-call-uses-a-removed-callback-api).

## Connection pool sizing

Applicable version: **Mongoose 7.x / driver 5.9.2**.

Verdict: use `maxPoolSize`, not legacy `poolSize`. Mongoose 7.x documents a default maximum of 100 sockets and says to tune against concurrent operations, slow operations, app-instance count, and server connection limits; see [Mongoose 7 connections](https://mongoosejs.com/docs/7.x/docs/connections.html#connection-pools). There is no universal production number. Start with the default unless load tests or a connection budget justify a lower cap; compute `instances × maxPoolSize` before rollout.

Code impact: [C05](../code-audit.md#c05-mongoose-7-receives-removed-connection-options).

## Multi-document transactions

Applicable version: **driver 5.9.2 with MongoDB 5.0**.

Verdict: create a client session, execute all operations with that session, prefer `withTransaction()`, and end the session. Transactions require a replica set or sharded deployment; the single standalone `mongo:5.0` container in this repository is not sufficient for production-like transaction testing. The [driver transaction guide](https://www.mongodb.com/docs/drivers/node/current/crud/transactions/) states the API and server 4.0+ requirement; exact driver applicability is anchored by tag 5.9.2.

## Bulk upserts

Applicable version: **driver 5.9.2**.

Verdict: call collection `bulkWrite()` with deterministic `updateOne` models, each using a stable unique-key filter, `$set`/`$setOnInsert`, and `upsert: true`. Create a matching unique index so retries cannot create duplicates. Sources: [driver bulk operations](https://www.mongodb.com/docs/drivers/node/current/crud/bulk-write/), exact [v5.9.2 tag](https://github.com/mongodb/node-mongodb-native/tree/v5.9.2), and [MongoDB 5.0 unique indexes](https://www.mongodb.com/docs/v5.0/core/index-unique/).

## Large-result pagination

Applicable version: **MongoDB 5.0 / driver 5.9.2**.

Verdict: for deep pages, use keyset/range pagination on a stable indexed sort such as `{ createdAt: -1, _id: -1 }`, carrying the last tuple as the next cursor. Avoid growing `skip()` offsets. The operational recipe is inferred from MongoDB cursor batching plus index ordering and is Medium confidence; the driver [cursor guide](https://www.mongodb.com/docs/drivers/node/current/crud/query/cursor/) is current, with applicability anchored by the unchanged API in the exact 5.9.2 tag.

Related: [Streaming HTTP and CSV](../cross-stack/http-and-streaming.md#streaming-http-and-csv).
