# Version inventory and recency

Evidence was captured on 2026-07-24 IST.

| Technology | Repository source of truth | Effective version | Reproducibility note |
| --- | --- | --- | --- |
| Node.js | [`.nvmrc`](../.nvmrc), [`docker-compose.yml`](../docker-compose.yml), root/server `engines` | 18.19.0 for local/container; allowed major range `>=18 <19` | Exact local/container patch is pinned. Node 18 is EOL as of 2025-03-27 per the [official release table](https://nodejs.org/en/about/previous-releases). |
| Express | [`server/package.json`](../server/package.json), [`server/package-lock.json`](../server/package-lock.json) | 4.18.2 | Exact package version and tarball are locked. |
| React / React DOM | [`client/package.json`](../client/package.json), [`client/package-lock.json`](../client/package-lock.json) | 18.2.0 | Exact package versions and tarballs are locked. The version-specific docs are the historical `18.react.dev` site. |
| MongoDB Server | [`docker-compose.yml`](../docker-compose.yml) | 5.0 family | The mutable `mongo:5.0` tag does not pin a patch or digest. Server-family answers are valid for 5.0; patch-specific claims must be `version-unverified` until the image is pinned. |
| MongoDB Node driver | [`server/package.json`](../server/package.json), [`server/package-lock.json`](../server/package-lock.json) | 5.9.2 | Exact npm version is locked. Generated API pages are published under `node-mongodb-native/5.9` and link to the v5.9.0 source tag; claims common to the 5.9 line are accepted, while later-driver examples are not. |
| Mongoose | [`server/package.json`](../server/package.json), [`server/package-lock.json`](../server/package-lock.json) | 7.6.13 | Exact npm version is locked. The versioned 7.x docs are applicable. |
| jsonwebtoken | [`server/package.json`](../server/package.json), [`server/package-lock.json`](../server/package-lock.json) | 9.0.2 | The [v9.0.2 tagged README](https://github.com/auth0/node-jsonwebtoken/tree/v9.0.2) is exact-version evidence. |

## Version-source conflicts

1. `docker-compose.yml` and `.nvmrc` pin Node 18.19.0, while the manifests only constrain the major. The exact files win for local/container execution.
2. `mongo:5.0` pins a server family, not a patch. Two clean pulls can resolve to different 5.0 patch images. This corpus does not make patch-specific server claims.
3. Current MongoDB Node-driver guide URLs redirect old `/v5.9/` paths to `current`. They are useful for concepts but cannot prove 5.9 applicability. Exact 5.9 claims therefore use the generated [5.9 API reference](https://mongodb.github.io/node-mongodb-native/5.9/).

