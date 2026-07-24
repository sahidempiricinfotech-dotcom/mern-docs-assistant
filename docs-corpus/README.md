# MERN version-pinned documentation corpus

This corpus answers the `Dev Questions Log` against repository commit
`e508acf871cc5b8c09d4928ddfd246c8ecaccc6e`, not against the newest available
documentation. Research was performed on 2026-07-24 IST.

## Pinned stack

| Technology | Repository value | Corpus tag |
| --- | --- | --- |
| Node.js | `.nvmrc` and container image `18.19.0`; engines `>=18 <19` | `node-18.19.0` |
| Express | lockfile `4.18.2` | `express-4.18.2` |
| React / React DOM | lockfile `18.2.0` | `react-18.2.0` |
| MongoDB server | container image `mongo:5.0` | `mongodb-server-5.0` |
| MongoDB Node driver | lockfile `5.9.2` | `mongodb-driver-5.9.2` |
| Mongoose | lockfile `7.6.13` | `mongoose-7.6.13` |
| jsonwebtoken | lockfile `9.0.2` | `jsonwebtoken-9.0.2` |

See [VERSION_MATRIX.md](VERSION_MATRIX.md) for evidence and upgrade boundaries.

## Entry index

- [Node runtime and modules](node/runtime-and-modules.md)
- [Node streams and password primitives](node/streams-and-crypto.md)
- [Express error handling, routing, and JSON bodies](express/errors-routing-body.md)
- [Express CORS and Mongo-backed sessions](express/cors-sessions.md)
- [React 18 features, Suspense, and Effects](react/react-18-behavior.md)
- [React Suspense testing gap](react/suspense-testing.md)
- [MongoDB server 5.0 behavior](mongodb/server-5.0.md)
- [MongoDB driver 5.9 data access](mongodb/driver-5.9.md)
- [Mongoose 7 and connection pools](mongodb/pooling-mongoose7.md)
- [Passwords, JWT verification, and browser storage](auth/passwords-jwt-storage.md)
- [Refresh-token rotation gap](auth/refresh-token-rotation.md)
- [Repository code contradictions](CODE_AUDIT.md)
- [Question-to-entry audit map](ANSWER_MAP.md)
- [Deterministic method and confidence rule](METHODOLOGY.md)

## Version evidence

- Repository manifests at the frozen commit: [root](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/package.json), [server](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/package-lock.json), [client](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/package-lock.json), and [containers](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/docker-compose.yml).
- Exact upstream releases: [Node 18.19.0 docs](https://nodejs.org/download/release/v18.19.0/docs/api/), [Express 4.18.2](https://github.com/expressjs/express/releases/tag/4.18.2), [React 18.2.0](https://github.com/react/react/releases/tag/v18.2.0), [MongoDB driver 5.9.2](https://github.com/mongodb/node-mongodb-native/releases/tag/v5.9.2), [Mongoose 7.6.13](https://github.com/Automattic/mongoose/releases/tag/7.6.13), and [jsonwebtoken 9.0.2](https://github.com/auth0/node-jsonwebtoken/blob/v9.0.2/README.md).

Recency: MongoDB 5.0 and Node 18 documentation are archived upstream. That is intentional: those archives match the repository. Current pages are used only to prove an upgrade delta and are labelled as such.
