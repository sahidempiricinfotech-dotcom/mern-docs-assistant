# Knowledge gap: testing a React 18 Suspense boundary

**Applies to:** `react-18.2.0`; React Testing Library version is **version-unverified** because it is not present in the repository. **Retrieved:** 2026-07-24.

## Verdict (Q24)

Low confidence. The official React 18 Suspense page explains boundary behavior but does not provide an end-to-end React Testing Library recipe. The current Testing Library examples page does not cover Suspense and does not establish a version matching this repository.

The Stack Overflow `[react-testing-library] suspense` tag search was reviewed. A candidate answer, “Not Supported Error when testing suspense,” was asked 2019-03-11 and answered 2019-06-06. It addresses a Babel dynamic-import transform from the React 16 era, not React 18.2 boundary behavior. It was therefore **rejected**: date and tool assumptions do not match the pinned React version, and the answer is not evidence for an RTL test recipe here.

Required documentation to close the gap: pin the test runner, jsdom environment, React Testing Library, user-event, and any Suspense data source; then document one passing boundary/fallback/resolution test against those exact versions.

## Sources

- [React 18 Suspense reference](https://18.react.dev/reference/react/Suspense)
- [Testing Library React example](https://testing-library.com/docs/react-testing-library/example-intro/) — `version-unverified`; contains no Suspense recipe.
- [Stack Overflow tag search](https://stackoverflow.com/search?q=%5Breact-testing-library%5D+suspense) — community discovery only.
- [Rejected 2019 Stack Overflow answer](https://stackoverflow.com/questions/55094484/not-supported-error-when-testing-suspense) — not used for the verdict.

Cross-links: [React 18 behavior](react-18-behavior.md), [methodology](../METHODOLOGY.md), and gap row `G-001` in the sheet.
