# MERN Docs Assistant

This repository is a compact MERN skeleton used as source data for a documentation workflow.

Runtime stack:
- Node.js 18.19.x, enforced by .nvmrc and engines.node >=18 <19.
- Express 4.18.2 API in server/.
- React 18.2.0 client in client/.
- MongoDB server 5.0 through docker-compose.yml.
- Mongoose 7.6.x and mongodb driver 5.9.x in the server package.

The app is intentionally small: an API, a React queue view, a live feed, and a Mongo-backed data layer. It is meant to be read by tooling as a version source of truth and code anchor. Generated corpus content and workflow answers are not committed here.
