# MERN versioned documentation corpus

This corpus is an answer index for the **2026-06-15 through 2026-07-14 inclusive, Asia/Calcutta** question window. It is intentionally bounded to this repository's Node, Express, React, MongoDB, authentication, and data-access questions. Research was checked in Chrome on **2026-07-24**. It is not a claim that the linked living documentation is frozen on that date.

Start with [the version baseline](versions.md), then use the routed entry below. The repository input is pinned to [`e508acf871cc5b8c09d4928ddfd246c8ecaccc6e`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/tree/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e), not a moving reading of `main`.

## Index

| Slice | Entries |
| --- | --- |
| Runtime and interoperability | [Node](node.md) |
| HTTP framework | [Express](express.md) |
| UI and browser boundary | [React](react.md) |
| Database server semantics | [MongoDB server](mongodb-server.md) |
| Driver and ODM | [Data access](data-access.md) |
| Authentication and sessions | [Auth](auth.md) |
| Repository discrepancies | [Code audit](code-audit.md) |
| Question-state ledger | [Run audit](audit.md) |

## Deterministic routing and consolidation

Route on the operation being asked about, not the supplied category hint. A mixed question gets every relevant slice in the order **server/runtime → framework/driver → browser/UI → security**. A wrong hint is retained in the sheet but does not determine the route. Vague rows are interpreted against the pinned code and the interpretation is stated. Deduplication is semantic, not string equality: a row is consolidated only if its requested decision and version boundary are wholly covered by an earlier canonical row. The canonical ID is the lowest in-window `Q` number. A broader or additional operation remains separate.

| Question family | Canonical route | Consolidated rows |
| --- | --- | --- |
| Built-in `fetch` | [N01](node.md#n01-global-fetch) | Q30 → Q01 |
| Rejected async Express route | [E01](express.md#e01-async-errors-in-express-4-and-5), [D01](data-access.md#d01-driver-5-callback-removal) when diagnosing the login hang | Q31 → Q04 |
| JWT verification/expiry | [A02](auth.md#a02-jwt-verification-and-expiry) | Q32, Q34 → Q16 |
| Mongoose option spelling | [D02](data-access.md#d02-mongoose-and-driver-pools) | Q33 → Q14 |
| Production pool capacity | [D02](data-access.md#d02-mongoose-and-driver-pools) | Q27 remains a distinct capacity gap |
| Mongo-to-HTTP CSV | [D05](data-access.md#d05-cursor-streaming), [N05](node.md#n05-streams-and-http-pipelines), [E06](express.md#e06-streaming-an-http-response) | Q36 remains distinct from Q22 |

The full per-row route and terminal state are in [audit.md](audit.md). In particular, Q11 is routed to Express despite its `mongodb` hint, Q20 to Express/CORS plus the browser boundary despite its `react` hint, and Q36 is decomposed into cursor, transform, HTTP response, and browser download concerns.

## Source, version, and recency policy

1. The package and lockfile pins, `.nvmrc`, and compose image are the local version evidence. Do not conflate the **MongoDB server 5.0** image with the **Node driver 5.9.2** package.
2. A versioned official URL, a tagged upstream repository, or an explicit release/changelog statement establishes a tag. The evidence is written beside each entry. A major/minor documentation line is not silently promoted to an exact patch guarantee.
3. A living page whose applicability cannot be established is labeled **`version-unverified`**. It can inform a bounded answer but cannot alone produce High confidence for a pinned-library behavior. Retrieval date and source type are recorded.
4. Official project documentation and release notes outrank README examples; an upstream tagged README outranks a community answer. Stack Overflow is supporting evidence only after date, version, and applicability checks. If official documentation and Stack Overflow conflict, the official source wins unless the official source is genuinely silent; the conflict and remaining uncertainty must be stated.
5. Archived MongoDB 5.0 pages are deliberately used because they match the deployment. Their archive banner is recency context, not a reason to replace their semantics with current manual semantics.

**Stack Overflow review.** The [`reactjs` tag/search](https://stackoverflow.com/search?q=%5Breactjs%5D+Suspense+React+Testing+Library) was inspected on 2026-07-24. The candidate [question 62613166](https://stackoverflow.com/questions/62613166/why-doesnt-the-loader-show-on-the-second-test-when-i-run-the-same-test-twice-in) was asked 2020-06-27 and its answer 2020-06-28. It predates React 18 and concerns a detached custom test container, not a general React 18 Suspense data-boundary recipe. It is **not accepted into the corpus as proof for Q24**. The [MongoDB tag page](https://stackoverflow.com/questions/tagged/mongodb) was also reachable; no answer from it was needed where the versioned MongoDB manual and driver API were sufficient. No Stack Overflow answer overrode an official source in this run.

## Confidence and gap rule

Apply this rule to each canonical row before writing it:

- **High:** a directly applicable, version-evidenced primary source supports the central behavior; the repository code and deployment anchor were checked; no material environment or threat-model choice is unresolved.
- **Medium:** the central answer is supported but a boundary source is living/`version-unverified`, a deployment choice remains, or the answer is a bounded pattern rather than a guaranteed parameter. State the assumption and limitation. Medium is an answered state, not a disguised gap.
- **Low:** the central requested decision cannot be established for the pinned version, the needed package/version or internal policy is absent, the source is too thin for the end-to-end case, or a workload/threat-model measurement is necessary. **Every Low row has a Knowledge Gaps row** and status `gap`; it may contain a clearly labeled provisional boundary, never a confident prescription.

Gap priority is deterministic. Frequency is the number of in-window rows in the same semantic topic family, including duplicates. Impact weight is High = 3 (security, data loss, outage), Medium = 2 (correctness or test reliability), Low = 1. Score = frequency × impact weight; High priority is score ≥ 3, Medium is 2, Low is 1. Rank descending score, then canonical question ID. Existing gap IDs and human notes remain in place even when the physical row order differs from rank.

## Audit contract

The ledger has 36 in-window rows: **27 answered with High or Medium confidence, 5 consolidated, 4 Low/gap**. There are **8 distinct repository discrepancy IDs** in [code-audit.md](code-audit.md); repeated mentions in answers do not inflate that count. Every corpus citation used by a sheet answer resolves to a section in this folder. The Teams summary is derived from these terminal states after read-back, not from an estimate.
