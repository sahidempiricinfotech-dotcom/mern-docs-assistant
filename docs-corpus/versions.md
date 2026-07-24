# Version baseline and upgrade boundaries

## V01: repository-pinned stack

**Source attribution and evidence.** The immutable input is commit [`e508acf`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/tree/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e). The root [`package.json`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/package.json) and [`package-lock.json`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/package-lock.json) establish workspaces and `engines.node >=18 <19`; the root lock does not contain the workspace dependency resolutions. Exact packages are in the server and client manifests and their separate lockfiles. `.nvmrc` and compose establish the exact runtime/deployment images. **Recency:** repository snapshot committed 2026-07-17; inspected 2026-07-24.

| Component | Claim | Local evidence | Meaning |
| --- | --- | --- | --- |
| Node.js | **18.19.0 exact local/container target**, allowed engine range `>=18 <19` | [`.nvmrc`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/.nvmrc), [`docker-compose.yml#L13`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/docker-compose.yml#L13), root and server engine | The exact target is narrower than the engine guard. No CI workflow is in this snapshot. |
| Express | **4.18.2** | [`server/package.json`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/package.json), [`server/package-lock.json`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/package-lock.json) | Express 5 behavior is an upgrade delta, not current behavior. |
| React / React DOM | **18.2.0** | [`client/package.json`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/package.json), [`client/package-lock.json`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/package-lock.json) | React 19 Actions are not in the installed line. |
| MongoDB server | **5.0 image line**, patch not pinned | [`docker-compose.yml#L5`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/docker-compose.yml#L5) | `mongo:5.0` is a mutable minor tag; do not invent a patch. |
| MongoDB Node driver | **5.9.2** | server manifest and lockfile above | Driver API line is distinct from server version. |
| Mongoose | **7.6.13** | server manifest and lockfile above | Versioned 7.x docs cover the major line; exact release tag corroborates the patch. |
| jsonwebtoken | **9.0.2** | server manifest and lockfile above | Tagged README `v9.0.2` is used for auth behavior. |
| cors / dotenv | **2.8.5 / 16.3.1** | server manifest and lockfile above | Relevant supporting packages are pinned. |
| express-session / connect-mongo / React Testing Library | **not installed or pinned** | absent from the complete manifest/tree at this commit | Guidance is `version-unverified` for this app and cannot become a version-specific implementation guarantee. |

## V02: upgrade delta index

| Current landing page | Upgrade boundary | What changes for this repository |
| --- | --- | --- |
| [E01](express.md#e01-async-errors-in-express-4-and-5) | Express 5 | Promise rejection forwarding becomes automatic; remove wrappers only as part of a tested migration. |
| [E02](express.md#e02-route-pattern-migration) | Express 5 | Named splats and brace optional syntax replace old string patterns. |
| [R01](react.md#r01-react-19-actions-are-not-react-18) | React 19 | Function form actions and `useActionState` become available after coordinated React/DOM upgrade. |
| [M01](mongodb-server.md#m01-lookup-sharded-foreign-collection) | MongoDB 5.1+ (also described in 7.0) | A sharded `$lookup.from` becomes permitted, subject to later restrictions; it is forbidden on 5.0. |
| [N02](node.md#n02-env-file-loading) | Node 20.6 | Built-in `--env-file` appears; Node 18 still needs `dotenv`/deployment injection. |
| [N03](node.md#n03-node-test-stability) | Node 20 | `node:test` is marked stable; it is experimental in exact 18.19 docs. |
| [N04](node.md#n04-commonjs-to-esm) | Node 22 | Synchronous `require()` of eligible ESM graphs was introduced; do not copy that pattern into Node 18. |

All upgrade statements have their release or versioned documentation evidence in the linked entry. They are not recommendations to upgrade outside the requested window.
