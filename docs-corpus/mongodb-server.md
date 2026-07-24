# MongoDB Server 5.0

Pinned evidence: `docker-compose.yml` selects the `mongo:5.0` family. The official 5.0 manual pages used below identify themselves as archived MongoDB Manual v5.0 pages. Because the image tag does not pin a patch/digest, patch-specific claims are not made.

## `$lookup` into a sharded collection (Q07)

**Pinned verdict:** no. On MongoDB 5.0, the `$lookup.from` collection must be unsharded. The versioned [5.0 `$lookup` page](https://www.mongodb.com/docs/v5.0/reference/operator/aggregation/lookup/) states that restriction.

**Upgrade delta:** sharded `from` support begins in MongoDB 5.1. Keep both facts; the 5.0 restriction is the landing answer for this repository.

## Default write concern (Q08)

**Pinned verdict:** starting in MongoDB 5.0 the implicit default is usually `{ w: "majority" }`, but it can fall back to `{ w: 1 }` for a replica set whose number of data-bearing voting members is not greater than the voting majority. A sharded cluster reads the default from the config server and implicitly uses majority unless a cluster-wide default was set.

Evidence: the versioned [MongoDB 5.0 write-concern page](https://www.mongodb.com/docs/v5.0/reference/write-concern/) contains the exact implicit-default formula. Do not reduce this answer to an unconditional “majority.”

## Time-series collection creation and retention (Q17, Q29)

**Pinned verdict:** MongoDB 5.0 supports time-series collections and supports `expireAfterSeconds` at collection creation for automatic retention. Use `db.createCollection(name, { timeseries: { timeField, metaField?, granularity? }, expireAfterSeconds })`, or the equivalent Node-driver `db.createCollection()` options.

Evidence: the versioned [MongoDB 5.0 `db.createCollection()` page](https://www.mongodb.com/docs/v5.0/reference/method/db.createcollection/) labels `timeseries` as added in 5.0 and documents `expireAfterSeconds` for time-series documents.

Retention deletion is asynchronous, so it is not a precise deletion scheduler. The repository currently creates no time-series collection.

## `$in` array size (Q23)

**Pinned verdict:** MongoDB 5.0 publishes no fixed maximum count of `$in` values. The query must fit within BSON/command constraints, including the 16 MiB BSON document limit, but performance becomes the practical limit much earlier.

The versioned [5.0 `$in` page](https://www.mongodb.com/docs/v5.0/reference/operator/query/in/) recommends limiting parameters to tens and warns that hundreds can hurt performance. The [5.0 limits page](https://www.mongodb.com/docs/v5.0/reference/limits/#mongodb-limit-BSON-Document-Size) documents the 16 MiB BSON document limit. Therefore “tens” is guidance, not a hard maximum.

Related: [bulk synchronization](data-access.md#bulk-upsert-q19).

