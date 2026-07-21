# Node.js 18.19.0

Repository evidence: `.nvmrc` is `18.19.0`, `docker-compose.yml` uses `node:18.19.0-bullseye`, and both `engines.node` declarations are `>=18 <19`. Exact-version runtime decisions therefore use 18.19.0; the broader engine range does not authorize Node 20/22 features.

## Global `fetch`

**Applies to:** Node 18.19.0. **Confidence: High.**

`fetch` is a global in the exact Node 18.19.0 API, so this app does not need `node-fetch` merely to make HTTP requests. In this release line the API is still Stability 1 (experimental); it can be disabled by `--no-experimental-fetch`. Do not silently treat it as the later stable API when deciding production policy. The exact-version page is [Node 18.19.0 globals: `fetch`](https://nodejs.org/download/release/v18.19.0/docs/api/globals.html#fetch); version evidence is the release-qualified URL and page header.

Related: browser requests and credentials are covered under [Express CORS](express-4.md#credentialed-cors), not by Node's server-side fetch implementation.

## Environment files

**Applies to:** Node 18.19.0. **Upgrade delta:** native `--env-file` begins in Node 20.6.0. **Confidence: High.**

Keep the pinned `dotenv@16.3.1` and `require('dotenv').config()` in `server/src/server.js:1`. Node 18.19.0's CLI does not provide `--env-file`; the official [Node 20.6.0 release notes](https://nodejs.org/en/blog/release/v20.6.0) introduce `--env-file`. That release note is positive version evidence; a current Node CLI page is not evidence that the flag exists in Node 18.

## `node:test`

**Applies to:** Node 18.19.0. **Confidence: High.**

The built-in runner exists and handles synchronous, Promise, and callback tests, but the exact runtime documentation labels the entire module **Stability 1 - Experimental**. It is usable, but selecting it as the production suite's only test framework is a risk/policy choice, not a claim that it was stable in this runtime. Source: [Node 18.19.0 test runner](https://nodejs.org/download/release/v18.19.0/docs/api/test.html), whose header states both the exact version and stability.

## CommonJS loading of ESM

**Applies to:** Node 18.19.0. **Confidence: High.**

The server is CommonJS. On this runtime, `require()` does not directly load an ESM-only package. Use dynamic `import()` from CommonJS (and await the resulting Promise), or choose a package build that still exposes CommonJS. Do not copy the newer synchronous `require(esm)` behaviour into this service. Sources: [Node 18.19.0 ESM interoperability](https://nodejs.org/download/release/v18.19.0/docs/api/esm.html#import-expressions) and [Node 18.19.0 CommonJS](https://nodejs.org/download/release/v18.19.0/docs/api/modules.html); both URLs are release-qualified.

## Streaming and backpressure

**Applies to:** Node 18.19.0. **Confidence: High.**

Connect a readable source through any transforms to the HTTP response with `stream.pipeline()` (or its Promise form) so backpressure and errors propagate. Do not build the whole payload in memory before `res.send()`. The pipeline callback/Promise must be observed; if an Express response already has headers, follow the streaming error rule in [Express responses](express-4.md#streaming-responses). Source: [Node 18.19.0 `stream.pipeline()`](https://nodejs.org/download/release/v18.19.0/docs/api/stream.html#streampipelinesource-transforms-destination-callback), exact-version URL.

This is the Node side of [Mongo cursor to CSV](data-access.md#streaming-a-mongo-cursor); that entry links back here because both semantics are needed.

## Password-derived keys

**Applies to:** Node 18.19.0 built-in crypto. **Confidence: Medium** for choosing a complete application password-storage policy.

If the team elects to avoid another dependency, asynchronous `crypto.scrypt()` is the exact-runtime password-based KDF. Generate a unique random salt (Node documents at least 16 random bytes) and store the salt and parameters alongside the derived value; compare with constant-time logic. Node's API documents mechanics, not the service's whole credential policy. Source: [Node 18.19.0 `crypto.scrypt()`](https://nodejs.org/download/release/v18.19.0/docs/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback), exact-version URL. The application-specific gap and current leak are recorded in [password storage](auth.md#password-storage).

