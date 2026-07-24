# React and browser-boundary entries

## R01: React 19 Actions are not React 18

**Applies to:** React/React DOM **18.2.0 current**, **19** upgrade delta. **Evidence:** [React 18.0 release](https://react.dev/blog/2022/03/29/react-v18), [exact 18.2.0 release tag](https://github.com/facebook/react/releases/tag/v18.2.0), and [React 19 release](https://react.dev/blog/2024/12/05/react-19), which introduces function `<form action>`, `useActionState`, `useOptimistic`, and related form APIs. **Recency:** dated 2022 and 2024 release notes/tags, inspected 2026-07-24.

Do not use React 19 form Actions or `useActionState` in the pinned 18.2 client. Implement a normal controlled/uncontrolled submit handler with explicit pending/error state on 18, or make a coordinated, tested React and React DOM 19 upgrade. Current `react.dev` references are not by themselves proof an API existed in 18; the release boundary controls this verdict.

## R02: Suspense data fetching in React 18

**Applies to:** React **18.x**, specifically the pinned **18.2.0** line. **Evidence:** the [React 18 release's “Suspense in Data Frameworks” section](https://react.dev/blog/2022/03/29/react-v18#suspense-in-data-frameworks) recommends opinionated integrations such as Relay/Next/Hydrogen/Remix and does not recommend ad-hoc Suspense data fetching as a general strategy; it also retains `React.lazy` code splitting. The [living Suspense reference](https://react.dev/reference/react/Suspense) says Effect/event-handler fetching does not activate a boundary. **Recency:** dated 18 release is version evidence; current reference was inspected 2026-07-24 and is **`version-unverified`** for exact 18.2 details, so it is corroboration only.

Use a Suspense-enabled framework/data integration appropriate to React 18, or ordinary Effect/data-library loading and error state; do not throw arbitrary promises and call that a stable public data-fetching contract. `React.lazy` is the established client code-splitting case. The current repository's `LiveFeed` fetches in an Effect, so wrapping it in Suspense alone would not make that fetch suspend. Testing limitations are [R04](#r04-testing-a-suspense-boundary).

## R03: StrictMode effect cleanup

**Applies to:** React **18.2.0** development behavior. **Evidence:** [React 18 release](https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors) describes development StrictMode checks; the [living `useEffect` reference](https://react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts) describes the extra setup/cleanup cycle and matching cleanup. **Recency:** 18 release is version evidence; living reference inspected 2026-07-24 is **`version-unverified`** for exact patch and used as explanatory corroboration.

The development setup → cleanup → setup cycle is a stress test, not a production double mount to suppress. Make effects idempotent and undo subscriptions, timers, and in-flight work. [`main.jsx`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/src/main.jsx#L8) enables StrictMode, while [`LiveFeed.jsx`](https://github.com/sahidempiricinfotech-dotcom/mern-docs-assistant/blob/e508acf871cc5b8c09d4928ddfd246c8ecaccc6e/client/src/components/LiveFeed.jsx#L17) creates an interval without returning `clearInterval` cleanup: [C07](code-audit.md#c07-effect-timer-has-no-cleanup). Abort/ignore an obsolete request as appropriate too.

## R04: testing a Suspense boundary

**Applies to:** React **18.2.0** boundary semantics; React Testing Library integration is **`version-unverified`** because it is not a pinned dependency. **Sources:** [React 18 release](https://react.dev/blog/2022/03/29/react-v18#suspense-in-data-frameworks), [living Suspense reference](https://react.dev/reference/react/Suspense), and [Testing Library async methods](https://testing-library.com/docs/dom-testing-library/api-async/), all inspected 2026-07-24. The last two are living pages and do not establish an installed Testing Library/Jest version. The dated Stack Overflow candidate and its rejection are documented in [the source policy](README.md#source-version-and-recency-policy).

A bounded test shape is to render a real Suspense-enabled child, assert a fallback when it genuinely suspends, resolve the controlled dependency, then await the final UI with `findBy*` or `waitForElementToBeRemoved` as appropriate. Do not use arbitrary sleeps or assume an Effect fetch activates Suspense. The exact harness, React Testing Library version, data integration, fake-timer behavior, and error-boundary assertions are not present in this repo. **Low confidence / G-001**: an end-to-end version-pinned recipe remains a gap.

## R05: credentialed browser fetch and CORS

**Applies to:** browser Fetch behavior **`version-unverified`** as a living web-platform source; Express/cors server side is pinned in [E04](express.md#e04-credentialed-cors-server-side). **Evidence:** [MDN Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) describes default `same-origin` and `include` for cross-origin credentials; [MDN's wildcard credential error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSNotSupportingCredentials) explains the forbidden `*` combination. **Recency:** living references inspected 2026-07-24.

For a cross-origin cookie-authenticated request, the browser call needs `credentials: 'include'`; the server needs a specific trusted origin and credentials response support. CORS is not authentication or CSRF protection. The existing `LiveFeed` call is relative and does not establish a cross-origin credential flow. See [E04](express.md#e04-credentialed-cors-server-side) for the pinned middleware and [N01](node.md#n01-global-fetch) for the distinct Node global; both link back.
