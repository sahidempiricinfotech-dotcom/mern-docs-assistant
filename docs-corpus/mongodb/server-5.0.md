# MongoDB server 5.0

## $lookup and sharded targets

Applicable version: **MongoDB 5.0**.

Verdict: the `from` collection cannot be sharded. The versioned [MongoDB 5.0 `$lookup` page](https://www.mongodb.com/docs/v5.0/reference/operator/aggregation/lookup/) states that restriction. Starting in 5.1 the target may be sharded, as the [current history note](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/) records.

## Default write concern

Applicable version: **MongoDB 5.0**.

Verdict: `{ w: 'majority' }` is the implicit default for most replica sets and sharded clusters, but topology and a configured global default can change the result. The versioned [MongoDB 5.0 write concern reference](https://www.mongodb.com/docs/v5.0/reference/write-concern/#implicit-default-write-concern) is the governing source. Do not replace a deliberate application-level write concern with the word “default” without checking deployment topology and `setDefaultRWConcern`.

## Time-series collections and retention

Applicable version: **MongoDB 5.0**.

Verdict: create the collection with `db.createCollection(name, { timeseries: { timeField, metaField, granularity }, expireAfterSeconds })`. MongoDB 5.0 supports automatic removal through the collection-level `expireAfterSeconds` option; see the versioned [5.0 time-series TTL procedure](https://www.mongodb.com/docs/v5.0/core/timeseries/timeseries-automatic-removal/).

## `$in` cardinality

Applicable version: **MongoDB 5.0**.

Verdict: there is no documented fixed element-count maximum. The versioned [MongoDB 5.0 `$in` page](https://www.mongodb.com/docs/v5.0/reference/operator/query/in/) recommends limiting parameters to **tens** because hundreds can hurt performance. The practical command is also bounded by BSON size, but that does not make huge arrays operationally safe.

Stack Overflow check: the [accepted historical answer](https://stackoverflow.com/questions/5331549/what-is-the-maximum-number-of-parameters-passed-to-in-query-in-mongodb) was posted in 2013, has a high score, and bases its limit on MongoDB 2.4-era 16 MB BSON behavior. It is retained as historical context only. Official MongoDB 5.0 performance guidance wins; the old answer is not trusted for sizing a production query.
