# Node.js 18.19.0

Pinned evidence: [`.nvmrc`](../.nvmrc) and [`docker-compose.yml`](../docker-compose.yml) both select 18.19.0; package engines allow Node 18 only. The [18.19.0 release note](https://nodejs.org/en/blog/release/v18.19.0) identifies that exact LTS release. Recency warning: Node 18 is EOL according to the [official release table](https://nodejs.org/en/about/previous-releases).

## Global `fetch` (Q01, Q30)

**Pinned verdict:** Node 18 provides global `fetch`, so this repository does not need `node-fetch` for ordinary Fetch-compatible requests. In the versioned [Node 18 globals documentation](https://nodejs.org/docs/latest-v18.x/api/globals.html#fetch), the API is available but marked Stability 1 (Experimental). Treat its exact edge behavior as Node 18 behavior, not as the later stable Fetch API.

**Repository check:** no `node-fetch` dependency is present. Using the global is consistent with the manifest, with the experimental-status caveat.

**Upgrade delta:** later Node lines stabilize Fetch. Do not copy Node 22-only examples into this service without checking Node 18 support.

Related: [credentialed CORS](express.md#credentialed-cors-q20).

## `.env` loading (Q02)

**Pinned verdict:** keep `dotenv` on Node 18.19.0. Built-in `--env-file` support starts in Node 20.6.0, as stated by the [Node 20.6.0 release note](https://nodejs.org/en/blog/release/v20.6.0). It is not a Node 18 feature.

**Repository check:** `server/src/server.js` calls `require('dotenv').config()` and `dotenv@16.3.1` is locked. That is correct for the pinned runtime. Docker Compose's `env_file` injects environment variables into the container before Node starts; it is a separate Compose feature.

## `node:test` (Q06)

**Pinned verdict:** Node 18 contains `node:test`, but the versioned [Node 18 test-runner page](https://nodejs.org/docs/latest-v18.x/api/test.html#test-runner) marks it Stability 1 (Experimental) and records that it was added in Node 18.0.0. It can be evaluated, but calling it a stable production test-suite foundation on this runtime would be inaccurate.

## CommonJS loading ESM (Q09)

**Pinned verdict:** CommonJS code on Node 18 should use dynamic `import()` to load an ESM-only package. The versioned [Node 18 ESM documentation](https://nodejs.org/docs/latest-v18.x/api/esm.html#import-expressions) explicitly says dynamic `import()` works in CommonJS and can load ES modules. Do not rely on later Node `require(esm)` behavior.

## Exact runtime alignment (Q28)

**Pinned verdict:** use Node 18.19.0 for both containers and local development because `.nvmrc` and the Compose image agree on that patch. The root/server engine ranges alone are not exact enough.

The official [18.19.1 release](https://nodejs.org/en/blog/release/v18.19.1) was a later security release. An upgrade should change `.nvmrc`, the container tag, and CI together; this run does not silently replace the repository's 18.19.0 pin. No CI configuration exists in the repository, so CI parity must be verified outside this repo.

## Streaming large responses (Q22, Q36)

Use a backpressure-aware pipeline instead of accumulating the full payload. Node 18's [`node:stream/promises` pipeline](https://nodejs.org/docs/latest-v18.x/api/stream.html#streampipelinesource-transforms-destination-options) returns a Promise when the pipeline completes, supports abort signals, and is designed to limit buffering.

For Mongo cursors, pair this with the driver entry in [data-access.md](data-access.md#cursor-streaming-q22-q36). Express error handling after headers are sent is covered in [express.md](express.md#streaming-error-boundary-q22-q36).

## Password derivation primitive (Q15)

Node 18's versioned [`crypto.scrypt`](https://nodejs.org/docs/latest-v18.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) documentation describes a memory- and CPU-expensive password KDF and recommends a random, unique salt of at least 16 bytes. Application requirements and storage format are covered in [auth.md](auth.md#password-hashing-q15).

