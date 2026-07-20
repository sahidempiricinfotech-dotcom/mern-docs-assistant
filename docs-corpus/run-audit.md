# Run audit

Window: 2026-06-15 through 2026-07-14 inclusive, `Asia/Calcutta`.

## Counts

| State | Count |
| --- | ---: |
| Answered with High or Medium confidence | 28 |
| Consolidated into a canonical row | 6 |
| Knowledge gap (Low confidence) | 2 |
| Total | 36 |

Repository contradictions: **8**, enumerated as C01-C08 in [code-audit.md](code-audit.md).

## Per-question terminal state

| ID | State | Route / canonical row | Corpus entry |
| --- | --- | --- | --- |
| Q01 | answered | node | `node/runtime-and-apis.md#global-fetch` |
| Q02 | answered | node | `node/runtime-and-apis.md#environment-files` |
| Q03 | answered | data-access | `data-access/driver-and-mongoose.md#promise-only-driver-calls` |
| Q04 | answered | express | `express/api-behavior.md#async-error-forwarding` |
| Q05 | answered | react | `react/react-18.md#form-actions-and-useactionstate` |
| Q06 | answered | node | `node/runtime-and-apis.md#nodetest` |
| Q07 | answered | mongodb-server | `mongodb/server-5.0.md#lookup-and-sharded-targets` |
| Q08 | answered | mongodb-server | `mongodb/server-5.0.md#default-write-concern` |
| Q09 | answered | node | `node/runtime-and-apis.md#commonjs-and-esm` |
| Q10 | answered | react | `react/react-18.md#suspense-and-data-fetching` |
| Q11 | answered | express | `express/api-behavior.md#route-path-syntax` |
| Q12 | answered | react | `react/react-18.md#strictmode-effect-replay` |
| Q13 | answered | express | `express/api-behavior.md#json-request-bodies` |
| Q14 | answered | data-access | `data-access/driver-and-mongoose.md#connection-pool-sizing` |
| Q15 | answered | auth | `auth/authentication.md#password-hashing` |
| Q16 | answered | auth | `auth/authentication.md#jwt-verification-and-expiry` |
| Q17 | answered | mongodb-server | `mongodb/server-5.0.md#time-series-collections-and-retention` |
| Q18 | answered | data-access | `data-access/driver-and-mongoose.md#multi-document-transactions` |
| Q19 | answered | data-access | `data-access/driver-and-mongoose.md#bulk-upserts` |
| Q20 | answered | cross-stack | `cross-stack/http-and-streaming.md#credentialed-cors` |
| Q21 | answered | data-access | `data-access/driver-and-mongoose.md#large-result-pagination` |
| Q22 | answered | cross-stack | `cross-stack/http-and-streaming.md#streaming-http-and-csv` |
| Q23 | answered | mongodb-server | `mongodb/server-5.0.md#in-cardinality` |
| Q24 | gap | G-001 | `react/react-18.md#suspense-testing` |
| Q25 | answered | auth + cross-stack | `auth/authentication.md#browser-token-location` |
| Q26 | gap | G-002 | `auth/authentication.md#refresh-token-rotation` |
| Q27 | consolidated | Q14 | canonical pool-sizing answer |
| Q28 | answered | node | `versions.md#nodejs` |
| Q29 | answered | mongodb-server | `mongodb/server-5.0.md#time-series-collections-and-retention` |
| Q30 | consolidated | Q01 | canonical fetch answer |
| Q31 | consolidated | Q04 | canonical Express 4 error answer |
| Q32 | consolidated | Q16 | canonical JWT verification answer |
| Q33 | consolidated | Q14 | interpreted as the repository's Mongoose pool question |
| Q34 | consolidated | Q16 | canonical JWT verification answer |
| Q35 | answered | auth + data-access | `auth/authentication.md#signed-sessions-stored-in-mongodb` |
| Q36 | answered | data-access + express + node | `cross-stack/http-and-streaming.md#streaming-http-and-csv` |

## Invariants

- All 36 in-window rows have exactly one terminal state.
- Every corpus behavior section has a version claim backed by a versioned URL/tag/release, or is explicitly `version-unverified`.
- Every corpus path cited in this ledger exists.
- Counts in this file are the canonical counts for the Sheet and final Teams message.
