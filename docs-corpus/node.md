# Node.js runtime entries

## N01: global fetch

**Applies to:** Node **18.19.0**. **Evidence:** the [exact v18.19.0 globals reference](https://nodejs.org/download/release/v18.19.0/docs/api/globals.html#fetch) labels `fetch` Stability 1 experimental and its history says the `--experimental-global-fetch` flag was removed in 18.0.0. **Recency:** frozen release documentation; inspected 2026-07-24.

The global browser-compatible `fetch()` is available without adding `node-fetch` in this runtime. It is still labeled experimental in this exact documentation, so do not describe it as a stable Node 18 API without qualification. Choose it deliberately, test timeout/abort and response handling, and do not confuse it with a browser's cookie policy. The repository server does not import `node-fetch`; the client uses browser `fetch` in [LiveFeed](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/src/components/LiveFeed.jsx#L8). See the browser credential boundary [R05](react.md#r05-credentialed-browser-fetch-and-cors), which links back here.

## N02: env-file loading

**Applies to:** Node **18.19.0 current**, Node **20.6.0 upgrade boundary**. **Evidence:** [`server/src/server.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/server.js#L1) loads pinned dotenv 16.3.1; [Node 20.6.0 release notes](https://nodejs.org/en/blog/release/v20.6.0) explicitly introduce built-in `.env` support and `node --env-file=config.env`. **Recency:** dated 20.6 release notes; inspected 2026-07-24.

Do not remove `dotenv` on the premise that Node 18.19 loads `.env` itself. Compose separately injects its `env_file`; local direct execution still reaches `require('dotenv').config()`. The built-in CLI alternative is a post-18 upgrade delta, not an API to backport by copying a Node 20 command.

## N03: node-test stability

**Applies to:** Node **18.19.0**, with **20.0.0** delta. **Evidence:** [exact v18.19 test-runner documentation](https://nodejs.org/download/release/v18.19.0/docs/api/test.html) labels `node:test` Stability 1 experimental, added in 18.0.0; [Node 20.0.0 release notes](https://nodejs.org/en/blog/release/v20.0.0) say the test runner was marked stable. **Recency:** release-specific sources; inspected 2026-07-24.

It exists on the pinned runtime but is not marked stable there. A production-suite adoption decision should acknowledge the experimental designation and pin/test the exact runtime; do not cite Node 20's stable status as Node 18 evidence. The repository has no test harness or CI workflow to establish local compatibility.

## N04: CommonJS to ESM

**Applies to:** Node **18.19.0**; Node **22.0.0** delta. **Evidence:** [v18.19 ESM interoperability](https://nodejs.org/download/release/v18.19.0/docs/api/esm.html#require) states `require` always treats referenced files as CommonJS and does not support loading an ES module; use dynamic `import()` from CommonJS. [Node 22.0.0 release notes](https://nodejs.org/en/blog/release/v22.0.0) identify support for requiring synchronous ESM graphs. **Recency:** frozen 18.19 docs and dated 22 release; inspected 2026-07-24.

The server is CommonJS. An ESM-only dependency should be loaded with asynchronous `import()` at a suitable boundary, replaced with a compatible package, or adopted through an intentional module migration. A Node 22 `require(esm)` example is not a valid Node 18 answer.

## N05: streams and HTTP pipelines

**Applies to:** Node **18.19.0**. **Evidence:** [exact stream reference](https://nodejs.org/download/release/v18.19.0/docs/api/stream.html#streampipelinesource-transforms-destination-callback) documents `pipeline` error forwarding and cleanup, a promise variant, and the HTTP-response caveat that an error can destroy the socket before an error body can be sent. **Recency:** frozen release docs; inspected 2026-07-24.

Use a readable source, bounded transform, and response writable so backpressure is respected; do not collect a large result into `toArray()` or a giant string first. Set status and download headers before streaming. Once bytes have been sent, an ordinary JSON error response may be impossible; log, abort/close the source, and handle the terminated response. Pair this with the versioned driver cursor in [D05](data-access.md#d05-cursor-streaming) and Express response boundary [E06](express.md#e06-streaming-an-http-response); both link back.

## N06: password KDF primitive

**Applies to:** Node **18.19.0** API. **Evidence:** [exact `crypto.scrypt` reference](https://nodejs.org/download/release/v18.19.0/docs/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) describes the asynchronous memory/CPU-expensive KDF, configurable cost, and a random salt of at least 16 bytes. **Recency:** frozen release docs; inspected 2026-07-24.

This is an available primitive, not by itself a complete password-storage policy. See [A01](auth.md#a01-password-storage-and-login), which supplies the security-policy context and links back here.

## N07: runtime alignment

**Applies to:** repository snapshot **Node 18.19.0** target. **Evidence and recency:** [V01](versions.md#v01-repository-pinned-stack), immutable commit inspected 2026-07-24.

Use 18.19.0 for local development and the `node:18.19.0-bullseye` container when reproducing this service. The engine range admits other 18.x versions, so it is not an exact CI pin; no CI configuration exists in the snapshot. Add an explicit CI version pin in a separate implementation change if parity is required. Do not silently interpret the range as permission to use Node 20 or 22.
