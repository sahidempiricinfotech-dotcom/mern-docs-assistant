# MongoDB server 5.0

`docker-compose.yml` uses `mongo:5.0`; answers therefore use the archived MongoDB Manual v5.0 even though it is no longer supported. The `/docs/v5.0/` URL and rendered “Manual v5.0” title are the version evidence.

## `$lookup` and sharded targets

**Applies to:** MongoDB 5.0. **Upgrade delta:** 5.1+ (including 7.0). **Confidence: High.**

In 5.0, `$lookup.from` must be an **unsharded** collection. Source: [MongoDB Manual v5.0 `$lookup`](https://www.mongodb.com/docs/v5.0/reference/operator/aggregation/lookup/), which says both that the join is to an unsharded collection and that `from` cannot be sharded.

Do not replace that page with the 7.0 wording. [MongoDB Manual v7.0 `$lookup`](https://www.mongodb.com/docs/v7.0/reference/operator/aggregation/lookup/) explicitly says the stage changed in 5.1 and that starting in 5.1 it may target sharded collections. On the day the server becomes 5.1+, reassess query plan/performance; until then a sharded `from` collection is unsupported. The 5.0 and 7.0 entries link to each other here rather than choosing one “current” winner.

## Default write concern

**Applies to:** MongoDB 5.0; deployment topology matters. **Confidence: High.**

The implicit default is normally `{ w: "majority" }`, but MongoDB 5.0 documents an exception for a replica set with an arbiter where the number of non-arbiters is not greater than the majority of voting members; that topology falls back to `{ w: 1 }`. A standalone also cannot supply replica-set majority durability. Do not answer only “majority” without the topology qualification. Source: [MongoDB v5.0 implicit default write concern](https://www.mongodb.com/docs/v5.0/reference/write-concern/#implicit-default-write-concern), versioned manual.

`docker-compose.yml` starts a single `mongod` and does not configure a replica set, so production durability cannot be inferred from this development file.

## Time-series collections and retention

**Applies to:** MongoDB 5.0. **Confidence: High.**

Create the collection explicitly with `db.createCollection(name, { timeseries: { timeField, metaField?, granularity? }, expireAfterSeconds? })`. The `timeField` is required and must contain BSON dates; `metaField` labels a series and should change rarely. MongoDB automatically deletes expired time-series documents when `expireAfterSeconds` is set. Source: [MongoDB v5.0 `db.createCollection()`](https://www.mongodb.com/docs/v5.0/reference/method/db.createCollection/), whose syntax marks `timeseries` as added in 5.0 and documents `expireAfterSeconds` for time-series collections.

This directly answers retention on 5.0; later time-series options such as fields the same page labels as added in 5.3 or 6.0 must not be copied back.

## Large `$in` predicates

**Applies to:** MongoDB 5.0. **Confidence: Medium.**

There is no small documented hard “number of values” ceiling. The query document must still fit BSON limits, and the 5.0 manual recommends limiting `$in` to tens of values because hundreds or more can hurt performance; index the compared field. Source: [MongoDB v5.0 `$in`](https://www.mongodb.com/docs/v5.0/reference/operator/query/in/), a versioned operator page. The exact acceptable count is workload/index dependent, so the reproducible answer is “no fixed count in the operator contract; benchmark and batch after tens,” not a fabricated maximum.

## Large-result pagination

**Applies to:** MongoDB 5.0. **Confidence: Medium.**

For deep pages, prefer a range/keyset query over a growing `skip`: choose a unique, indexed, stable sort key, request values after/before the last returned key, sort in that direction, and `limit()` the page. `_id` can be used only with its documented non-monotonic caveats; a compound `(createdAt, _id)` key is safer when timestamps can tie. Source: [MongoDB v5.0 `cursor.skip()` range-query guidance](https://www.mongodb.com/docs/v5.0/reference/method/cursor.skip/#using-range-queries), which says `skip()` becomes slower as the offset grows and demonstrates range pagination.

The repository's `orderRepo.js:18-22` has only a fixed most-recent 25 query, not a client-driven pagination contract. Add an index matching whichever cursor/sort contract is selected. Driver mechanics continue in [data access](data-access.md#transactions-and-bulk-writes).

