# Auth And Sessions

Version tags:

- `jsonwebtoken@9.0.2` is pinned in `server/package-lock.json`.
- `express-session` and `connect-mongo` are not installed in this repo. Their README-backed entries are version-unverified until exact package versions are chosen.

Recency context: Auth design depends on application threat model and deployment details. Package docs can verify API behavior, but storage choices and refresh-token policies need internal security requirements.

## JWT Verification

Applies to: `jsonwebtoken@9.0.2`.

Source attribution:

- [auth0/node-jsonwebtoken README for `jwt.verify`](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback), package README, version-unverified for exact 9.0.2 text but directly relevant to the pinned package family.
- [auth0/node-jsonwebtoken README for `jwt.decode`](https://github.com/auth0/node-jsonwebtoken#jwtdecodetoken--options), package README, version-unverified for exact 9.0.2 text.
- Repo: `server/src/auth.js` decodes bearer tokens with `jwt.decode(token)`.

Verdict: Auth middleware must use `jwt.verify(token, secretOrPublicKey, options)`, not `jwt.decode()`, to enforce signature validity and expiry. `jwt.decode()` is only payload parsing and should not be trusted for user input.

Code contradiction: `server/src/auth.js` accepts any decodable token with a `sub`, including expired or unsigned/tampered tokens. That is why login/API access can appear to accept an expired token.

Related entries: [Credentialed CORS](express-4.md#credentialed-cors) and [JWT storage gap](#jwt-browser-storage).

## Password Hashing

Applies to: Node 18 backend, auth topic.

Source attribution:

- [Node 18 crypto docs](https://nodejs.org/docs/latest-v18.x/api/crypto.html), versioned for Node 18, document password-oriented key derivation APIs such as `crypto.scrypt()`.
- Repo: `server/src/repositories/userRepo.js` accepts `input.passwordHash` and stores it directly.

Verdict: The backend should hash passwords server-side with a password KDF such as Argon2, bcrypt, or Node's `crypto.scrypt()` with a per-user salt. The API should not trust a client-supplied `passwordHash`.

Code contradiction: `createUser()` stores `passwordHash` from the request body. The repo has no server-side password hashing or login password verification.

Confidence note: Medium, because the exact password KDF choice is an app security policy decision.

## JWT Browser Storage

Applies to: Browser auth design, not fully pinned by this repo.

Source attribution:

- [jsonwebtoken README](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) verifies token API behavior but does not prescribe browser storage.
- Repo: API uses bearer tokens and CORS credentials are enabled, but no cookie/session storage implementation exists.

Verdict: The corpus cannot make a high-confidence app-wide choice between localStorage and httpOnly cookies without a threat model. A defensible default for browser apps is to prefer httpOnly, Secure, SameSite cookies for server-issued session/refresh credentials and keep access tokens short-lived, but CSRF protections and cross-site deployment details must be designed.

Gap: Track as a knowledge gap for internal security policy.

## Refresh Token Rotation

Applies to: Auth design, not implemented in this repo.

Source attribution:

- `jsonwebtoken@9.0.2` docs cover token signing and verification but do not prescribe a refresh-token rotation architecture.
- Repo: no refresh-token model, store, endpoint, or revocation logic exists.

Verdict: The corpus cannot provide a high-confidence refresh-token rotation design for this app without internal security requirements. A future design must specify storage, token family identifiers, reuse detection, revocation, expiry, and audit behavior.

Gap: Track as a knowledge gap.

## Signed Session Cookies With Mongo

Applies to: Express session design, but package versions are not pinned here.

Source attribution:

- [expressjs/session README](https://github.com/expressjs/session), version-unverified for exact package version, documents server-side session data and signed session ID cookies.
- [connect-mongo README](https://github.com/jdesboeufs/connect-mongo), version-unverified for exact package version, documents a MongoDB session store for Express.
- Repo: `express-session` and `connect-mongo` are not dependencies.

Verdict: This repo cannot use signed session cookies backed by Mongo until it adds and pins `express-session` and a Mongo session store such as `connect-mongo`. The implementation should use a strong secret, httpOnly/Secure/SameSite cookie settings, a Mongo store configured with the existing Mongo client/URI, and explicit TTL/rotation policy.

Confidence note: Medium because the libraries are not currently pinned.
