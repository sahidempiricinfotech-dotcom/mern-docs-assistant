# React 18.2 behavior

## Form Actions and useActionState

Applicable version: **React 18.2.0**.

Verdict: not available in the pinned React release. The [React 19 release article](https://react.dev/blog/2024/12/05/react-19) identifies Actions, form action functions, and `useActionState` as React 19 additions. Use an ordinary submit handler and React 18 state today, or schedule an explicit React 19 upgrade.

## Suspense and data fetching

Applicable version: **React 18.2.0**.

Verdict: Suspense is supported, but bare React 18 does not expose the current `use(Promise)` model. Prefer a React-18-compatible framework/data library with documented Suspense integration, or fetch in an effect and manage loading/error state. The current [Suspense reference](https://react.dev/reference/react/Suspense) describes framework-maintained Promise caches and `use`; because that page is current and includes later React APIs, it is evidence for the upgrade direction, not proof that `use` exists in 18.2. The pinned boundary is the [React 18.2.0 tag](https://github.com/facebook/react/tree/v18.2.0).

Related: [Node 18 global fetch](../node/runtime-and-apis.md#global-fetch).

## StrictMode effect replay

Applicable version: **React 18.x**, including 18.2.0.

Verdict: in development StrictMode, React 18 simulates an unmount/remount and recreates effects to expose missing cleanup. Production does not do the extra cycle. The [React 18 Strict Mode documentation](https://legacy.reactjs.org/docs/strict-mode.html) states this version boundary directly.

Code impact: `LiveFeed` creates an interval but returns no cleanup; see [C08](../code-audit.md#c08-react-effect-leaks-an-interval).

## Suspense testing

Applicable version: **React 18.2.0**; testing recipe is **version-unverified**.

The official React docs explain Suspense behavior but do not provide an end-to-end React Testing Library recipe for the repository's environment. The [Stack Overflow react-testing-library tag](https://stackoverflow.com/questions/tagged/react-testing-library) was checked on 2026-07-20, but no answer with an explicit React 18.2 and testing-library version contract was accepted as evidence. This remains Knowledge Gap G-001.
