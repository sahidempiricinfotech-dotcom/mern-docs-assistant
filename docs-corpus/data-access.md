# Data access: MongoDB driver 5.9.2 and Mongoose 7.6.13

The server intentionally uses both the native driver and Mongoose, so every entry names which surface it applies to.

## Driver 5 callback removal

**Applies to:** `mongodb@5.9.2`. **Confidence: High.**

Driver 5's public API is Promise-only. The official [Node driver 5.0.0 release](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.0.0) says callback support was removed and moved to `mongodb-legacy`; 5.9.2 is in that 5.x range. The immutable [driver 5.9 API](https://mongodb.github.io/node-mongodb-native/5.9/) is patch-series evidence.

`server/src/repositories/userRepo.js:22-31` wraps `findOne(filter, callback)` in a Promise. In 5.9.2 that callback is not part of `findOne`; use `return db.collection('users').findOne({ email })`. This can manifest as a rejected call or a never-resolved wrapper. If it propagates through an unwrapped order-like route, [Express 4 async error handling](express-4.md#async-route-errors) is a separate necessary layer.

## Connection-pool sizing

**Applies to:** Mongoose 7.6.13 / driver 5.9.2. **Confidence: High** for option names and defaults; **Medium** for an exact production number.

Mongoose 7 passes `maxPoolSize`/`minPoolSize` to the driver. `maxPoolSize` is the maximum sockets per connection and defaults to 100 in the 7.x documentation. Size from measured concurrency, slow-operation mix, process/replica count, and the deployment's total connection cap; there is no correct global value such as five. Exact-tag source: [Mongoose 7.6.13 connections documentation](https://github.com/Automattic/mongoose/blob/7.6.13/docs/connections.md); rendered major-line context: [Mongoose 7.x connections](https://mongoosejs.com/docs/7.x/docs/connections.html). Related exact driver surface: [5.9 `MongoClientOptions`](https://mongodb.github.io/node-mongodb-native/5.9/interfaces/MongoClientOptions.html).

`server/src/db.js:11-14` is incompatible with the pinned Mongoose: `poolSize` must be `maxPoolSize`, and `useNewUrlParser`, `useUnifiedTopology`, and `useFindAndModify` are obsolete/removed options. The 7.x migration context is the [Mongoose migration guide](https://mongoosejs.com/docs/7.x/docs/migrating_to_7.html). This contradiction is the interpretation of vague “pool size??” questions: they refer to this connection block.

## Transactions and bulk writes

**Applies to:** driver 5.9.2 against MongoDB 5.0. **Confidence: High.**

For multi-document transactions, create a session, run operations with the same `{ session }`, and use `session.withTransaction()` (or explicit start/commit/abort with `try/finally`). The server must be a replica set or sharded cluster; the standalone `mongo:5.0` dev container cannot run multi-document transactions. Sources: [MongoDB v5.0 transactions](https://www.mongodb.com/docs/v5.0/core/transactions/) and immutable [driver 5.9 `ClientSession`](https://mongodb.github.io/node-mongodb-native/5.9/classes/ClientSession.html).

For customer sync, use a single `collection.bulkWrite()` with deterministic `updateOne` models such as `{ filter: { externalId }, update: { $set: mutable, $setOnInsert: createdFields }, upsert: true }`; use `ordered: false` only when independent writes may continue after an error, and inspect write errors. Source: immutable [driver 5.9 `Collection`](https://mongodb.github.io/node-mongodb-native/5.9/classes/Collection.html). A unique index on the external key is required to make concurrent upserts safe; index design remains data-model-specific.

## Streaming a Mongo cursor

**Applies to:** driver 5.9.2, Express 4.18.2, Node 18.19.0. **Confidence: Medium** because CSV schema/escaping is application-specific.

Obtain a native driver cursor, expose it as a readable/async iterable, transform each document through a real CSV serializer with a fixed column schema, and connect the chain to `res` with [Node 18 `pipeline()`](node-18.md#streaming-and-backpressure). Set `Content-Type: text/csv` and any download disposition before bytes are written; follow [Express streaming error handling](express-4.md#streaming-responses). Do not call `toArray()` first. Driver patch-series source: immutable [driver 5.9 cursor API](https://mongodb.github.io/node-mongodb-native/5.9/classes/FindCursor.html).

The current `orderRepo.js` uses Mongoose `find().limit(25).lean()` and no cursor/CSV Transform exists, so the question describes new code, not current streaming behaviour. The source, transform, and HTTP destination are cross-linked in all three entries.

