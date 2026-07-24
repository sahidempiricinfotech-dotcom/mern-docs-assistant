# Deterministic method

Applies to corpus run `2026-07-24`, repository commit
`e508acf871cc5b8c09d4928ddfd246c8ecaccc6e`, and sheet window
`2026-06-15` through `2026-07-14` inclusive in `Asia/Calcutta`.

## Version resolution

Version facts are resolved in this fixed order:

1. Exact workspace lockfile value.
2. Exact runtime selector (`.nvmrc` or container image).
3. Manifest constraint.
4. README prose, used only as a consistency check.

Conflicts are retained. An entry can be tagged with a version only when a versioned URL, tagged README/release, archived manual, or changelog establishes applicability. Otherwise it is labelled `version-unverified`.

## Source precedence

1. Official versioned documentation.
2. Official changelog or release note.
3. README at an exact upstream tag.
4. Authoritative security guidance when the four product docs are silent.
5. Stack Overflow only after recording the post date and proving that its library/runtime assumptions match the pinned stack.

Official documentation wins on disagreement. Stack Overflow material that cannot pass the date/version test is recorded as rejected evidence and is not used for a verdict.

## Routing

Each question is normalized to lowercase with whitespace collapsed, then routed by the first matching rule:

- JWT, token, cookie, password, session: `auth`, plus `express` or `node` when the implementation depends on them.
- Mongo server operators, write concern, time series: `mongodb/server`.
- driver, Mongoose, cursor, transaction, bulk write, pool: `mongodb/data-access`.
- route, middleware, JSON body, CORS, HTTP response: `express`.
- component, Effect, StrictMode, Suspense, Action: `react`.
- runtime, module loading, test runner, streams, global APIs: `node`.

Mixed questions keep every matching route in the order above. The exact results are in [ANSWER_MAP.md](ANSWER_MAP.md).

## Duplicate rule

Rows consolidate only when they ask for the same decision and differ by no material version, topology, security, or code constraint. Canonical selection is deterministic:

1. A row with a human note containing required context wins.
2. A specific technology/action/behavior question wins over a vague or symptom-only form.
3. Then earlier logged date wins.
4. Then lexicographically smaller question ID wins.

This produces canonical rows Q01, Q14, and Q16 for the duplicate clusters in this run.

## Confidence rule

- **High:** the verdict is directly supported by official versioned material or an exact tagged upstream README/release, and any relevant repository code was checked.
- **Medium:** official material establishes the safe boundary but does not prescribe one operational value, or an authoritative security source fills a product-documentation omission. The answer states the boundary rather than inventing a value.
- **Low:** version applicability cannot be established; official sources are silent on the requested app-specific design; sources conflict without a versioned resolution; or the result depends on an unstated threat model or third-party behavior.

The acceptance bar is **Medium or High**. Low-confidence rows receive status `gap`, point to an existing/upserted Knowledge Gaps row, and are not padded with a speculative answer.

## Gap priority

Frequency is the number of in-window questions in the unresolved cluster. Impact weights are Critical=4, High=3, Medium=2, Low=1. Priority score is `frequency × impact weight`; ties sort by higher impact, then normalized topic. The sheet displays the impact label rather than the numeric score.

## Recency and reproducibility

All pages were checked in Chrome on 2026-07-24 IST. Current, unversioned pages are never silently treated as pinned-version pages. For example, React 19 Actions and MongoDB 5.1 sharded `$lookup` are retained only as upgrade deltas.

Sources: [repository commit](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/commit/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e), [Node 18.19.0 archive](https://nodejs.org/download/release/v18.19.0/docs/api/), [MongoDB 5.0 archive](https://www.mongodb.com/docs/v5.0/), and exact upstream tags linked from [VERSION_MATRIX.md](VERSION_MATRIX.md).
