# Question coverage audit

Window: **2026-06-15 00:00 through 2026-07-14 23:59:59 Asia/Calcutta**, inclusive. The sheet stores date strings in an Asia/Calcutta spreadsheet. `QX1` (06-14), `QX2` (05-30), `QX3` (07-15), and `QX4` (08-02) are excluded. The canonical/duplicate rule and confidence thresholds are in [README](README.md#deterministic-routing-and-consolidation).

| ID | Terminal state | Route / corpus entry | Confidence or pointer |
| --- | --- | --- | --- |
| Q01 | answered | [N01](node.md#n01-global-fetch) | High |
| Q02 | answered | [N02](node.md#n02-env-file-loading) | High |
| Q03 | answered | [D01](data-access.md#d01-driver-5-callback-removal) | High; C04 |
| Q04 | answered | [E01](express.md#e01-async-errors-in-express-4-and-5) | High; C05 |
| Q05 | answered | [R01](react.md#r01-react-19-actions-are-not-react-18) | High |
| Q06 | answered | [N03](node.md#n03-node-test-stability) | High |
| Q07 | answered | [M01](mongodb-server.md#m01-lookup-sharded-foreign-collection) | High |
| Q08 | answered | [M02](mongodb-server.md#m02-implicit-default-write-concern) | High |
| Q09 | answered | [N04](node.md#n04-commonjs-to-esm) | High |
| Q10 | answered | [R02](react.md#r02-suspense-data-fetching-in-react-18) | High |
| Q11 | answered | [E02](express.md#e02-route-pattern-migration) | High; hint corrected |
| Q12 | answered | [R03](react.md#r03-strictmode-effect-cleanup) | High; C07 |
| Q13 | answered | [E03](express.md#e03-json-body-parsing) | High |
| Q14 | answered | [D02](data-access.md#d02-mongoose-and-driver-pools) | High; C06 |
| Q15 | answered | [A01](auth.md#a01-password-storage-and-login), [N06](node.md#n06-password-kdf-primitive) | Medium; C03 |
| Q16 | answered | [A02](auth.md#a02-jwt-verification-and-expiry) | High; C01, C02 |
| Q17 | answered | [M03](mongodb-server.md#m03-time-series-creation-and-retention) | High |
| Q18 | answered | [D03](data-access.md#d03-driver-transactions), [M06](mongodb-server.md#m06-transaction-deployment-prerequisite) | High; C08 |
| Q19 | answered | [D04](data-access.md#d04-bulk-upsert) | High |
| Q20 | answered | [E04](express.md#e04-credentialed-cors-server-side), [R05](react.md#r05-credentialed-browser-fetch-and-cors) | Medium; hint corrected |
| Q21 | answered | [M04](mongodb-server.md#m04-large-result-pagination) | Medium |
| Q22 | answered | [N05](node.md#n05-streams-and-http-pipelines), [E06](express.md#e06-streaming-an-http-response) | High |
| Q23 | answered | [M05](mongodb-server.md#m05-in-list-size) | Medium |
| Q24 | gap G-001 | [R04](react.md#r04-testing-a-suspense-boundary) | Low |
| Q25 | answered | [A03](auth.md#a03-browser-token-storage) | Medium |
| Q26 | gap G-002 | [A04](auth.md#a04-refresh-token-rotation) | Low |
| Q27 | gap G-003 | [D02](data-access.md#d02-mongoose-and-driver-pools) | Low; C06 |
| Q28 | answered | [N07](node.md#n07-runtime-alignment) | High |
| Q29 | answered | [M03](mongodb-server.md#m03-time-series-creation-and-retention) | High |
| Q30 | consolidated | [N01](node.md#n01-global-fetch) | Q01 |
| Q31 | consolidated | [E01](express.md#e01-async-errors-in-express-4-and-5), [D01](data-access.md#d01-driver-5-callback-removal) | Q04; C04/C05 interpretation |
| Q32 | consolidated | [A02](auth.md#a02-jwt-verification-and-expiry) | Q16 |
| Q33 | consolidated | [D02](data-access.md#d02-mongoose-and-driver-pools) | Q14; interpretation stated |
| Q34 | consolidated | [A02](auth.md#a02-jwt-verification-and-expiry) | Q16; C01 interpretation |
| Q35 | gap G-004 | [E05](express.md#e05-session-middleware-boundary), [D06](data-access.md#d06-session-store-compatibility), [A05](auth.md#a05-signed-session-cookie-and-mongo-store) | Low |
| Q36 | answered | [D05](data-access.md#d05-cursor-streaming), [N05](node.md#n05-streams-and-http-pipelines), [E06](express.md#e06-streaming-an-http-response) | Medium |

**Totals:** 36 = 27 answered + 5 consolidated + 4 gaps. The gap topic frequency/impact scores are G-003 = 9, G-002 = 3, G-004 = 3, G-001 = 2. The discrepancy count is 8 distinct IDs [C01–C08](code-audit.md). No out-of-window row is counted or modified by this run.
