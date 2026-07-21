# Authentication and credential handling

These entries are pinned to installed `jsonwebtoken@9.0.2` and Node 18.19.0. Designs requiring packages the repository does not install remain explicit gaps rather than receiving guessed version tags.

## JWT verification

**Applies to:** `jsonwebtoken@9.0.2`. **Confidence: High.**

Use `jwt.verify(token, configuredKey, options)` and accept the payload only after it succeeds. `verify()` checks the signature and, unless explicitly disabled, expiration; pin the allowed `algorithms` and validate expected `issuer`/`audience` where the issuer contract provides them. Distinguish `TokenExpiredError` only after verification; `jwt.decode()` is an untrusted parse, not authorization. Source: immutable [node-jsonwebtoken v9.0.2 README](https://github.com/auth0/node-jsonwebtoken/tree/v9.0.2), which says `verify()` returns a payload only when signature and optional expiry/audience/issuer checks are valid.

`server/src/auth.js:11-20` instead authorizes the unverified output of `jwt.decode()`. An attacker can alter `sub`, `email`, `roles`, or `exp` and still reach protected orders. `signAccessToken()` creates 15-minute tokens, but the middleware never verifies that signature/expiry. Replace decode with verify and fail closed if `JWT_SECRET` is missing; the current `'dev-secret'` fallback is also unsafe outside local development.

## Password storage

**Applies to:** Node 18.19.0 mechanics; service policy incomplete. **Confidence: Low -> Knowledge Gap.**

`server/src/routes/users.js:10-11` accepts the request's `passwordHash`, `userRepo.js:7-16` stores it unchanged, and the API returns the whole stored object including the hash. The login route only looks up email and does not verify a supplied password. At minimum, accept a password, derive a credential server-side with an approved KDF and unique random salt, store only the credential material, compare on login, and never serialize it. Node's built-in mechanism is [Node 18.19.0 `crypto.scrypt()`](node-18.md#password-derived-keys), but the official Node API does not select the organisation's accepted KDF/parameters or migration policy. Q15 therefore goes to a gap rather than pretending the built-in primitive alone is a complete answer.

## Token location and refresh rotation

**Applies to:** application/browser threat model; no installed session/refresh-token subsystem. **Confidence: Low -> Knowledge Gaps.**

Official Node, Express, React, and jsonwebtoken docs do not determine whether this particular client should keep an access token in memory, an HttpOnly cookie, or another store, because CSRF/XSS exposure, same-site deployment, device/session revocation, and API/browser clients are not specified. There is also no refresh-token schema, replay detection, rotation family, or revocation store in the repo. A definitive storage choice (Q25) and a rotation protocol (Q26) are separate gaps.

Stable bounded facts: an HttpOnly cookie prevents JavaScript from reading the token but requires a CSRF/SameSite/origin policy; localStorage is script-readable and increases impact of XSS. Rotation requires single-use refresh tokens, server-side state (normally hashed), atomic replacement, and reuse detection if that is the selected security model. These are not tagged to a MERN version because they are not established by a pinned source here.

Related server transport: [credentialed CORS](express-4.md#credentialed-cors). JWT access-token verification is independently complete in [JWT verification](#jwt-verification).

## Mongo-backed signed sessions

**Applies to:** no compatible package version is pinned. **Confidence: Low -> Knowledge Gap.**

The repository does not install `express-session` or a Mongo session store. Their current READMEs can describe an architecture, but cannot yield a deterministic, version-accurate setup without selecting and pinning compatible releases. Candidate upstream sources are [express-session README](https://github.com/expressjs/session) and [connect-mongo README](https://github.com/jdesboeufs/connect-mongo); both are deliberately tagged **version-unverified** for this corpus because their default-branch text can move and there is no matching lockfile entry. Q35 belongs in the gap tab until package/version, session lifetime, cookie attributes, proxy/TLS topology, and store indexes are chosen.

