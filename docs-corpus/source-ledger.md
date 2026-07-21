# Source and trust ledger

Checked: **2026-07-21 in Chrome**. Each row records why a source can or cannot establish a version claim.

| Source | Version evidence | Trust treatment |
| --- | --- | --- |
| Node exact release documentation | URLs under `/download/release/v18.19.0/` for globals, ESM, test, crypto, and streams | Direct evidence for Node 18.19.0 |
| Node 20.6.0 release note | Exact release URL explicitly introduces built-in `.env` file support | Direct upgrade-boundary evidence; it proves the feature is later than Node 18.19 |
| Express error guide + Express 4.18.2 tag | Guide explicitly says automatic rejected-Promise forwarding starts in Express 5; tag proves the installed 4.18.2 line | Direct 4-versus-5 boundary evidence |
| Express 5 migration guide | Explicit path-syntax and rejected-Promise changes | Upgrade-direction evidence only; it is not used as the current runtime contract |
| React 18 release/StrictMode pages + `v18.2.0` tag | Pages explicitly name React 18 behavior; tag proves the pinned package | Direct for React 18 behavior |
| React 19 release article | Explicitly introduces Actions, form action functions, and `useActionState` in React 19 | Direct negative evidence for React 18.2 availability |
| MongoDB 5.0 manual | URLs under `/docs/v5.0/` for `$lookup`, write concern, time-series TTL, `$in`, transactions, indexes, and range pagination | Direct for server 5.0 |
| Current MongoDB `$lookup` history | Explicitly says sharded `from` support starts in 5.1 | Upgrade-boundary evidence only |
| Driver 5.9 generated API | Versioned `/node-mongodb-native/5.9/` pages for sessions, transactions, bulk writes, upserts, and cursor streams | Direct for driver 5.9.x, including pinned 5.9.2 |
| Driver v5.0.0 release + v5.9.2 tag | Release explicitly removes callbacks; tag proves the installed source line | Direct callback-removal and exact-line evidence |
| Mongoose 7.x connections + Mongoose 6 migration | Versioned 7.x pool docs; migration explicitly records removed options and the `poolSize` rename that remains in force | Direct for Mongoose 7.6.13 behavior |
| Tagged GitHub READMEs | Exact `jsonwebtoken@9.0.2`, `cors@2.8.5`, `express-session@1.17.3`, and `connect-mongo@5.1.0` tags | Direct for the tagged package version; session packages are candidate dependencies, not installed facts |
| Internal API Authentication Guide | Google Doc revision read on 2026-07-21; content says `Last-Updated: 2026-06-10` | Authoritative for the company token contract, not upstream library behavior |
| OWASP and MDN pages | No MERN release version; each was checked 2026-07-21 | `not-versioned guidance`; may support security/web-platform recommendations but never a MERN version boundary |
| Stack Overflow MongoDB `$in` answer | Posted 2013-08-28, score 126 when checked; explicitly reasons from MongoDB 2.4-era BSON limits | Historical context only; MongoDB 5.0 official “tens” guidance wins |
| Stack Overflow `react-testing-library` search | Three results when checked; none states a React 18.2/testing-library Suspense-test contract | `version-unverified`; no answer trusted, producing G-001 |
| Stack Overflow `oauth-2.0` refresh-rotation search | Low-score discussions without this app's replay/device/revocation policy | `version-unverified`; no answer trusted, producing G-002 |
