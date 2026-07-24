# Deterministic routing, consolidation, and confidence policy

## Question window

Include a row when its `date logged (IST)` is from 2026-06-15 through 2026-07-14, inclusive, using the spreadsheet timezone `Asia/Calcutta`. The resulting set is Q01–Q36 (36 rows). QX1–QX4 are outside the window.

## Routing

Normalize the question to lowercase, remove punctuation, and route by the first matching topic set below. Mixed questions receive every matching route in the fixed order shown.

1. `node`: runtime, global fetch, `.env`, `node:test`, CommonJS/ESM, HTTP streams.
2. `express`: route, middleware, error handler, body parser, CORS.
3. `react`: component, hook, effect, StrictMode, Suspense, form Actions.
4. `mongodb-server`: server feature, aggregation operator, write concern, time-series, server limit.
5. `data-access`: MongoDB driver, cursor, transaction, bulk write, Mongoose, pool.
6. `auth`: JWT, password, cookie, session, refresh token.

The Sheet's category hint is advisory. For example, Q11 is routed to Express even though its hint says `mongodb`.

## Duplicate consolidation

Two rows are duplicates when the requested decision and pinned-version behavior are identical after routing. Choose the canonical row by earliest logged date, then lexicographically smallest question ID. Near-duplicates that require different operational evidence remain separate.

Applied groups:

- Q30 → Q01 (Node global fetch)
- Q31 → Q04 (Express 4 async rejection handling)
- Q32 → Q16 (JWT expiry verification)
- Q33 → Q14 (Mongoose pool configuration; interpreted from the code context)
- Q34 → Q16 (expired JWT accepted because the app decodes instead of verifies)

Q27 is not consolidated into Q14: Q14 asks which option/configuration to use, while Q27 asks for an exact production value that requires workload and topology evidence.

## Confidence scoring

Score four dimensions from 0–2; the sum is stable for the same sources and repository.

| Dimension | 2 | 1 | 0 |
| --- | --- | --- | --- |
| Authority | Versioned/tagged primary source | Unversioned primary source | Secondary source only or none |
| Version applicability | Exact pinned version/range is evidenced | Adjacent version with an explicit compatibility bridge | Applicability unverified or conflicting |
| Repository fit | Relevant code/config is present and inspected | Generic answer; code is not involved | Required local context is missing |
| Completeness | Source directly resolves the decision | Source resolves only part of the decision | Answer would be speculative |

- **High:** 7–8
- **Medium:** 5–6
- **Low:** 0–4

Low is the gap threshold. A Low row is entered in `Knowledge Gaps`; it is not padded into a plausible answer.

## Community-source rule

A Stack Overflow answer is eligible only when its date, named library versions, accepted/up-vote state, and consistency with pinned primary docs are recorded. The 2023 React 18 / React Testing Library 14 Suspense question inspected for Q24 had no answer and the repository has no Testing Library version, so it is not promoted into evidence; Q24 remains a gap.

