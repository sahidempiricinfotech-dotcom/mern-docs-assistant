# Knowledge gap: refresh-token rotation

**Applies to:** `jsonwebtoken-9.0.2` only for token signing/verification. The application-specific rotation design is **version-unverified** because no refresh-token implementation or internal threat-model runbook is present. **Retrieved:** 2026-07-24.

## Verdict (Q26)

Low confidence. The exact `jsonwebtoken` README explains signing and verification but does not prescribe token-family storage, one-time-use rotation, reuse detection, device/session revocation, concurrency handling, or incident response. Those choices depend on this application's threat model and persistence design.

A Stack Overflow search for `[jsonwebtoken] refresh token rotation` returned zero results on 2026-07-24. No community answer was admitted. A generic high-vote answer from another library/version would not satisfy the version rule.

Required documentation to close the gap: an approved auth design specifying token family IDs, hashed refresh-token storage, atomic rotate/revoke semantics, replay detection, grace/concurrency policy, absolute and idle expiry, logout/revocation, signing-key rotation, and test cases. The internal [Security Best Practices](https://docs.google.com/document/d/1qlR9TmSUlsl916BGpjavqGZyzBzE-q3kKw-Z91bG29I) supports managed secret rotation but does not provide this design.

## Sources

- [`jsonwebtoken` README at v9.0.2](https://github.com/auth0/node-jsonwebtoken/blob/v9.0.2/README.md)
- [Stack Overflow tagged search](https://stackoverflow.com/search?q=%5Bjsonwebtoken%5D+refresh+token+rotation) — zero results; not used as positive evidence.
- [Internal Security Best Practices](https://docs.google.com/document/d/1qlR9TmSUlsl916BGpjavqGZyzBzE-q3kKw-Z91bG29I)

Cross-links: [JWT verification/storage](passwords-jwt-storage.md), [Mongo-backed sessions](../express/cors-sessions.md), [methodology](../METHODOLOGY.md), and gap row `G-002` in the sheet.
