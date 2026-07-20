# MERN documentation corpus

This corpus answers the Dev Questions Log against the versions actually pinned by this repository, not against the newest documentation.

## Pinned stack

| Technology | Pinned version | Repository evidence |
| --- | --- | --- |
| Node.js | 18.19.0 | `/.nvmrc`, `package.json#engines`, `docker-compose.yml` |
| Express | 4.18.2 | `server/package.json`, `server/package-lock.json` |
| React / React DOM | 18.2.0 | `client/package.json`, `client/package-lock.json` |
| MongoDB server | 5.0 | `docker-compose.yml` (`mongo:5.0`) |
| MongoDB Node.js driver | 5.9.2 | `server/package.json`, `server/package-lock.json` |
| Mongoose | 7.6.13 | `server/package.json`, `server/package-lock.json` |
| jsonwebtoken | 9.0.2 | `server/package.json`, `server/package-lock.json` |

The root lockfile only records workspace links. The workspace manifests and workspace lockfiles are therefore required evidence for library versions.

## Navigation

- [Deterministic method and confidence rule](methodology.md)
- [Version evidence and upgrade deltas](versions.md)
- [Node.js 18.19 behavior](node/runtime-and-apis.md)
- [Express 4 behavior](express/api-behavior.md)
- [React 18 behavior](react/react-18.md)
- [MongoDB server 5.0 behavior](mongodb/server-5.0.md)
- [Driver 5.9 and Mongoose 7.6 data access](data-access/driver-and-mongoose.md)
- [Authentication and session handling](auth/authentication.md)
- [Cross-stack CORS and streaming](cross-stack/http-and-streaming.md)
- [Repository contradictions](code-audit.md)
- [Source and Stack Overflow trust ledger](source-ledger.md)
- [Run audit and question-state ledger](run-audit.md)

Every section states its applicable version and evidence. A source without sufficient version evidence is labelled `version-unverified` and cannot, by itself, support a High- or Medium-confidence answer.
