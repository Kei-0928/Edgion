# Web Runtime Boundaries

This note records the current Edgion Web/PWA runtime boundaries from local code. It is a Web/PWA implementation map, not a native app setup note.

## Current Deployment Assumption

- The production Web/PWA build assumes GitHub Pages at `https://kei-0928.github.io/Edgion/`.
- Vite is configured with `base: "/Edgion/"` in `vite.config.ts`.
- Runtime URLs that need the app base path should be derived from Vite's base URL or explicitly match `/Edgion/`.
- The current production path is subdirectory-based. Moving to a root domain or another subpath requires checking `vite.config.ts`, `index.html`, `public/manifest.webmanifest`, and `public/sw.js` together.

## Entry HTML

`index.html` is the browser entry point for the React app.

- The document language is Japanese with standard responsive viewport metadata.
- The public canonical URL and Open Graph URL point to `https://kei-0928.github.io/Edgion/`.
- PWA and icon links use Vite HTML replacement through `%BASE_URL%`:
  - `%BASE_URL%manifest.webmanifest`
  - `%BASE_URL%icon-192.png`
  - `%BASE_URL%icon-512.png` for `og:image`
- The React app is mounted into `#root`.
- The module script points at `/src/main.tsx` in source form; Vite rewrites this during build.

Because the app is hosted under `/Edgion/`, metadata and icons must continue to resolve under that path after the Vite build.

## Manifest Boundary

`public/manifest.webmanifest` describes the installable PWA surface.

- `id`, `start_url`, and `scope` are all `/Edgion/`.
- Icon paths are absolute under `/Edgion/`.
- `display` is `standalone`.
- `orientation` is `portrait-primary`.
- The manifest is intentionally static and GitHub Pages-path-specific.

Any change to the public base path must update the manifest. Unlike `index.html`, the manifest currently does not use Vite `%BASE_URL%` placeholders.

## Service Worker Boundary

`public/sw.js` is a hand-written service worker tied to `/Edgion/`.

- `BASE_PATH` is hard-coded to `/Edgion/`.
- `CACHE_NAME` is `edgion-shell-v7`.
- The install step pre-caches:
  - `/Edgion/`
  - `/Edgion/index.html`
  - `/Edgion/support.html`
  - `/Edgion/manifest.webmanifest`
  - `/Edgion/icon-192.png`
  - `/Edgion/icon-512.png`
- Activation deletes older caches whose names start with `edgion-`.
- Same-origin navigations fall back to the cached app shell when the network is unavailable.
- Requests for `sw.js` itself always go to the network.
- Other successful same-origin GET responses are cached after first fetch.
- Cross-origin requests are passed through to `fetch()` and are not app-shell cached.

The service worker does not encode Vite build output filenames directly. Hashed JS and CSS assets are cached at runtime after successful requests.

## Production And Development Behavior

Service worker registration is controlled in `src/main.tsx`.

- If `navigator.serviceWorker` is not available, the app skips service worker work.
- In production, the app registers `${import.meta.env.BASE_URL}sw.js` with `updateViaCache: "none"` and then calls `registration.update()`.
- In development, the app looks for registrations whose scope includes `import.meta.env.BASE_URL` and unregisters them.

This means local development is intended to avoid stale production service workers, while production explicitly installs and refreshes the GitHub Pages-scoped service worker.

## Runtime Constants

Two build-time/runtime constants matter for Web/PWA boundaries:

- `import.meta.env.BASE_URL` comes from Vite and reflects the configured base path. The app uses it for `support.html` and `sw.js`.
- `__APP_VERSION__` is defined in `vite.config.ts` from `package.json` version and declared in `src/vite-env.d.ts`. The UI renders it in the sidebar as `v{appVersion}`.

If the app is moved away from `/Edgion/`, code using `import.meta.env.BASE_URL` should adapt after the Vite config changes. Hard-coded paths in public static files still need manual review.

## Support Page

`public/support.html` is a static public page served under `/Edgion/support.html`.

- The React app links to it with `${import.meta.env.BASE_URL}support.html`.
- The service worker pre-caches it as part of the app shell.
- The page currently contains support and privacy-facing text for the Web/PWA MVP.
- Its repository link points to `https://github.com/Kei-0928/Edgion`.

Because this file is static, it does not share React routing or app state. Changes to support/privacy wording should be checked directly at the built `/Edgion/support.html` URL.

## External Links

The app has two current external link surfaces:

- Public source-note links in learning modules. These are rendered from `src/data/modules.ts` and open with `target="_blank"` and `rel="noreferrer"`.
- The GitHub repository link in `public/support.html`.

The service worker treats cross-origin requests as network-only pass-through. External pages are governed by their own availability, behavior, and privacy policies.

## Storage And Browser Runtime

The Web/PWA runtime is browser-local.

- Learning progress, thought-tree notes, thought metadata, and onboarding state are stored in `localStorage`.
- There is no app server dependency in the current code.
- Built-in module content ships with the frontend bundle.
- The current PWA shell depends on browser support for service workers, Cache Storage, Web App Manifest handling, and standard navigation/fetch behavior.

## Native Readiness Questions Before Packaging

Before any native wrapper or native rewrite is introduced, re-check these Web/PWA boundaries:

- Confirm whether `/Edgion/` remains the production base path or whether native packaging needs root-relative or bundled asset paths.
- Decide whether `manifest.webmanifest` and `sw.js` should remain GitHub Pages-specific or become generated from a shared base-path setting.
- Verify that `support.html` remains reachable from both the public Web/PWA and any native shell.
- Test production update behavior: first install, reload after a deploy, offline launch, and cache cleanup from older `edgion-` caches.
- Confirm that source-note external links open in the intended surface and return the user to the app cleanly.
- Confirm that `localStorage` persistence, reset behavior, and storage limits are acceptable for the intended runtime container.
- Re-check icon, theme color, standalone display, and portrait orientation behavior on target devices.
- Confirm how `__APP_VERSION__` should map to the visible app version in any packaged runtime.

## Explicit Non-Scope

This document does not define or decide authentication, payments, databases, Apple Developer Program setup, App Store Connect settings, code signing, Bundle IDs, provisioning, or TestFlight configuration.
