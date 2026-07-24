# MongoDB Node driver 5.9 data access

**Applies to:** `mongodb-driver-5.9.2` with `mongodb-server-5.0`. **Retrieved:** 2026-07-24. Exact 5.9 TypeDoc and exact driver release notes provide the version evidence.

## Promise-only public API (Q03, Q31)

Driver 5 removed callback support. Use `await collection.findOne(filter)` or return its Promise. The repository passes a callback to `findOne()` inside a new Promise; driver 5 does not call it, so the outer Promise can remain pending and login can hang.

## Transactions (Q18)

Start a session, call `session.withTransaction(async () => { ... })`, and pass the same session to every operation. Await operations sequentially; do not use parallel operations such as `Promise.all()` in one transaction. Always end the session. The server must be a replica set or sharded cluster; the pinned standalone container does not qualify.

## Bulk upserts (Q19)

Use `collection.bulkWrite()` with `updateOne` models containing a selective filter, update operators such as `$set`/`$setOnInsert`, and `upsert: true`. Add a unique index for the external identity used in the filter. Use `ordered: false` only when operations are independent and partial success is acceptable, and batch large syncs to bound memory and command size.

## Cursors, pagination, and export streaming (Q21, Q36)

Driver cursors support async iteration and `stream()`. Avoid `toArray()` for unbounded results. For API pagination, combine the server's range-query guidance with a stable indexed sort. For CSV export, send the cursor stream through an escaping Transform and Node pipeline, and close the cursor when the client disconnects.

## Sources

- [Driver 5.0 release: callback support removed](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.0.0)
- [Driver 5.9.2 release](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.9.2)
- [Driver 5.9 Collection API](https://mongodb.github.io/node-mongodb-native/5.9/classes/Collection.html)
- [Driver 5.9 ClientSession API](https://mongodb.github.io/node-mongodb-native/5.9/classes/ClientSession.html#withTransaction)
- [Driver 5.9 cursor stream API](https://mongodb.github.io/node-mongodb-native/5.9/classes/AbstractCursor.html#stream)
- [MongoDB 5.0 transactions](https://www.mongodb.com/docs/v5.0/core/transactions/)
- [Pinned `userRepo.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/repositories/userRepo.js#L20)

Cross-links: [MongoDB server](server-5.0.md), [Node streams](../node/streams-and-crypto.md), [Express errors](../express/errors-routing-body.md), and [code audit](../CODE_AUDIT.md).
