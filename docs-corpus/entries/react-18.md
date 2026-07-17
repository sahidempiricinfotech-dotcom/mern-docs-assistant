# React 18

Version tag: `react@18.2.0`, `react-dom@18.2.0`.

Evidence:

- Repo: `client/package-lock.json` pins `react@18.2.0` and `react-dom@18.2.0`.
- Release evidence: [React v18.0 release post](https://react.dev/blog/2022/03/29/react-v18), describing the React 18 major line.

Recency context: react.dev now defaults to current React 19.2 pages, so current reference pages are not automatically valid for this repo. React 18 release posts are preferred for version-specific claims.

## Actions And useActionState

Applies to: Not available in React 18.2.0.

Source attribution:

- [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide), release evidence for the React 19 line.
- [useActionState reference](https://react.dev/reference/react/useActionState), current docs page, version-unverified for React 18 and visibly current to React 19.2 in the docs shell.
- Repo: `client/package-lock.json` pins React 18.2.0.

Verdict: Do not build the support form on React form actions or `useActionState` while this repo is on React 18.2.0. Use controlled forms, ordinary submit handlers, or a framework-provided mutation layer.

Upgrade delta: On React 19, actions and `useActionState` become relevant, but the app must first upgrade React and address React 19 migration warnings.

## Suspense Data Fetching

Applies to: React 18.2.0.

Source attribution:

- [React v18.0 release post](https://react.dev/blog/2022/03/29/react-v18), which says Suspense data fetching is intended through opinionated frameworks and ad hoc Suspense data fetching is not recommended as a general strategy.
- [Suspense reference](https://react.dev/reference/react/Suspense), current docs page, version-unverified for React 18 details but useful for the general constraint that Suspense does not detect fetches inside Effects or event handlers.

Verdict: In this Vite React 18 app, do not hand-roll Suspense data fetching by throwing Promises from arbitrary components. Use normal state/effect loading, or adopt a Suspense-enabled data framework deliberately.

Related entry: [HTTP streaming](node-18.md#http-streaming), because streaming APIs are server-side; React Suspense does not make a plain REST fetch Suspense-aware by itself.

## StrictMode Effect Re-Runs

Applies to: React 18 development behavior, present in this repo.

Source attribution:

- [React StrictMode reference](https://react.dev/reference/react/StrictMode), current docs page, version-unverified for React 18 but consistent with the React 18 development checks.
- Repo: `client/src/main.jsx` wraps `<App />` in `<React.StrictMode>`.

Verdict: Seeing an Effect run twice in development is expected when StrictMode is enabled. Effects must be idempotent and clean up subscriptions, timers, and network-driven state.

Code context: `client/src/components/LiveFeed.jsx` starts an interval in an Effect but does not return `clearInterval(timer)`. StrictMode makes that missing cleanup more visible.

## Suspense Testing Gap

Applies to: React 18.2.0 testing questions.

Source attribution:

- [Suspense reference](https://react.dev/reference/react/Suspense), current docs page, version-unverified for React 18 testing recipes.
- Stack Overflow tag check: [reactjs+suspense tag page](https://stackoverflow.com/questions/tagged/reactjs+suspense) did not provide a version-checkable accepted-answer source for this run.

Verdict: The corpus does not have a high-confidence, version-specific React Testing Library recipe for Suspense boundary behavior. Track this as a knowledge gap rather than inventing a recipe from unversioned community answers.
