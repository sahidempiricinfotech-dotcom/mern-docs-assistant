# Node 18

Version tag: `node>=18 <19`, container image `node:18.19.0-bullseye`.

Evidence:

- Repo: root and server `engines.node` are `>=18 <19`; `docker-compose.yml` uses `node:18.19.0-bullseye`.
- Release evidence: [Node.js 18.19.0 LTS release notes](https://nodejs.org/en/blog/release/v18.19.0) identify version 18.19.0 in the Hydrogen LTS line.

Recency context: Node 18 is no longer the newest Node line, so current Node docs can describe APIs that are not available here. Versioned `latest-v18.x` docs or Node 18 release notes are preferred.

## Global Fetch

Applies to: Node 18.x.

Source attribution:

- [Node v18 globals documentation for `fetch`](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch), versioned as Node v18 documentation.
- [Node.js 18.19.0 LTS release notes](https://nodejs.org/en/blog/release/v18.19.0), confirming the repo's container runtime line.

Verdict: global `fetch` is available in Node 18, so this repo should not add `node-fetch` just to make `fetch` exist. If code needs `node-fetch`-specific behavior, that is a separate compatibility decision.

## Dotenv And Built-In Env Files

Applies to: Node 18.x does not have the built-in `--env-file` workflow that arrived in Node 20.6.0.

Source attribution:

- [Node.js 20.6.0 release notes](https://nodejs.org/en/blog/release/v20.6.0), which announce built-in `.env` file support and `node --env-file=config.env index.js`.
- Repo: `server/package.json` pins `dotenv@16.3.1` and `server/src/server.js` calls `require('dotenv').config()`.

Verdict: keep `dotenv` for this Node 18 backend unless the service runtime is deliberately upgraded to a Node line with built-in env-file support and the startup command is changed.

## Node Test Runner

Applies to: Node 18.x.

Source attribution:

- [Node v18 test runner docs](https://nodejs.org/docs/latest-v18.x/api/test.html), versioned as Node v18 documentation, mark `node:test` as experimental in the v18 line.
- [Node.js 18.19.0 LTS release notes](https://nodejs.org/en/blog/release/v18.19.0) mention backported test runner changes, which confirms active evolution in this line.

Verdict: `node:test` can be used for small or internal tests on Node 18, but it should not be described as a fully settled production-suite standard for this repo's runtime. Treat migration from Jest/Mocha/etc. as a deliberate test-platform decision.

## CommonJS And ESM-Only Packages

Applies to: Node 18.x CommonJS modules.

Source attribution:

- [Node v18 ECMAScript modules docs](https://nodejs.org/docs/latest-v18.x/api/esm.html), versioned as Node v18 documentation, distinguish ESM from CommonJS and document interoperability constraints.

Verdict: CommonJS code in this repo should not expect `require()` to load an ESM-only package directly. Use dynamic `import()`, switch the caller to ESM, or choose a CommonJS-compatible package version.

## HTTP Streaming

Applies to: Node 18.x HTTP server responses.

Source attribution:

- [Node v18 HTTP docs](https://nodejs.org/docs/latest-v18.x/api/http.html#class-httpserverresponse), versioned as Node v18 documentation, describe HTTP interfaces designed for large, possibly chunked messages without buffering entire requests or responses.

Verdict: Express can stream through Node's `http.ServerResponse` by setting headers and writing/piping chunks. Pair this with [MongoDB cursor streaming](mongodb-5-data-access.md#cursor-streaming) when streaming data from MongoDB.
