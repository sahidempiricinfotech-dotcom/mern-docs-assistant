# Authentication, passwords, tokens, and sessions

## Password hashing

Applicable version: **Node.js 18.19.0** plus current security guidance checked 2026-07-20.

Verdict: never accept a client-supplied `passwordHash`. Hash the plaintext password server-side with Argon2id through a maintained package, or use Node 18's built-in `crypto.scrypt()` with a unique random salt and stored parameters. The exact [Node 18.19 crypto API](https://nodejs.org/download/release/v18.19.0/docs/api/crypto.html#cryptoscryptpassword-salt-keylen-options-callback) proves scrypt availability. The [OWASP password storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) supplies current algorithm priorities; it is not a MERN version claim.

Code impact: [C03 and C04](../code-audit.md#c03-registration-trusts-and-returns-passwordhash).

## JWT verification and expiry

Applicable version: **jsonwebtoken 9.0.2** and the internal API Authentication Guide last updated 2026-06-10.

Verdict: call `jwt.verify()`, never `jwt.decode()` for authorization. Pin allowed algorithms and validate issuer and audience; `verify` rejects expired tokens unless `ignoreExpiration` is deliberately enabled. Evidence: the exact [jsonwebtoken v9.0.2 README](https://github.com/auth0/node-jsonwebtoken/blob/v9.0.2/README.md) and the internal [API Authentication Guide](https://docs.google.com/document/d/1gersT0YyHWgibi8GvOW1gGLHbvK5oDFfjp3JrZU8P74), which requires ES256, issuer `https://auth.company.example`, audience `api.company.example`, and 15-minute access tokens.

Code impact: [C01 and C02](../code-audit.md#c01-authentication-decodes-instead-of-verifying).

## Browser token location

Applicable version: security design guidance, not a library-version claim.

Verdict: do not persist session identifiers or refresh tokens in `localStorage`; JavaScript can read them after XSS. Prefer a `Secure; HttpOnly; SameSite` cookie for a refresh/session credential, add CSRF defenses when cookies authenticate requests, and keep a short-lived bearer access token in memory when the internal API contract requires the `Authorization` header. The [OWASP HTML5 guidance](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html) directly warns against localStorage for session identifiers. This is Medium confidence because final placement depends on the browser/API threat model.

Related: [Credentialed CORS](../cross-stack/http-and-streaming.md#credentialed-cors).

## Refresh-token rotation

Applicable version: **version-unverified for this application's authorization server**.

Current guidance says refresh tokens should be sender-constrained or rotated, but it does not define this application's token-family schema, replay response, device policy, or revocation guarantees. The [OWASP OAuth2 guidance](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html) is directional only. This remains Low confidence and Knowledge Gap G-002.

## Signed sessions stored in MongoDB

Applicable versions: candidate `express-session` **1.17.3** and `connect-mongo` **5.1.0**; neither package is currently installed.

Verdict: add explicit dependencies, configure `express-session` with an environment-backed secret, `resave: false`, `saveUninitialized: false`, and production cookie flags; use `connect-mongo` as the server-side store. The cookie holds only the session ID. Exact tag evidence: [express-session 1.17.3 README](https://github.com/expressjs/session/blob/v1.17.3/README.md) and [connect-mongo 5.1.0 README](https://github.com/jdesboeufs/connect-mongo/blob/v5.1.0/README.md), which states support for driver 5/6 and MongoDB 3.6+. Do not copy this configuration without first pinning those dependencies and adding CSRF/session lifecycle tests.

Related: [Credentialed CORS](../cross-stack/http-and-streaming.md#credentialed-cors) and reciprocal Node-side [cryptographic session secret generation](../node/runtime-and-apis.md#cryptographic-session-secrets).
