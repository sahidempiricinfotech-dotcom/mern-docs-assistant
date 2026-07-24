# Version-pinned MERN documentation corpus

This corpus answers the `Dev Questions Log` against the versions actually declared by this repository. The pinned-version landing pages come first; upgrade-only behavior is kept as a separate delta instead of being silently substituted.

## Corpus contract

- Runtime and dependency versions come from `package.json`, lockfiles, `.nvmrc`, and `docker-compose.yml`, in that order of specificity.
- Every external source is tagged with an applicability claim and evidence for that claim. A source without sufficient evidence is explicitly `version-unverified`.
- Official/versioned documentation wins over community material. Stack Overflow can only supplement a version-checked primary source; it cannot overrule one.
- Answers use the deterministic routing and confidence rules in [policy.md](policy.md).
- Cross-technology dependencies are linked in both directions.

## Pinned landing pages

- [Version inventory and recency](versions.md)
- [Node.js 18.19.0](node.md)
- [Express 4.18.2](express.md)
- [React 18.2.0](react.md)
- [MongoDB Server 5.0](mongodb-server.md)
- [MongoDB Node driver 5.9.2 and Mongoose 7.6.13](data-access.md)
- [JWT, password, cookie, and session authentication](auth.md)
- [Run audit](audit.md)

## Upgrade deltas called out in this corpus

- Express 5 automatically forwards rejected route-handler promises; Express 4 does not.
- React 19 adds Actions and `useActionState`; React 18.2 does not provide them.
- MongoDB 5.1 permits a sharded `$lookup.from` collection; MongoDB 5.0 requires it to be unsharded.
- Node 20.6 adds built-in `.env` loading; Node 18.19.0 still needs `dotenv` or equivalent application loading.

