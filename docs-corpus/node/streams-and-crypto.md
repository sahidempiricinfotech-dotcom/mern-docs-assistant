# Node 18.19 streams and password primitives

**Applies to:** `node-18.19.0`; Mongo cursor portions also require `mongodb-driver-5.9.2`. **Retrieved:** 2026-07-24.

## Streaming HTTP responses (Q22, Q36)

`http.ServerResponse` is a writable stream. Compose a readable source, any encoding transform, and the response with `stream.pipeline()` or its Promise API so backpressure and stream errors are handled consistently. Set status and headers before the first chunk, stop the source when the request closes, and do not try to replace the response body after headers have been sent.

For Mongo exports, prefer the driver cursor's `stream()` (or async iteration) over `toArray()`. For this repository's Mongoose `Order` model, the equivalent source is a Mongoose query cursor. A CSV transform must escape quotes, delimiters, and newlines rather than concatenate raw values.

## Password derivation on the pinned runtime (Q15)

Node 18.19.0 provides stable `node:crypto` password primitives. With the current dependency set, use asynchronous `crypto.scrypt()` with a unique random salt, store algorithm/parameters/salt/hash together, and compare derived keys with `timingSafeEqual()`. OWASP prefers Argon2id when an audited, pinned implementation is available and lists scrypt as the fallback. This corpus does not invent an Argon2 package version because none is pinned in the repository.

The repository does not implement this flow: it accepts a caller-supplied `passwordHash` and login does not verify the submitted password. See [CODE_AUDIT.md](../CODE_AUDIT.md#c-05-passwords-are-neither-hashed-nor-verified).

## Sources

- [Node 18.19.0 Streams Promise API](https://nodejs.org/download/release/v18.19.0/docs/api/stream.html#stream-promises-api)
- [Node 18.19.0 `http.ServerResponse`](https://nodejs.org/download/release/v18.19.0/docs/api/http.html#class-httpserverresponse)
- [MongoDB driver 5.9 cursor `stream()`](https://mongodb.github.io/node-mongodb-native/5.9/classes/AbstractCursor.html#stream)
- [Node 18.19.0 `crypto.scrypt`](https://nodejs.org/download/release/v18.19.0/docs/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) — current security guidance, not a Node version claim.

Cross-links: [driver data access](../mongodb/driver-5.9.md), [password/JWT entry](../auth/passwords-jwt-storage.md), and [Express errors](../express/errors-routing-body.md).
