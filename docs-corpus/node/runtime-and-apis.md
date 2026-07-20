# Node.js 18.19 runtime and APIs

## Global fetch

Applicable version: **Node.js 18.19.0**.

Verdict: `fetch` is globally available, so this repository does not need `node-fetch` for ordinary Fetch API calls. In the exact [18.19.0 globals documentation](https://nodejs.org/download/release/v18.19.0/docs/api/globals.html#fetch), it remains Stability 1 (Experimental) and can be disabled with `--no-experimental-fetch`. Treat compatibility and behavior as less settled than a stable API.

Related: [React 18 data fetching](../react/react-18.md#suspense-and-data-fetching); [CORS](../cross-stack/http-and-streaming.md#credentialed-cors).

## Environment files

Applicable version: **Node.js 18.19.0**.

Verdict: Node 18.19.0 cannot load `.env` through the later `--env-file` feature. Keep `dotenv@16.3.1` and the existing `require('dotenv').config()` call. The introduction evidence is the [Node.js 20.6.0 release](https://nodejs.org/en/blog/release/v20.6.0), which says built-in `.env` support starts in 20.6.0.

## CommonJS and ESM

Applicable version: **Node.js 18.19.0**.

Verdict: CommonJS cannot synchronously `require()` an ESM-only package. Use `await import('package')` from CommonJS or choose a CommonJS-compatible package release. The exact [18.19 ESM documentation](https://nodejs.org/download/release/v18.19.0/docs/api/esm.html#import-expressions) states that dynamic `import()` works in CommonJS and can load ES modules.

## node:test

Applicable version: **Node.js 18.19.0**.

Verdict: the test runner is usable but still labelled **Stability 1 – Experimental** in the exact [18.19.0 test documentation](https://nodejs.org/download/release/v18.19.0/docs/api/test.html). Adopt it only if the team accepts experimental API churn; pin the runtime in CI and avoid depending on experimental coverage/mocking behavior without tests.

## Streams

Applicable version: **Node.js 18.19.x**.

Verdict: use `stream.pipeline()` or `stream/promises.pipeline()` so backpressure and errors propagate across the pipeline. The [Node 18 stream documentation](https://nodejs.org/docs/latest-v18.x/api/stream.html) is a versioned 18.x URL; the repository pins 18.19.0, so APIs used must be checked against the exact 18.19 docs before implementation.

Related: [MongoDB cursor streaming and CSV responses](../cross-stack/http-and-streaming.md#streaming-http-and-csv).

