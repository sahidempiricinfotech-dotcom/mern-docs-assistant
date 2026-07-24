# Question routing and terminal-state audit

Window: 2026-06-15 through 2026-07-14 inclusive, IST. Total rows: **36**.

| ID | Route | Corpus entry | State | Canonical/gap |
| --- | --- | --- | --- | --- |
| Q01 | node | [runtime](node/runtime-and-modules.md) | answered | — |
| Q02 | node | [runtime](node/runtime-and-modules.md) | answered | — |
| Q03 | mongodb/data-access | [driver](mongodb/driver-5.9.md) | answered | — |
| Q04 | express | [errors](express/errors-routing-body.md) | answered | — |
| Q05 | react | [React 18](react/react-18-behavior.md) | answered | — |
| Q06 | node | [runtime](node/runtime-and-modules.md) | answered | — |
| Q07 | mongodb/server | [server 5.0](mongodb/server-5.0.md) | answered | — |
| Q08 | mongodb/server | [server 5.0](mongodb/server-5.0.md) | answered | — |
| Q09 | node | [runtime](node/runtime-and-modules.md) | answered | — |
| Q10 | react | [React 18](react/react-18-behavior.md) | answered | — |
| Q11 | express | [errors/routes](express/errors-routing-body.md) | answered | — |
| Q12 | react | [React 18](react/react-18-behavior.md) | answered | — |
| Q13 | express | [errors/body](express/errors-routing-body.md) | answered | — |
| Q14 | mongodb/data-access | [pooling](mongodb/pooling-mongoose7.md) | answered | canonical for Q27/Q33 |
| Q15 | auth, node | [passwords](auth/passwords-jwt-storage.md) | answered | — |
| Q16 | auth | [JWT](auth/passwords-jwt-storage.md) | answered | canonical for Q32/Q34 |
| Q17 | mongodb/server | [server 5.0](mongodb/server-5.0.md) | answered | — |
| Q18 | mongodb/data-access | [driver](mongodb/driver-5.9.md), [server](mongodb/server-5.0.md) | answered | — |
| Q19 | mongodb/data-access | [driver](mongodb/driver-5.9.md) | answered | — |
| Q20 | auth, express, react | [CORS](express/cors-sessions.md) | answered | — |
| Q21 | mongodb/data-access | [server](mongodb/server-5.0.md), [driver](mongodb/driver-5.9.md) | answered | — |
| Q22 | express, node | [streams](node/streams-and-crypto.md), [errors](express/errors-routing-body.md) | answered | — |
| Q23 | mongodb/server | [server 5.0](mongodb/server-5.0.md) | answered (Medium) | — |
| Q24 | react | [testing gap](react/suspense-testing.md) | gap | G-001 |
| Q25 | auth, express | [JWT/storage](auth/passwords-jwt-storage.md) | answered | — |
| Q26 | auth | [rotation gap](auth/refresh-token-rotation.md) | gap | G-002 |
| Q27 | mongodb/data-access | [pooling](mongodb/pooling-mongoose7.md) | consolidated | Q14 |
| Q28 | node | [runtime](node/runtime-and-modules.md) | answered | — |
| Q29 | mongodb/server | [server 5.0](mongodb/server-5.0.md) | answered | — |
| Q30 | node | [runtime](node/runtime-and-modules.md) | consolidated | Q01 |
| Q31 | express, mongodb/data-access | [errors](express/errors-routing-body.md), [driver](mongodb/driver-5.9.md) | answered | — |
| Q32 | auth | [JWT](auth/passwords-jwt-storage.md) | consolidated | Q16 |
| Q33 | mongodb/data-access | [pooling](mongodb/pooling-mongoose7.md) | consolidated | Q14; interpreted from `db.js` |
| Q34 | auth | [JWT](auth/passwords-jwt-storage.md) | consolidated | Q16; interpreted from `auth.js` |
| Q35 | auth, express, mongodb/data-access | [sessions](express/cors-sessions.md) | answered | — |
| Q36 | mongodb/data-access, express, node | [driver](mongodb/driver-5.9.md), [streams](node/streams-and-crypto.md) | answered | — |

## Totals

- Answered at Medium/High confidence: **29**
- Consolidated: **5**
- Knowledge gaps: **2**
- Total terminal states: `29 + 5 + 2 = 36`
- Distinct code contradictions: **8**, enumerated C-01 through C-08 in [CODE_AUDIT.md](CODE_AUDIT.md)

Every linked corpus entry exists in this tree. Version evidence and the low-confidence bar are defined in [VERSION_MATRIX.md](VERSION_MATRIX.md) and [METHODOLOGY.md](METHODOLOGY.md).
