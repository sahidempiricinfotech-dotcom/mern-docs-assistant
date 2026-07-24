# Node 18.19 runtime and module behavior

**Applies to:** `node-18.19.0`. **Retrieved:** 2026-07-24. The URLs below are the exact Node 18.19.0 archive except where an upgrade release is explicitly named.

## Verdicts

### Global `fetch` (Q01, Q30)

Node 18.19.0 exposes browser-compatible global `fetch`, but its stability marker is **1 — Experimental** and it can be disabled with `--no-experimental-fetch`. The repository has no `node-fetch` dependency. Code may therefore use global `fetch` on the pinned runtime if the team accepts an experimental API; it must not cite later Node releases as proof that the Node 18 implementation is stable.

### Native `.env` loading (Q02)

Keep `dotenv@16.3.1` for this service. Built-in `--env-file` support begins in Node 20.6.0, so a Node 20/22 pattern does not apply to Node 18.19.0. The existing `require('dotenv').config()` call matches the pinned runtime.

### `node:test` (Q06)

The test runner exists in Node 18.19.0, but the exact archive marks it **Stability 1 — Experimental**. It is usable for a bounded pilot; it should not be declared a stable production-suite standard if team policy excludes experimental APIs.

### Loading ESM from CommonJS (Q09)

On Node 18.19.0, CommonJS should load an ESM-only dependency with dynamic `import()`. The archived ESM manual explicitly supports `import()` in CommonJS. Do not copy later synchronous `require(esm)` guidance into this runtime.

### Runtime alignment (Q28)

Containers, local development, and CI should all select **18.19.0**. The root engine range (`>=18 <19`) is compatibility metadata, while `.nvmrc` and the container image provide the reproducible runtime selector.

## Upgrade delta

- Node 20.6.0 adds built-in `.env` loading.
- Later Node versions stabilize APIs that remain experimental in the 18.19.0 archive. Re-audit `fetch`, `node:test`, and module loading before removing compatibility code.

## Sources

- [Node 18.19.0 global `fetch`](https://nodejs.org/download/release/v18.19.0/docs/api/globals.html#fetch)
- [Node 20.6.0 release: built-in `.env` support](https://nodejs.org/en/blog/release/v20.6.0)
- [Node 18.19.0 test runner](https://nodejs.org/download/release/v18.19.0/docs/api/test.html)
- [Node 18.19.0 dynamic import expressions](https://nodejs.org/download/release/v18.19.0/docs/api/esm.html#import-expressions)
- [Repository `.nvmrc`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/.nvmrc) and [container image](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/docker-compose.yml#L13)

Cross-links: [Express errors](../express/errors-routing-body.md), [Node streams](streams-and-crypto.md), and [version matrix](../VERSION_MATRIX.md).
