# Source and trust ledger

Checked: **2026-07-20 in Chrome**.

| Source class | Version evidence | Trust treatment |
| --- | --- | --- |
| Node exact release docs | `/download/release/v18.19.0/` and 18.19.0 release page | Direct evidence for Node 18.19.0 |
| Express docs | 4.x API plus exact `4.18.2` Git tag; migration guide states 5.x deltas | Direct when the 4/5 boundary is explicit |
| React docs | exact `v18.2.0` tag, legacy React 18 StrictMode page, React 19 release article | Current pages are not assumed to describe 18.2 |
| MongoDB manual | `/docs/v5.0/` pages plus current history notes | Direct for 5.0; current pages used only for explicit introduction/change notes |
| Driver/Mongoose docs | driver `v5.9.2` tag, official driver `v5.0.0` release notes, version-5 breaking-change guide, Mongoose `/7.x/` docs | Direct within documented API line; the release note independently confirms callback removal |
| GitHub READMEs | exact dependency tags where available | Direct for tagged package version |
| Internal API Authentication Guide | document last updated 2026-06-10 | Authoritative for company token contract, not upstream library behavior |
| OWASP cheat sheets | no MERN version tag | Current security guidance only; never used to claim a library version |
| Stack Overflow MongoDB `$in` answer | posted 2013; explicitly discusses MongoDB 2.4-era BSON limit | Historical context only; MongoDB 5.0 official “tens” guidance wins |
| Stack Overflow react-testing-library tag | tag page checked 2026-07-20 | No answer with explicit React 18.2/test-library applicability was trusted; `version-unverified` |
