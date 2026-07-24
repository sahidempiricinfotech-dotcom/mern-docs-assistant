# React 18.2 features, Suspense, and Effects

**Applies to:** `react-18.2.0` and `react-dom-18.2.0`. **Retrieved:** 2026-07-24. React 18 behavior is sourced from the React 18 archive; current React 19 pages are used only as upgrade evidence.

## Form Actions and `useActionState` (Q05)

They are React 19 features and are unavailable in React 18.2. Use an `onSubmit` handler with explicit pending/error state on the pinned client, or plan and test a React 19 upgrade before adopting Actions.

## Suspense data fetching (Q10)

In React 18.2, supported activators include lazy-loaded component code and data sources supplied by a Suspense-enabled framework. The React 18 archive says framework-free Suspense data-source integration is unstable and undocumented. Fetching inside an Effect does not activate Suspense.

For this repository, keep the explicit Effect/loading-state approach unless the team adopts a version-checked Suspense-enabled data layer. Do not paste an undocumented Promise-throwing cache into production.

## StrictMode and Effects (Q12)

React deliberately performs an extra development-only Effect setup/cleanup cycle to expose missing cleanup. `LiveFeed.jsx` creates an interval and never returns `clearInterval(timer)`, so StrictMode reveals a real leak: development can accumulate duplicate timers, and unmounting leaves work behind. Add cleanup and prevent stale requests from committing after unmount.

## Upgrade delta

React 19 makes Actions and `useActionState` available. That does not make them valid on 18.2.0. Re-test Suspense and StrictMode behavior against the selected framework and test-library versions during an upgrade.

## Sources

- [React 18.2.0 release](https://github.com/react/react/releases/tag/v18.2.0)
- [React 18 Suspense reference](https://18.react.dev/reference/react/Suspense)
- [React 18 StrictMode reference](https://18.react.dev/reference/react/StrictMode)
- [React 18 `useEffect` reference](https://18.react.dev/reference/react/useEffect)
- [React 19 release: Actions](https://react.dev/blog/2024/12/05/react-19)
- [Pinned `LiveFeed.jsx`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/src/components/LiveFeed.jsx)

Cross-links: [Suspense testing gap](suspense-testing.md), [Node runtime](../node/runtime-and-modules.md), and [code audit](../CODE_AUDIT.md).
