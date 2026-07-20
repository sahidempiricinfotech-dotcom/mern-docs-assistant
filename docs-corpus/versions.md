# Version evidence and upgrade deltas

## Node.js

Applicable version: **18.19.0**.

Evidence: `.nvmrc` and `docker-compose.yml` pin 18.19.0; `engines.node` narrows execution to 18.x. The [Node.js 18.19.0 release](https://nodejs.org/en/blog/release/v18.19.0) links the exact-version documentation.

Upgrade deltas: built-in `.env` file loading begins in [Node.js 20.6.0](https://nodejs.org/en/blog/release/v20.6.0). Synchronous CommonJS `require()` of ESM is not a Node 18 facility; Node 18 supports dynamic `import()` from CommonJS.

## Express

Applicable version: **4.18.2**.

Evidence: exact workspace manifest and lockfile pin; [Express source tag 4.18.2](https://github.com/expressjs/express/tree/4.18.2).

Upgrade delta: Express 5 automatically forwards rejected Promise-returning route handlers. Express 4 requires explicit `next(error)` or a wrapper. Express 5 also changes wildcard and optional path syntax.

## React

Applicable version: **18.2.0**.

Evidence: exact workspace manifest and lockfile pin; [React source tag 18.2.0](https://github.com/facebook/react/tree/v18.2.0).

Upgrade delta: form Actions and `useActionState` are introduced as React 19 features in the [React 19 release article](https://react.dev/blog/2024/12/05/react-19).

## MongoDB

Applicable versions: server **5.0**, Node.js driver **5.9.2**, Mongoose **7.6.13**.

Evidence: `mongo:5.0` image plus exact workspace manifest/lock entries; [driver tag 5.9.2](https://github.com/mongodb/node-mongodb-native/tree/v5.9.2); [Mongoose 7.x documentation](https://mongoosejs.com/docs/7.x/).

Upgrade delta: MongoDB 5.0 requires an unsharded `$lookup.from` collection. Support for a sharded target starts in 5.1, as stated by the [current `$lookup` history](https://www.mongodb.com/docs/manual/reference/operator/aggregation/lookup/).
