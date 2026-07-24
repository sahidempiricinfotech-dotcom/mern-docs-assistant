# Passwords, JWT verification, and browser storage

**Applies to:** `node-18.19.0`, `express-4.18.2`, and `jsonwebtoken-9.0.2`. OWASP pages supply security guidance where product docs do not prescribe an application policy. **Retrieved:** 2026-07-24.

## Password storage (Q15)

With the repository's current dependencies, use asynchronous `crypto.scrypt()` with a unique random salt, store the algorithm and work parameters with the hash, and verify with `timingSafeEqual()`. Argon2id is OWASP's preferred choice when the team selects and pins an audited implementation; this corpus does not invent an unpinned package.

The current service accepts `passwordHash` from the request and login never verifies a password. That is a critical code contradiction, not merely missing documentation.

## JWT verification and expiry (Q16, Q32, Q34)

Call `jwt.verify(token, key, options)`, restrict the allowed algorithms, and validate issuer/audience when the deployment uses them. `verify()` validates the signature and the `exp` claim and throws/returns an error such as `TokenExpiredError`. `jwt.decode()` only parses; it must not authenticate an untrusted token.

`server/src/auth.js` uses `jwt.decode()` and therefore accepts expired or forged payloads when they contain `sub`. It also falls back to `dev-secret`; production startup should fail if a managed secret/key is absent.

The closest internal document found is [Security Best Practices](https://docs.google.com/document/d/1qlR9TmSUlsl916BGpjavqGZyzBzE-q3kKw-Z91bG29I). It says secrets must be centrally managed/rotated and not placed in source. It is linked for Priya's note, but it is not misrepresented as a detailed JWT runbook.

## Browser token storage (Q25)

For a browser session, prefer an `HttpOnly`, `Secure`, intentionally `SameSite` cookie when the application can implement CSRF protection and server-side/session or refresh-token controls. `localStorage` is readable by JavaScript, so an XSS can steal its tokens. This is a security-architecture decision, not a React-version feature.

The existing login route returns an access token in JSON and does not set a cookie. Moving to an HttpOnly design therefore requires an API/auth-flow change; setting `credentials: true` in CORS alone does not create cookie authentication.

## Sources

- [`jsonwebtoken` README at v9.0.2](https://github.com/auth0/node-jsonwebtoken/blob/v9.0.2/README.md)
- [Node 18.19.0 `crypto.scrypt`](https://nodejs.org/download/release/v18.19.0/docs/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback)
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP HTML5 Security Cheat Sheet: local storage](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [Pinned `auth.js`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/auth.js) and [user routes](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/server/src/routes/users.js)

Cross-links: [refresh-token gap](refresh-token-rotation.md), [CORS/sessions](../express/cors-sessions.md), [Node crypto](../node/streams-and-crypto.md), and [code audit](../CODE_AUDIT.md).
