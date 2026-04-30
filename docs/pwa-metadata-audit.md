# Edgion PWA Metadata Audit

This audit records the current Web/PWA metadata and safe future improvements. It does not change runtime behavior.

## References

- W3C Web Application Manifest: manifest members such as `id`, `display`, `display_override`, `icons`, `screenshots`, and `shortcuts`.
- Apple Safari Web Content Guide: Apple-specific web app meta tags such as `apple-mobile-web-app-capable`, `apple-mobile-web-app-title`, and status bar style.
- Apple App Store Connect Help: screenshot specifications should be rechecked before any App Store upload.

## Current Files

- `index.html`
- `public/manifest.webmanifest`
- `public/sw.js`
- `public/icon-192.png`
- `public/icon-512.png`
- `public/support.html`

## Current Metadata

### `index.html`

Already present:

- Japanese document language.
- Responsive viewport.
- Meta description.
- Theme color.
- Application name.
- Apple mobile web app title.
- Apple standalone capable flag.
- Apple status bar style.
- Open Graph site name, title, description, type, and image.
- Canonical URL for the public GitHub Pages build.
- Open Graph URL for the public GitHub Pages build.
- Manifest link.
- PNG favicon.
- Apple touch icon.

Current notes:

- The app already has the minimum metadata needed for a stable Web/PWA MVP.
- `og:image` uses `%BASE_URL%icon-512.png`, which is appropriate for the GitHub Pages base path after Vite processing.
- `canonical` and `og:url` point to `https://kei-0928.github.io/Edgion/`.
- There are no Apple startup images. This is acceptable for the MVP because startup images are fragile across device sizes and should be verified on real iPhones before adding.

### `public/manifest.webmanifest`

Already present:

- `name`
- `short_name`
- `id`
- `description`
- `start_url`
- `scope`
- `display`
- `orientation`
- `background_color`
- `theme_color`
- `lang`
- `categories`
- 192px and 512px PNG icons with `any maskable`

Current notes:

- `id`, `start_url`, and `scope` are fixed to `/Edgion/`, matching the current GitHub Pages deployment.
- Icon paths are also fixed to `/Edgion/`.
- The manifest is intentionally simple and stable.

### `public/sw.js`

Already present:

- App shell cache for `/Edgion/`.
- Cached support page, manifest, and icons.
- Cache cleanup for older `edgion-` caches.
- Navigation fallback to cached app shell.
- Development unregister behavior is handled in `src/main.tsx`, not in the service worker.

Current notes:

- The service worker is tied to the GitHub Pages base path.
- Cache changes should be tested after deployment because stale shell behavior is one of the highest-risk PWA issues.

## Safe Improvement Candidates

These can be considered as small follow-up tasks after review.

### Verify Offline And Cache Behavior

Reason:

- `sw.js` caches the app shell and runtime assets after successful requests, but Vite's hashed JS and CSS are not listed directly in `APP_SHELL`.
- App Store readiness depends on avoiding blank screens after reloads, updates, and home-screen launches.

Risk:

- Medium until tested on local preview, deployed GitHub Pages, and real iOS Safari.
- If the public URL or Vite output changes, service worker behavior should be retested.

### Split Icon Purpose Entries

Candidate:

- Keep one icon entry with `purpose: "any"`.
- Add a separate maskable icon entry if the artwork has enough padding for maskable cropping.

Reason:

- Some install surfaces treat `any maskable` differently. Separate entries can make intent clearer.

Risk:

- Medium until icon safe-area is visually checked. Do not change without inspecting icons on install surfaces.

### Add Manifest Shortcuts

Possible shortcuts:

- Learn
- Quiz
- Progress

Reason:

- Installed PWA surfaces can expose direct entry points to common tasks.

Risk:

- Current React app state is view-based and does not have route URLs for each view. Adding shortcuts first would require route or query handling. Defer until navigation URLs exist.

### Add Screenshots To Manifest

Reason:

- Some install surfaces use manifest screenshots for richer install prompts.

Risk:

- Screenshots must be generated, sized, and kept current. Defer until screenshot workflow exists.

### Add `display_override`

Candidate:

```json
"display_override": ["standalone", "minimal-ui"]
```

Reason:

- Allows capable user agents to choose newer display behavior while retaining `display`.

Risk:

- Browser support varies. Defer until install testing is available.

## Items To Avoid For Now

- Do not change `start_url` or `scope` until the deployment base path changes.
- Do not add native iOS configuration, Bundle ID, signing, or TestFlight setup from this audit.
- Do not add analytics, crash reporting, or external monitoring as part of metadata cleanup.
- Do not add push notification metadata or service worker push handlers.
- Do not add Apple startup images until real device testing is planned.
- Do not add App Store screenshots to the repository until the screenshot workflow and asset policy are agreed.

## Recommended Next Small Task

Run a focused local PWA cache check:

Expected impact:

- No runtime behavior change.
- Confirms whether the current service worker avoids blank screens after a production preview load.
- Provides evidence for any future service worker cache change.

Suggested checks:

- Build with `npm run build`.
- Serve with `npm run preview -- --host 127.0.0.1 --port 4173`.
- Load `/Edgion/` once in the browser.
- Confirm `sw.js` and `manifest.webmanifest` are reachable under `/Edgion/`.
- Reload the app and confirm Home still appears.
- Record any cache or console errors in `docs/qa-checklist.md`.
