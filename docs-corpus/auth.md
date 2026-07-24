# Authentication and session topics

Pinned auth dependency: `jsonwebtoken@9.0.2`. Node 18.19.0 supplies `node:crypto`. `express-session`, a Mongo session store, and browser test libraries are not installed; entries that discuss them label that boundary.

## Password hashing (Q15)

**Pinned verdict:** hash on the server before persistence with a password-specific KDF, a random per-password salt, encoded parameters, and constant-time verification. On the pinned runtime, Node 18's versioned [`crypto.scrypt`](https://nodejs.org/docs/latest-v18.x/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) is available and recommends a random salt of at least 16 bytes.

**Repository contradiction:** `server/src/repositories/userRepo.js:12` trusts `input.passwordHash` and stores it directly. The server neither hashes a plaintext password nor validates a hash envelope, so the trust boundary is wrong. Password policy and cost parameters should be explicit and tested; never log or return password material.

Related: [Node scrypt](node.md#password-derivation-primitive-q15).

## JWT verification (Q16, Q32, Q34)

**Pinned verdict:** extract the bearer token and call `jwt.verify(token, configuredKey, { algorithms: [...] })`. Handle `TokenExpiredError` as 401; verify issuer/audience when the system defines them. Do not manually inspect `exp` after `decode()` as an acceptance check.

The exact [jsonwebtoken 9.0.2 README](https://github.com/auth0/node-jsonwebtoken/tree/v9.0.2#jwtverifytoken-secretorpublickey-options-callback) says `verify()` validates the signature and optional expiration/audience/issuer, while invalid/expired tokens produce an error.

**Repository contradictions:** `server/src/auth.js:11` uses `jwt.decode()`, so forged and expired tokens can be accepted. `server/src/auth.js:29` falls back to the known string `dev-secret`; startup should fail when a real secret/key is absent outside an explicitly isolated test environment.

The requested internal auth runbook was searched in the supplied Drive folder but was not present, so no link is invented.

Related: [Express middleware error flow](express.md#async-route-errors-q04-q31).

## Credentialed CORS (Q20)

For cookie authentication, configure both sides: explicit server origin plus credentials, and browser `fetch(..., { credentials: 'include' })` for a cross-origin request. See [Express/CORS](express.md#credentialed-cors-q20) and the [MDN Set-Cookie reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie), which states that CORS responses' `Set-Cookie` is ignored unless the request includes credentials.

## Browser token storage (Q25)

**Pinned verdict:** prefer a `Secure`, `HttpOnly`, appropriately `SameSite` cookie for a browser session/refresh credential rather than `localStorage`. `HttpOnly` prevents JavaScript access, reducing token theft through XSS; it does not eliminate CSRF, so SameSite/origin/CSRF defenses are still required.

The [OWASP HTML5 Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#local-storage) says not to store session identifiers in local storage because JavaScript can access them. The [MDN Set-Cookie reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) documents `HttpOnly`, `Secure`, and `SameSite` behavior. These are browser-platform/security sources rather than React-version claims.

## Refresh-token rotation (Q26)

**Low-confidence gap:** the protocol baseline is clear, but the app-specific design is not. [RFC 9700 §4.14.2](https://www.rfc-editor.org/rfc/rfc9700.html#name-recommendations) requires replay detection for public clients using sender-constrained tokens or rotation, describes invalidating the previous token while retaining family relationships, and recommends inactivity expiry/revocation on security events.

The repository has no refresh-token model, grant/family identifier, storage/reuse policy, client classification, or threat model. Therefore exact schema, lifetimes, concurrency handling, and reuse response remain a gap rather than a guessed implementation.

## Signed session cookies with Mongo (Q35)

**Pinned verdict:** this is an architectural alternative to the current JWT middleware, not a one-line addition. Add and pin `express-session` plus a maintained Mongo-compatible store; configure a strong external secret, `resave: false` when the store supports touch, `saveUninitialized: false`, and a cookie with `httpOnly`, `secure` in HTTPS production, and an explicit `sameSite` policy. Configure `trust proxy` correctly before secure cookies behind a proxy.

The tagged [`express-session@1.17.3` README](https://github.com/expressjs/session/tree/v1.17.3#options) documents that only the session ID is stored in the cookie, warns that `MemoryStore` is not for production, and defines these cookie/secret options. Applicability to a selected Mongo store is `version-unverified` until that dependency is chosen and locked; the answer is therefore Medium, not High.

Related: [credentialed CORS](express.md#credentialed-cors-q20) and [Mongo data access](data-access.md).

