# Deterministic method

Applicable to: repository commit `e508acf871cc5b8c09d4928ddfd246c8ecaccc6e` on `main` and question dates 2026-06-15 through 2026-07-14 inclusive, using the Sheet timezone `Asia/Calcutta`.

## Version tagging

1. Resolve runtime versions from, in order: exact lockfile entry, exact manifest pin, runtime image or `.nvmrc`, then repository documentation.
2. Tag a source with a version only when its URL is versioned, it is a Git tag, or a release/changelog states the introduction/removal version.
3. If none of those exists, tag the source `version-unverified`.
4. When versions disagree, retain both claims, put the pinned-version result first, and record the upgrade delta.
5. Standards and security guidance that are not released with a MERN version are dated and labelled `not-versioned guidance`; they may support a security or web-platform recommendation but never establish a MERN version boundary.

## Routing

Route by the nouns and APIs in the question, not by the sheet's category hint. The stable routes are `node`, `express`, `react`, `mongodb-server`, `data-access`, `auth`, and `cross-stack`. Mixed questions receive all necessary routes. This corrects Q11's misleading `mongodb` hint and assigns the vague Q21, Q22, Q33, and Q34 rows from their wording plus repository code.

## Duplicate rule

Normalize lowercase text, remove punctuation and filler, then consolidate only when the requested decision and pinned-version answer are identical. The earliest question ID is canonical. Near-duplicates that require an additional technology or a different operational decision remain separate.

## Confidence rule

- **High:** a versioned official page or exact Git tag directly states the decisive claim, and repository context does not add an unresolved choice.
- **Medium:** versioned evidence directly supports the technical behavior, but the final operational choice depends on workload, threat model, or deployment details that are stated as assumptions.
- **Low:** any decisive MERN-version claim lacks direct version-applicable evidence, relies on a `version-unverified` source, conflicts with another authoritative source without a resolvable version boundary, or requires missing internal policy/test fixtures. Dated `not-versioned guidance` can support a security or web-platform recommendation only when no MERN version claim depends on it.

Low is below the acceptance bar. A Low row is not padded into an answer: it is marked `gap` in Questions and upserted into Knowledge Gaps. High and Medium count as answered with confidence.

## Priority rule for gaps

`priority score = frequency in the window × impact weight`, with impact weights Critical=4, High=3, Medium=2, Low=1. Sort descending by score, then topic, then related question IDs. Existing gap IDs are preserved; new IDs increment the largest numeric suffix. Human notes are never overwritten.

## Run date

Sources were checked in Chrome on 2026-07-21. Sheet writes use the completion date `2026-07-21`; verdicts, routing, version tags, duplicate keys, confidence states, and gap priority do not depend on the run date.
