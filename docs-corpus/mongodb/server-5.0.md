# MongoDB server 5.0 behavior

**Applies to:** `mongodb-server-5.0`. **Retrieved:** 2026-07-24 from the archived 5.0 manual. Current documentation is used only where it states the version that introduced an upgrade feature.

## `$lookup` into a sharded collection (Q07)

No on MongoDB 5.0: the 5.0 `$lookup` reference says the `from` collection cannot be sharded. MongoDB 5.1 introduces sharded `from` collections. Keep both facts; the 5.0 verdict is first because it matches production.

## Implicit write concern (Q08)

Starting in 5.0, the implicit default is `{ w: "majority" }` except an arbiter topology where the number of data-bearing voting members is not greater than the voting majority, in which case it is `{ w: 1 }`. Sharded clusters obtain it from config servers and are implicitly majority. For critical writes, configure and test an explicit policy instead of relying on a topology-dependent shorthand.

## Time-series collections and retention (Q17, Q29)

Create a 5.0 time-series collection with `db.createCollection(name, { timeseries: { timeField, metaField?, granularity? }, expireAfterSeconds? })`. `timeField` is required. MongoDB 5.0 supports `expireAfterSeconds` for time-series retention at creation and via `collMod`.

Expiration is not exact scheduling: documents remain until their entire bucket is expired and the background task runs (nominally every 60 seconds). Do not promise deletion at the exact threshold.

## Transactions and topology (Q18)

MongoDB 5.0 supports multi-document transactions on replica sets and sharded clusters. The repository's development container starts one standalone `mongod`, so the requested transaction recipe cannot run in that topology. Convert local/test MongoDB to a replica set before treating the driver example as executable.

## `$in` array size (Q23)

The 5.0 manual publishes no fixed count ceiling. It recommends limiting parameters to **tens** and warns that hundreds or more can hurt performance. Therefore do not create a false “maximum N” contract; enforce an application limit based on measured query shape, index use, and request-size policy.

## Large-result pagination (Q21)

Large offsets make `skip()` slower because the server scans from the beginning. Use a range/keyset query on a unique indexed ordering key, preferably a deterministic compound key such as `(createdAt, _id)`, and carry the last seen pair into the next page.

## Sources

- [MongoDB 5.0 `$lookup`](https://www.mongodb.com/docs/v5.0/reference/operator/aggregation/lookup/)
- [Current `$lookup` page: sharded support starts in 5.1](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/)
- [MongoDB 5.0 write concern](https://www.mongodb.com/docs/v5.0/reference/write-concern/)
- [MongoDB 5.0 time-series automatic removal](https://www.mongodb.com/docs/v5.0/core/timeseries/timeseries-automatic-removal/)
- [MongoDB 5.0 transactions](https://www.mongodb.com/docs/v5.0/core/transactions/)
- [MongoDB 5.0 `$in`](https://www.mongodb.com/docs/v5.0/reference/operator/query/in/)
- [MongoDB 5.0 `cursor.skip()` and range pagination](https://www.mongodb.com/docs/v5.0/reference/method/cursor.skip/)
- [Pinned MongoDB container](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/docker-compose.yml#L5)

Cross-links: [driver data access](driver-5.9.md), [pooling](pooling-mongoose7.md), and [code audit](../CODE_AUDIT.md).
