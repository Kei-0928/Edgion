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
- Manifest link.
- PNG favicon.
- Apple touch icon.

Current notes:

- The app already has the minimum metadata needed for a stable Web/PWA MVP.
- `og:image` uses `%BASE_URL%icon-512.png`, which is appropriate for the GitHub Pages base path after Vite processing.
- There is no canonical URL yet.
- There is no explicit `og:url` yet.
- There are no Apple startup images. This is acceptable for the MVP because startup images are fragile across device sizes and should be verified on real iPhones before adding.

### `public/manifest.webmanifest`

Already present:

- `name`
- `short_name`
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

- `start_url` and `scope` are fixed to `/Edgion/`, matching the current GitHub Pages deployment.
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

### Add Manifest `id`

Candidate:

```json
"id": "/Edgion/"
```

Reason:

- Gives the installed web app a stable identity separate from incidental `start_url` changes.

Risk:

- Low, but install identity should be checked on Chrome/Android and iOS Safari where support differs.

### Add Canonical And Open Graph URL

Candidate:

```html
<link rel="canonical" href="https://kei-0928.github.io/Edgion/" />
<meta property="og:url" content="https://kei-0928.github.io/Edgion/" />
```

Reason:

- Makes public sharing metadata more explicit.

Risk:

- Low for the public GitHub Pages build.
- If the app later moves domains, these values must be updated.

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

Add the low-risk public URL metadata to `index.html`:

- `canonical`
- `og:url`

Expected impact:

- No runtime behavior change.
- Helps public preview sharing and search metadata.
- Safe to verify with `npm test`, `npm run lint`, `npm run build`, and a local browser smoke check.

Before editing:

- Confirm the public URL remains `https://kei-0928.github.io/Edgion/`.
