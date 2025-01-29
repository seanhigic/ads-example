# Ads Example Implementation - ACME Foods

A `Vite + React` front end simple store listing and cart implementation, with a `Bun ExpressJS` backend API for proxying ad events to a commercial `Ads API`.  The codebase explores the use of [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer), a wrapper for the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), primarily focused on ad tracking and user analytics.

The `ACME Foods development environment` is pre-configured to use a [.devcontainer](https://containers.dev/) with all of the required software to build and run the example.  

To run this project in `docker compose` see the [Quick Start](#quick-start), for development and code inspection see the [Developer Notes](#developer-notes).

## Requirements

- Docker Desktop or OrbStack
- VS Code (optional)
- VS Code DevContainer extension (optional)

## Quick Start
This will build and launch a docker container running the API backend which also hosts the pre-built React web application at `http://localhost/4200`.

From the terminal:

```
git clone git@github.com:seanhigic/ads-example.git
cd ads-example
docker compose up 
```

or `docker compose up -d` to run in the background.

Then open a browser to [http://localhost:4200](http://localhost:4200) to view the store.

> The developer console logs will show the `react-intersection-observer` events as the products scroll.  Events are sent to the API layer to be proxied to backend ad services, and will be output in the console log.

## Developer Notes

```
git clone git@github.com:seanhigic/ads-example.git
cd ads-example
code . 
```

> Make sure to re-open the project in the `.devcontainer` from within VS Code (CMD-Shift-P -> Dev Containers: Re-open in...).

The sample code primarily explores using the [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) to track the visibility of displayed ads.  This enables supports the tracking of [MRC](https://mediaratingcouncil.org/standards-and-guidelines) required ad events, such as the tracking of:

- Ad image is 1px viewable
- Ad image is 50% viewable

The intersection observer component usedf in the [ProductCard](./ui/react-store/src/components/ProductCard.tsx) component:

```
<InView root={document.getElementsByClassName('products')[0] } threshold={[.01, .5]} as="div" onChange={(inView, entry) => viewStatus(inView, product, entry)}>
    <img src={product.image} alt={product.name} onClick={() => { handleProductClick(product) }} />
</InView>
```

In this implementation, the `<InView />` element wraps the ad image with the required `interaction observation` configuration settings (`threshold={[.01, .5]}`).

As it is an SPA style react application, `sessionStorage` and `localStorage` are explored as means to control session duplicate events. 

Configuration is ENV driven, defaulting to the `.env` located in the `api`.  These values can be overridden at runtime in the `docker-compose.yml`.

In the current mock up a new user is created for each session based on the following supplied ENV vars:

```
ADS_EXAMPLE_USER_FIRST_NAME=Daffy
ADS_EXAMPLE_USER_LAST_NAME=Duck
ADS_EXAMPLE_USER_ID=daffy.duck@warner.com
```

Hovering over the `Daffy` of `Signed in as: Daffy` in the app header and it will show the assigned `userId` for the session.

The `Sponsored Ad` is selected from:

```
ADS_EXAMPLE_SAD_PRODUCT_ID=10
ADS_EXAMPLE_SAD_OBJECT_TRACKING_ID=4263d939-9dab-48d7-9c60-e7b93c6b9f1d
```

Certain events should only fire once per user session per ad, and this is reflected in the logs and behaviour.  For this either `sessionStorage` or `localStorage` are used to track fired events.  This can be toggled for exploration:

```
ADS_EXAMPLE_STORAGE_CONTROLLER="session"
```

> More work is required to bring the current implementation of a sponsored ad into compliance.

As both projects are `TypeScript` the `models` folder is shared between the two projects.

### API
```
cd api/bun-express
bun install

bun index.ts | pino-pretty # or ./start
```

The API is built in `TypeScript` and hosted in the [Bun](https://bun.sh/) runtime (a drop-in replacement for `Node.js`), built for speed, with native support for `TypeScript`.  It hosts the `backend API` through which the `front end SPA` will proxy all tracking events to commercial Ads APIs.

> The API also hosts the UI once it has been built to the root `ui/.dist` folder and the environment is set to `ENV=production`. This is how it is deployed in the docker container.

### UI
```
cd ui/react-store
npm install
npm run dev
```

The UI is built in `React w/ TypeScript`. It will proxy all `/api` calls to the API backend during development via the `vite.config.ts` proxy setting.  

> Make sure to start the API first.

To build the UI for hosting in the API layer:
```
npm run build
```

Then set the environment variable `ENV=production` when launching the API layer. Eg:

```
cd api/bun-express
ENV=production ./start
```

The UI will be hosted at the root of `http://localhost:4200`, while the API will be hosted at `http://localhost:4200/api`.

