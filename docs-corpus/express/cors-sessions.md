# Express 4 CORS and Mongo-backed sessions

**Applies to:** `express-4.18.2`, `cors-2.8.5`, `node-18.19.0`, and `mongodb-driver-5.9.2`. Session-package examples are pinned separately below. **Retrieved:** 2026-07-24.

## Credentialed CORS (Q20)

For cross-origin cookies, the server must return a specific allowed origin, not `*`, and enable credentials; the browser request must also set `credentials: 'include'`. The repository's server-side CORS block uses a specific origin and `credentials: true`, which is correct. A bearer token in `Authorization` is a different credential mechanism: allow the header and send it explicitly; `credentials: 'include'` controls cookies/TLS client credentials, not the bearer header.

## Mongo-backed signed sessions (Q35)

One version-checked option for the pinned stack is `express-session@1.18.2` with `connect-mongo@5.1.0`. Pin them before implementation; neither is currently installed.

Required shape:

1. Configure `express-session` with a secret from managed configuration, `resave: false`, `saveUninitialized: false`, and a production cookie using `httpOnly`, `secure`, and an intentional `sameSite` policy.
2. Use `MongoStore.create(...)`; do not use the default `MemoryStore` in production.
3. Reuse an existing native-client promise when lifecycle ownership is clear, or intentionally create and budget a separate pool.
4. Keep only the opaque session identifier in the cookie; session data remains server-side.
5. Add CSRF protection when cookies authenticate state-changing cross-site requests.

`connect-mongo@5.1.0` explicitly lists Express 4, Node 18, native driver 5, and MongoDB 3.6+ compatibility, so it covers the pinned stack. Re-check this entry if different package versions are selected.

## Sources

- [`cors` README at v2.8.5](https://github.com/expressjs/cors/blob/v2.8.5/README.md)
- [`express-session` README at v1.18.2](https://github.com/expressjs/session/blob/v1.18.2/README.md)
- [`connect-mongo` README at v5.1.0](https://github.com/jdesboeufs/connect-mongo/blob/v5.1.0/README.md)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — current security guidance; no product-version claim.
- [Pinned CORS configuration](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/app.js#L9)

Cross-links: [JWT/browser storage](../auth/passwords-jwt-storage.md), [pooling](../mongodb/pooling-mongoose7.md), and [Node streams](../node/streams-and-crypto.md).
