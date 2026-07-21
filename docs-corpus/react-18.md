# React and ReactDOM 18.2.0

`client/package.json` and `client/package-lock.json` pin both packages to 18.2.0. The dated [React 18 release](https://react.dev/blog/2022/03/29/react-v18) is major-version evidence. Current undated react.dev reference pages are not silently tagged 18.2; where used, they are marked version-unverified.

## Form Actions and `useActionState`

**Applies to:** React 18.2.0, with a React 19 delta. **Confidence: High.**

They are not React 18.2 APIs. Keep a normal event handler/state approach or an 18-compatible form library. The official [React 19 release](https://react.dev/blog/2024/12/05/react-19) says React 19 adds function-valued form `action`/`formAction` props and introduces `React.useActionState`. This is positive evidence that copying the current React 19 reference into this 18.2 client is wrong.

## Suspense and data fetching

**Applies to:** React 18.2.0. **Confidence: High.**

For React 18, use Suspense for data fetching through an integration that was designed for it (the release names frameworks such as Relay, Next.js, Hydrogen, or Remix). Do not make an arbitrary `fetch()` in `useEffect` “suspend”; ad hoc Suspense data fetching was possible but explicitly not recommended as a general strategy. The exact major-version source is [React 18: Suspense in data frameworks](https://react.dev/blog/2022/03/29/react-v18#suspense-in-data-frameworks).

The current app's `LiveFeed.jsx` is an effect-driven polling client and has no Suspense-aware data source. How to test a Suspense-aware third-party integration is separately a [testing documentation gap](#suspense-testing-gap).

## Strict Mode effects

**Applies to:** React 18.2.0 development builds. **Confidence: High.**

React 18 Strict Mode deliberately mounts, cleans up, and remounts effects in development to expose non-reusable side effects; production is not double-mounted. Effects must therefore return cleanup and be safe to repeat. Sources: [React 18 upgrade guide: Strict Mode](https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-strict-mode) and the [React 18 release](https://react.dev/blog/2022/03/29/react-v18), both dated and explicitly versioned.

`client/src/main.jsx:8-10` enables `StrictMode`. `client/src/components/LiveFeed.jsx:18-19` creates an interval but returns no cleanup, so each development remount leaves another poller. Return `() => clearInterval(timer)`; if request races matter, also abort or ignore an obsolete in-flight request. This is a repository contradiction, not a reason to remove Strict Mode. The server-side credential policy for those fetches is in [Express CORS](express-4.md#credentialed-cors).

## Suspense testing gap

The official React 18 material explains Suspense semantics but does not specify a React Testing Library recipe for this repository, and React Testing Library is not a pinned dependency. Current react.dev reference pages are **version-unverified** for an exact 18.2 test recipe. Therefore Q24 stays Low and is routed to the Knowledge Gaps tab rather than padded with an unverified pattern.

