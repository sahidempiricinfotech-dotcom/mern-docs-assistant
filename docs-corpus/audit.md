# Run audit

Run date: 2026-07-24 IST. Window: 2026-06-15 through 2026-07-14 inclusive.

## State accounting

| State | Count |
| --- | ---: |
| Answered with sources and confidence | 28 |
| Consolidated into a canonical row | 5 |
| Knowledge gap | 3 |
| **Total** | **36** |

The three gap rows are Q24, Q26, and Q27. Existing gap rows G-001/G-002 are updated in place; G-003 is added for Q27.

## Question-by-question terminal state

| ID | State | Corpus entry / target |
| --- | --- | --- |
| Q01 | Answered | `node.md#global-fetch-q01-q30` |
| Q02 | Answered | `node.md#env-loading-q02` |
| Q03 | Answered | `data-access.md#promise-only-driver-api-q03` |
| Q04 | Answered (corrected stale answer) | `express.md#async-route-errors-q04-q31` |
| Q05 | Answered | `react.md#form-actions-and-useactionstate-q05` |
| Q06 | Answered | `node.md#nodetest-q06` |
| Q07 | Answered | `mongodb-server.md#lookup-into-a-sharded-collection-q07` |
| Q08 | Answered | `mongodb-server.md#default-write-concern-q08` |
| Q09 | Answered | `node.md#commonjs-loading-esm-q09` |
| Q10 | Answered | `react.md#suspense-data-fetching-q10` |
| Q11 | Answered; category hint corrected | `express.md#route-path-syntax-q11` |
| Q12 | Answered | `react.md#strictmode-effects-q12` |
| Q13 | Answered | `express.md#json-request-bodies-q13` |
| Q14 | Answered | `data-access.md#mongoose-pool-configuration-q14-q33` |
| Q15 | Answered | `auth.md#password-hashing-q15` |
| Q16 | Answered (corrected stale answer) | `auth.md#jwt-verification-q16-q32-q34` |
| Q17 | Answered | `mongodb-server.md#time-series-collection-creation-and-retention-q17-q29` |
| Q18 | Answered | `data-access.md#multi-document-transactions-q18` |
| Q19 | Answered | `data-access.md#bulk-upsert-q19` |
| Q20 | Answered | `express.md#credentialed-cors-q20` |
| Q21 | Answered | `data-access.md#large-result-pagination-q21` |
| Q22 | Answered | `node.md#streaming-large-responses-q22-q36` |
| Q23 | Answered | `mongodb-server.md#in-array-size-q23` |
| Q24 | Gap G-001 | `react.md#suspense-component-testing-q24` |
| Q25 | Answered | `auth.md#browser-token-storage-q25` |
| Q26 | Gap G-002 | `auth.md#refresh-token-rotation-q26` |
| Q27 | Gap G-003 | `data-access.md#exact-production-pool-size-q27` |
| Q28 | Answered | `node.md#exact-runtime-alignment-q28` |
| Q29 | Answered | `mongodb-server.md#time-series-collection-creation-and-retention-q17-q29` |
| Q30 | Consolidated | Q01 |
| Q31 | Consolidated | Q04 |
| Q32 | Consolidated | Q16 |
| Q33 | Consolidated | Q14 |
| Q34 | Consolidated | Q16 |
| Q35 | Answered | `auth.md#signed-session-cookies-with-mongo-q35` |
| Q36 | Answered | `data-access.md#cursor-streaming-q22-q36` |

## Version-tag audit

- Every corpus page links to [versions.md](versions.md) directly or relies on its pinned inventory.
- MongoDB server claims use versioned `/docs/v5.0/` URLs. The mutable image patch is explicitly unverified.
- MongoDB driver 5.9 claims use `mongodb.github.io/node-mongodb-native/5.9` API pages; redirected `current` guides are not used as sole version evidence.
- React 18 claims use `18.react.dev`; React 19 is labeled upgrade-only.
- Express 4 is the landing answer; Express 5 behaviors are labeled upgrade deltas.
- Node 18 claims use `latest-v18.x` documentation plus the exact 18.19.0 release page. Later `.env` behavior is labeled Node 20.6+.
- The session-store compatibility claim is explicitly `version-unverified` until a store package is pinned.

## Code contradictions

Ten distinct code locations/behaviors conflict with the pinned documentation or the security source used by the corresponding answer:

1. `server/src/repositories/userRepo.js:23` uses a callback with Promise-only driver 5.9 `findOne()`.
2. `server/src/routes/orders.js:7` is a bare async Express 4 handler.
3. `server/src/routes/orders.js:12` is a second bare async Express 4 handler.
4. `client/src/components/LiveFeed.jsx:18` creates an interval without Effect cleanup under StrictMode.
5. `server/src/db.js:11-13` passes Mongoose options removed from Mongoose 6+.
6. `server/src/db.js:14` uses obsolete `poolSize` instead of `maxPoolSize`.
7. `server/src/auth.js:11` decodes rather than verifies JWTs.
8. `server/src/auth.js:29` falls back to a known JWT signing secret.
9. `server/src/repositories/userRepo.js:12` trusts and persists a caller-supplied password hash instead of hashing at the server boundary.
10. `client/src/components/LiveFeed.jsx:8` omits `credentials: 'include'`; this contradicts the requested credentialed cross-origin flow even though the server enables credentials.

## Citation existence audit

Every Sheet source uses one of the corpus anchors listed in the terminal-state table plus the primary links present in that entry. All listed corpus files are part of this pull request. No answer cites a missing file.

