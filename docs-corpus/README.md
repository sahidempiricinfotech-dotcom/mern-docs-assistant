# MERN Docs Corpus

Generated on 2026-07-17 for the question window 2026-06-15 through 2026-07-14 IST.

Base repository state: `sahidempiricinfotech-dotcom/mern-docs-assistant` `main` at `e508acf871cc5b8c09d4928ddfd246c8ecaccc6e`.

## Pinned Runtime

The repository manifest and lockfiles are the source of truth:

| Area | Pinned version | Evidence in repo |
| --- | --- | --- |
| Node.js | `>=18 <19`, container image `node:18.19.0-bullseye` | `package.json`, `server/package.json`, `docker-compose.yml` |
| MongoDB server | `mongo:5.0` | `docker-compose.yml` |
| MongoDB Node driver | `mongodb@5.9.2` | `server/package-lock.json` |
| Mongoose | `mongoose@7.6.13` | `server/package-lock.json` |
| Express | `express@4.18.2` | `server/package-lock.json` |
| React | `react@18.2.0`, `react-dom@18.2.0` | `client/package-lock.json` |
| Auth helper | `jsonwebtoken@9.0.2` | `server/package-lock.json` |

## Confidence Rule

Answers are **High confidence** only when the behavior is supported by a versioned official doc, a release note/changelog that pins the version range, or a GitHub README for the exact package family plus code inspection where the repo uses the feature.

Answers are **Medium confidence** when the source is official but not perfectly versioned, the package is not pinned in this repo, or the answer depends on application design choices after the version-specific fact is established.

Answers are **Low confidence** when the corpus cannot establish a version-specific answer, when official docs are silent on the app-level policy, or when the only supporting material is version-unverified community content. Low confidence rows must also appear in the `Knowledge Gaps` sheet tab.

Community sources do not override official docs or release notes. Stack Overflow tag coverage was checked for React Suspense testing and did not provide a version-checkable source for this run; the related row is treated as a gap.

## Routing Slices

| Route | Corpus entry |
| --- | --- |
| `node` | [Node 18](entries/node-18.md) |
| `express` | [Express 4](entries/express-4.md) |
| `react` | [React 18](entries/react-18.md) |
| `mongodb`, `data-access` | [MongoDB 5 and Data Access](entries/mongodb-5-data-access.md) |
| `auth` | [Auth and Sessions](entries/auth-sessions.md) |

Cross-technology dependencies are linked inside entries. For example, [Express async route handling](entries/express-4.md#async-route-errors) points to [MongoDB driver callback removal](entries/mongodb-5-data-access.md#driver-callbacks), because the repo's async route behavior is affected by the data-access call style.

## Known Code Contradictions

| Code path | Corpus contradiction |
| --- | --- |
| `server/src/repositories/userRepo.js` | Uses callback-style `findOne()` with MongoDB Node driver 5.x, whose public API is Promise-only. See [driver callbacks](entries/mongodb-5-data-access.md#driver-callbacks). |
| `server/src/routes/orders.js` | Async handlers throw without `next(error)` or a wrapper under Express 4.18.2. See [async route errors](entries/express-4.md#async-route-errors). |
| `server/src/db.js` | Uses legacy Mongoose/driver options including `poolSize`, `useNewUrlParser`, `useUnifiedTopology`, and `useFindAndModify`; Mongoose 7/driver 5 guidance uses `maxPoolSize`. See [Mongoose pool sizing](entries/mongodb-5-data-access.md#mongoose-pool-sizing). |
| `server/src/auth.js` | Uses `jwt.decode()` to accept bearer tokens instead of `jwt.verify()`, so signatures and expiry are not enforced. See [JWT verification](entries/auth-sessions.md#jwt-verification). |
| `server/src/repositories/userRepo.js` | Accepts `passwordHash` from the request body instead of hashing a password server-side with a password KDF. See [password hashing](entries/auth-sessions.md#password-hashing). |
| `client/src/components/LiveFeed.jsx` | Starts an interval in a React StrictMode app without returning an effect cleanup. See [StrictMode effect re-runs](entries/react-18.md#strictmode-effect-re-runs). |

## Run Audit

The per-question run audit is in [run-audit-2026-07-17.md](run-audit-2026-07-17.md).
