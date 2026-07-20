# Repository contradictions

Counted contradictions: **8**. IDs and file locations are stable audit keys.

## C01 Authentication decodes instead of verifying

`server/src/auth.js:11` calls `jwt.decode(token)`. Decode does not validate signature or expiration. It contradicts [JWT verification](auth/authentication.md#jwt-verification-and-expiry).

## C02 Token issuer contract is not implemented

`server/src/auth.js:27-30` signs HS tokens using `JWT_SECRET || 'dev-secret'` and does not set/validate issuer or audience. The internal runbook requires ES256 plus fixed issuer/audience. This contradicts [JWT verification](auth/authentication.md#jwt-verification-and-expiry).

## C03 Registration trusts and returns passwordHash

`server/src/repositories/userRepo.js:7-16` stores `input.passwordHash` and returns the stored document; `server/src/routes/users.js:10-11` sends it to the client. Hashing must happen server-side and password hashes must not be returned. This contradicts [Password hashing](auth/authentication.md#password-hashing).

## C04 Login does not verify a password

`server/src/routes/users.js:17-27` checks only that an email exists, then issues a token. This contradicts [Password hashing](auth/authentication.md#password-hashing) and the internal authentication contract.

## C05 Mongoose 7 receives removed connection options

`server/src/db.js:9-15` passes `useNewUrlParser`, `useUnifiedTopology`, `useFindAndModify`, and `poolSize`. Mongoose 6+ removed those deprecation options and replaced `poolSize` with `maxPoolSize`; see [Connection pool sizing](data-access/driver-and-mongoose.md#connection-pool-sizing).

## C06 Driver 5 call uses a removed callback API

`server/src/repositories/userRepo.js:22-30` calls `findOne(query, callback)`. Driver 5 removed callback support; see [Promise-only driver calls](data-access/driver-and-mongoose.md#promise-only-driver-calls).

## C07 Express 4 async routes do not forward errors

`server/src/routes/orders.js:7-19` uses async handlers without `try/catch`, `.catch(next)`, or a wrapper. Rejections can bypass the error middleware on Express 4; see [Async error forwarding](express/api-behavior.md#async-error-forwarding).

## C08 React effect leaks an interval

`client/src/components/LiveFeed.jsx:6-19` creates an interval without returning `clearInterval(timer)`. React 18 development StrictMode remounts effects, exposing duplicate polling; see [StrictMode effect replay](react/react-18.md#strictmode-effect-replay).
