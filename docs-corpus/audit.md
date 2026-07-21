# Question-window audit

Window: 2026-06-15 through 2026-07-14 inclusive, interpreted in the spreadsheet's `Asia/Calcutta` timezone. The Questions tab contains Q01-Q36 in-window; QX1-QX3 are outside it. Classification uses the routing and confidence rules in [README](README.md#confidence-and-gap-rule).

| ID | Terminal state | Route | Confidence / target | Code check | Corpus entry |
| --- | --- | --- | --- | --- | --- |
| Q01 | answered | node/runtime | High | no `node-fetch` dependency | [global fetch](node-18.md#global-fetch) |
| Q02 | answered | node/runtime | High | `dotenv@16.3.1` is still required on Node 18 | [environment files](node-18.md#environment-files) |
| Q03 | answered | data-access/driver | High | contradiction: `userRepo.js:22-31` | [callbacks](data-access.md#driver-5-callback-removal) |
| Q04 | answered | express/errors | High | contradiction: `orders.js:7-19` | [async errors](express-4.md#async-route-errors) |
| Q05 | answered | react/forms | High | client is React 18.2 | [form Actions](react-18.md#form-actions-and-useactionstate) |
| Q06 | answered | node/test | High | runtime is 18.19.0 | [`node:test`](node-18.md#nodetest) |
| Q07 | answered | mongodb/aggregation | High | server is 5.0, not 5.1+ | [`$lookup`](mongodb-5.md#lookup-and-sharded-targets) |
| Q08 | answered | mongodb/write-concern | High | dev topology is standalone | [write concern](mongodb-5.md#default-write-concern) |
| Q09 | answered | node/modules | High | server is CommonJS | [CJS/ESM](node-18.md#commonjs-loading-of-esm) |
| Q10 | answered | react/suspense | High | `LiveFeed` is effect-driven | [Suspense data](react-18.md#suspense-and-data-fetching) |
| Q11 | answered | express/routing | High | corrected wrong `mongodb` hint | [route delta](express-4.md#route-pattern-delta) |
| Q12 | answered | react/effects | High | contradiction: `LiveFeed.jsx:18-19` | [Strict Mode](react-18.md#strict-mode-effects) |
| Q13 | answered | express/body | High | `app.js:15` agrees | [JSON bodies](express-4.md#json-request-bodies) |
| Q14 | answered | data-access/pool | Medium | contradiction: `db.js:11-14` | [pool sizing](data-access.md#connection-pool-sizing) |
| Q15 | gap | auth/password | Low / G-003 | contradiction: `users.js:10-11` and `userRepo.js:7-16` | [password gap](auth.md#password-storage) |
| Q16 | answered | auth/jwt | High | contradiction: `auth.js:11-20` | [JWT verification](auth.md#jwt-verification) |
| Q17 | answered | mongodb/timeseries | High | no collection setup in repo | [time series](mongodb-5.md#time-series-collections-and-retention) |
| Q18 | answered | data-access/transactions | High | dev container lacks replica set | [transactions](data-access.md#transactions-and-bulk-writes) |
| Q19 | answered | data-access/bulk | High | no sync path in repo | [bulk writes](data-access.md#transactions-and-bulk-writes) |
| Q20 | answered | express/cors + react/browser-fetch | Medium | server side is correct; client topology incomplete | [credentialed CORS](express-4.md#credentialed-cors) |
| Q21 | answered | mongodb/query | Medium | existing order list is fixed 25 only | [pagination](mongodb-5.md#large-result-pagination) |
| Q22 | answered | node/streams + express/response | High | no streaming route in repo | [Node pipeline](node-18.md#streaming-and-backpressure), [Express response](express-4.md#streaming-responses) |
| Q23 | answered | mongodb/query | Medium | no current `$in` query | [`$in`](mongodb-5.md#large-in-predicates) |
| Q24 | gap | react/suspense + testing | Low / G-001 | RTL is not pinned | [testing gap](react-18.md#suspense-testing-gap) |
| Q25 | gap | auth/token-storage | Low / G-004 | no client token store/cookie middleware | [token-location gap](auth.md#token-location-and-refresh-rotation) |
| Q26 | gap | auth/refresh | Low / G-002 | no rotation or revocation state | [rotation gap](auth.md#token-location-and-refresh-rotation) |
| Q27 | consolidated into Q14 | data-access/pool | Q14 | same pool decision | [pool sizing](data-access.md#connection-pool-sizing) |
| Q28 | answered | node/runtime | High | `.nvmrc` and container both 18.19.0 | [runtime matrix](README.md#runtime-matrix-and-deterministic-precedence) |
| Q29 | answered | mongodb/timeseries | High | server is exactly 5.0 | [retention](mongodb-5.md#time-series-collections-and-retention) |
| Q30 | consolidated into Q01 | node/runtime | Q01 | exact duplicate | [global fetch](node-18.md#global-fetch) |
| Q31 | consolidated into Q04 | express/errors | Q04 | interpretation: awaited Mongo rejection in `orders.js` | [async errors](express-4.md#async-route-errors) |
| Q32 | consolidated into Q16 | auth/jwt | Q16 | exact expiry subset | [JWT verification](auth.md#jwt-verification) |
| Q33 | consolidated into Q14 | data-access/pool | Q14 | interpreted from the sole repo pool setting | [pool sizing](data-access.md#connection-pool-sizing) |
| Q34 | consolidated into Q16 | auth/jwt | Q16 | symptom is the current `decode()` misuse | [JWT verification](auth.md#jwt-verification) |
| Q35 | gap | auth/session + data-access/store | Low / G-005 | packages and versions absent | [session gap](auth.md#mongo-backed-signed-sessions) |
| Q36 | answered | data-access/stream + node/streams + express/response | Medium | repository currently materializes only small order arrays | [cursor stream](data-access.md#streaming-a-mongo-cursor) |

## Count reconciliation

- In-window questions: **36**.
- Answered with High or Medium confidence: **25**.
- Consolidated into another row: **6**.
- Knowledge-gap rows: **5** (`G-001` to `G-005`).
- Unique repository contradiction locations/groups: **6**, enumerated in the [corpus index](README.md#known-code-contradictions).
- Total terminal states: `25 + 6 + 5 = 36`.

Every linked corpus entry above is present in this branch. Every external behaviour tag in those entries has either a versioned URL/immutable tag or is explicitly called `version-unverified`. The final Teams summary must use these reconciled counts and the live Sheet/PR URLs; if the sheet read-back differs, the sheet wins only after this file is corrected to match.

