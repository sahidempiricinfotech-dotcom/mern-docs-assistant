# React 18.2.0

Pinned evidence: `client/package.json` and `client/package-lock.json` lock React and React DOM 18.2.0. The historical `18.react.dev` site is used for version applicability; current React 19 pages are upgrade-only evidence.

## Form Actions and `useActionState` (Q05)

**Pinned verdict:** no. React 18.2.0 does not provide React 19 form Actions or `useActionState`. Use an ordinary submit handler with React 18 state, or schedule a separately reviewed React 19 upgrade.

The official [React 19 release post](https://react.dev/blog/2024/12/05/react-19) says React 19 adds function-valued form actions and introduces `React.useActionState`. That release boundary is the version evidence.

## Suspense data fetching (Q10)

**Pinned verdict:** use a Suspense-enabled framework/data source or `lazy` for code loading. Do not make an ordinary fetch in an Effect and expect React 18 Suspense to observe it. The versioned [React 18 Suspense page](https://18.react.dev/reference/react/Suspense) says Effect/event-handler fetching is not detected and that framework-free data-source integration is unstable and undocumented.

**Repository check:** the client performs ordinary Effect-based fetching; it does not contain a Suspense-enabled data layer.

## StrictMode Effects (Q12)

**Pinned verdict:** the extra development run is intentional. The versioned [React 18 StrictMode page](https://18.react.dev/reference/react/StrictMode) says Effects are re-run an extra time in development to expose missing cleanup; production is unaffected.

**Repository contradiction:** `client/src/components/LiveFeed.jsx:18` creates an interval but the Effect returns no cleanup. With the root StrictMode wrapper in `client/src/main.jsx:8`, development can create duplicate polling and expose the leak. Return `() => clearInterval(timer)` and abort/ignore an in-flight fetch during unmount.

## Suspense component testing (Q24)

**Low-confidence gap:** the React 18 page defines boundary behavior but does not provide an end-to-end React Testing Library recipe, and this repository does not pin Jest, Vitest, React Testing Library, React Query, or another Suspense data source. A 2023 [Stack Overflow question](https://stackoverflow.com/questions/75717267/react-testing-library-react-query-promise-isnt-resolved-while-testing) names React 18 and React Testing Library 14 but has no answer and depends on React Query 3.3, which this repo does not use. It is recorded as version-checked but not trusted evidence.

The stable assertion contract is only: render a controlled suspending child inside the boundary, assert the fallback, resolve the controlled resource inside the test runner's async update mechanism, then assert revealed content. Exact code remains a gap until the test runner, Testing Library, and Suspense data-source versions are pinned.

