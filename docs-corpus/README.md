# Version-pinned MERN documentation corpus

This corpus answers questions for this repository, not for the latest MERN releases.

## Runtime matrix and deterministic precedence

| Surface | Repository source of truth | Pinned value | Documentation target |
| --- | --- | --- | --- |
| Node.js | `.nvmrc`; `docker-compose.yml`; root/server `engines` | 18.19.0 in local/container; any 18.x allowed by `engines` | Node 18.19.0 docs first |
| Express | `server/package.json`; `server/package-lock.json` | 4.18.2 | Express 4.x docs; Express 5 only as an upgrade delta |
| React / ReactDOM | `client/package.json`; `client/package-lock.json` | 18.2.0 | React 18 release/upgrade material; React 19 only as an upgrade delta |
| MongoDB server | `docker-compose.yml` | 5.0 image line | MongoDB Manual v5.0 |
| MongoDB Node driver | `server/package.json`; `server/package-lock.json` | 5.9.2 | immutable 5.9 API and v5 release notes |
| Mongoose | `server/package.json`; `server/package-lock.json` | 7.6.13 | immutable 7.6.13 repository docs, then 7.x docs |
| jsonwebtoken | `server/package.json`; `server/package-lock.json` | 9.0.2 | `v9.0.2` README |

When the sources disagree, the order is: manifest/lockfile and deployment file for the version; official versioned API/manual for behaviour; an immutable release or GitHub tag for deltas; unversioned official pages; third-party material. A newer-major page never overrides a pinned-major page. Retrieved on 2026-07-21 IST unless an entry states otherwise.

## Routing

Each question is normalized to one or more stable routes, in this order:

- `node/runtime`, `node/modules`, `node/test`, `node/streams`, `node/crypto` -> [Node 18](node-18.md)
- `express/errors`, `express/routing`, `express/body`, `express/cors`, `express/response` -> [Express 4](express-4.md)
- `react/forms`, `react/suspense`, `react/effects` -> [React 18](react-18.md)
- `mongodb/aggregation`, `mongodb/write-concern`, `mongodb/timeseries`, `mongodb/query` -> [MongoDB 5.0](mongodb-5.md)
- `data-access/driver`, `data-access/pool`, `data-access/transactions`, `data-access/bulk`, `data-access/stream` -> [data access](data-access.md)
- `auth/jwt`, `auth/password`, `auth/token-storage`, `auth/session` -> [authentication](auth.md)

Mixed questions retain every route. For example, CSV export is `data-access/stream + express/response + node/streams`, and credentialed CORS is `express/cors + react/browser-fetch`.

## Confidence and gap rule

- **High**: a versioned official source or immutable version tag directly states the decisive behaviour, and any relevant repository code was checked.
- **Medium**: the decisive behaviour is supported by official sources, but a patch-level document is unavailable, an application-specific choice remains, or the answer composes two independently documented behaviours.
- **Low**: the decisive claim would depend on a version-unverified source, a secondary source not corroborated for the pinned version, or undocumented product/threat-model requirements.

Every Low result is a knowledge gap. It may include a bounded interim observation, but must not be presented as a version-accurate answer. Existing gap rows are updated by related question ID; a new row is added only if no matching gap exists. Gap priority is deterministic: frequency of the normalized route (descending), then impact `Critical > High > Medium > Low`, then smallest question ID.

## Known code contradictions

1. `server/src/auth.js:11` uses `jwt.decode()` for authorization. It neither verifies the signature nor enforces expiry; use `jwt.verify()` as described in [JWT verification](auth.md#jwt-verification).
2. `server/src/db.js:11-14` passes removed Mongoose connection options, including `poolSize`; use `maxPoolSize` for Mongoose 7 as described in [pool sizing](data-access.md#connection-pool-sizing).
3. `server/src/repositories/userRepo.js:22-31` passes a callback to driver 5.9.2 `findOne()`, despite the v5 promise-only API; see [driver callbacks](data-access.md#driver-5-callback-removal).
4. `server/src/routes/orders.js:7-19` has unwrapped async Express 4 handlers; a rejection bypasses the error middleware. See [async errors](express-4.md#async-route-errors).
5. `server/src/routes/users.js:10-11` accepts a caller-supplied `passwordHash` and returns it in the response object. See [password storage](auth.md#password-storage).
6. `client/src/components/LiveFeed.jsx:18-19` creates an interval without returning a cleanup function; React 18 Strict Mode exposes the duplicate-development polling. See [Strict Mode effects](react-18.md#strict-mode-effects).

## Upgrade-sensitive conflicts

- MongoDB 5.0 documents `$lookup` as joining an **unsharded** `from` collection. The 7.0 manual says sharded targets are supported starting in 5.1. See [the side-by-side entry](mongodb-5.md#lookup-and-sharded-targets).
- Express 4 requires rejected async work to reach `next(err)`; Express 5 automatically forwards a rejected/throwing returned Promise. See [async errors](express-4.md#async-route-errors).
- React 18.2 has neither form Actions nor `useActionState`; the official React 19 release introduces both. See [React form Actions](react-18.md#form-actions-and-useactionstate).
- Node 18 has no native `--env-file`; it was added in Node 20.6.0. See [environment files](node-18.md#environment-files).

