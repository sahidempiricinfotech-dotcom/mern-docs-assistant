# MongoDB server 5.0 entries

The compose image is `mongo:5.0`, not a patch digest. Every `v5.0` manual link below is archived and explicitly marked unsupported by MongoDB; that is expected recency context for this pinned deployment. Inspected 2026-07-24. Driver APIs are in [data-access.md](data-access.md).

## M01: `$lookup` sharded foreign collection

**Applies to:** MongoDB server **5.0**; **5.1+ / 7.0** delta. **Evidence:** [v5.0 `$lookup`](https://www.mongodb.com/docs/v5.0/reference/operator/aggregation/lookup/) says the `from` collection cannot be sharded. The [v7.0 `$lookup` page](https://www.mongodb.com/docs/v7.0/reference/operator/aggregation/lookup/) explicitly says the sharded `from` capability starts in 5.1 and retains a transaction restriction. **Recency:** archived 5.0 and versioned 7.0 pages inspected 2026-07-24.

For the deployed 5.0 line, the foreign join target must be unsharded. Do not copy the 7.0 statement backward. On upgrading to at least 5.1, retest a sharded target and all transaction/performance restrictions; the later capability is not a blanket optimization guarantee.

## M02: implicit default write concern

**Applies to:** MongoDB **5.0**. **Evidence:** [v5.0 write concern](https://www.mongodb.com/docs/v5.0/reference/write-concern/#implicit-default-write-concern) and [5.0 compatibility changes](https://www.mongodb.com/docs/v5.0/release-notes/5.0-compatibility/#implicit-default-write-concern) explicitly identify the new implicit default and arbiter formula. **Recency:** archived versioned manual/release compatibility pages, inspected 2026-07-24.

Starting in 5.0 the implicit default is usually `{w: 'majority'}`. If arbiters exist and the number of data-bearing voting members is not greater than the voting majority, the implicit default is `{w: 1}`. A configured cluster-wide default or explicit operation/transaction concern also matters. Determine actual topology and `getDefaultRWConcern`; do not reduce this to an unconditional “majority” claim. The compose deployment is a standalone local instance, not proof of production replica-set topology.

## M03: time-series creation and retention

**Applies to:** MongoDB **5.0**. **Evidence:** [v5.0 time-series collections](https://www.mongodb.com/docs/v5.0/core/timeseries-collections/) requires explicit creation, `timeField`, and FCV 5.0; [v5.0 automatic removal](https://www.mongodb.com/docs/v5.0/core/timeseries/timeseries-automatic-removal/) documents collection-level `expireAfterSeconds`, `collMod`, and bucket removal. **Recency:** archived versioned pages, inspected 2026-07-24.

Create the collection explicitly with `timeseries: {timeField, metaField?, granularity?}` and a BSON date in the time field. A 5.0 time-series collection can set `expireAfterSeconds` at creation or change it with `collMod`. Expiration is asynchronous and buckets are removed after all contained measurements expire; it is not an exact-to-the-second deletion SLA. The repository currently has no metrics collection definition.

## M04: large-result pagination

**Applies to:** MongoDB **5.0** server semantics. **Evidence:** [v5.0 `cursor.skip()`](https://www.mongodb.com/docs/v5.0/reference/method/cursor.skip/) says range queries can use indexes and typically outperform `skip` as offset grows, and requires a unique sort component for consistency; it notes ObjectId is not strictly monotonic. **Recency:** archived versioned manual, inspected 2026-07-24.

For deep pagination, use an indexed keyset/range cursor with a stable unique tie-breaker, a bounded `limit`, and an opaque last-seen cursor. Avoid growing offsets. Choose a compound sort/index matching the product order and account for concurrent inserts/deletes. The native driver method syntax belongs to [D05](data-access.md#d05-cursor-streaming), which links back; this server entry is not a benchmark for the app's particular collection.

## M05: `$in` list size

**Applies to:** MongoDB **5.0**. **Evidence:** [v5.0 `$in`](https://www.mongodb.com/docs/v5.0/reference/operator/query/in/) recommends limiting parameters to tens and warns hundreds or more can hurt performance; [v5.0 limits](https://www.mongodb.com/docs/v5.0/reference/limits/#bson-document-size) states a 16 MB maximum BSON document size. **Recency:** archived versioned pages, inspected 2026-07-24.

There is no universal documented “maximum number of values” that can be stated independently of value size and command overhead. The practical recommendation is tens, index the queried field, batch/redesign and benchmark larger sets. BSON size is an outer size constraint, not a safe count formula. Do not turn the 16 MB document limit into a promised `$in` cardinality.

## M06: transaction deployment prerequisite

**Applies to:** MongoDB **5.0**. **Evidence:** [v5.0 transactions](https://www.mongodb.com/docs/v5.0/core/transactions/) and [production considerations](https://www.mongodb.com/docs/v5.0/core/transactions-production-consideration/) state standalone deployments do not support transactions and describe replica-set/sharded-cluster requirements and limits. **Recency:** archived versioned pages, inspected 2026-07-24.

Use a replica set or supported sharded cluster, an appropriate FCV, and a session. A single-document write is already atomic; use multi-document transactions only when the invariant needs them. The compose `mongo:5.0` service has no replica-set configuration, so the local deployment cannot exercise this pattern: [C08](code-audit.md#c08-standalone-compose-cannot-run-transactions). The driver procedure is [D03](data-access.md#d03-driver-transactions), which links back.
