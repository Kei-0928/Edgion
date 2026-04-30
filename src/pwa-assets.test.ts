import { describe, expect, it } from "vitest";

import manifestText from "../public/manifest.webmanifest?raw";
import serviceWorkerText from "../public/sw.js?raw";

type WebManifest = {
  name?: string;
  short_name?: string;
  id?: string;
  start_url?: string;
  scope?: string;
  display?: string;
  orientation?: string;
  lang?: string;
  categories?: string[];
  icons?: Array<{
    src?: string;
    sizes?: string;
    type?: string;
    purpose?: string;
  }>;
};

const manifest = JSON.parse(manifestText) as WebManifest;

const extractConstExpression = (source: string, name: string) => {
  const match = source.match(new RegExp(`const\\s+${name}\\s*=\\s*([\\s\\S]*?);`));

  expect(match, `${name} should be declared`).not.toBeNull();

  return match?.[1] ?? "";
};

describe("PWA public assets", () => {
  it("keeps the manifest scoped to the GitHub Pages deployment path", () => {
    expect(manifest.name).toBe("Edgion");
    expect(manifest.short_name).toBe("Edgion");
    expect(manifest.id).toBe("/Edgion/");
    expect(manifest.start_url).toBe("/Edgion/");
    expect(manifest.scope).toBe("/Edgion/");
    expect(manifest.display).toBe("standalone");
    expect(manifest.orientation).toBe("portrait-primary");
    expect(manifest.lang).toBe("ja");
    expect(manifest.categories).toEqual(expect.arrayContaining(["education", "news"]));
  });

  it("keeps install icons available under the same base path", () => {
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: "/Edgion/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        }),
        expect.objectContaining({
          src: "/Edgion/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        }),
      ]),
    );

    for (const icon of manifest.icons ?? []) {
      expect(icon.src, `${icon.sizes} icon src`).toMatch(/^\/Edgion\/.+\.png$/);
      expect(icon.purpose, `${icon.sizes} icon purpose`).toContain("maskable");
    }
  });

  it("keeps the service worker shell aligned with the public base path", () => {
    expect(serviceWorkerText).toContain('const CACHE_NAME = "edgion-shell-');
    expect(serviceWorkerText).toContain('const BASE_PATH = "/Edgion/"');
    expect(serviceWorkerText).toContain("`${BASE_PATH}index.html`");
    expect(serviceWorkerText).toContain("`${BASE_PATH}support.html`");
    expect(serviceWorkerText).toContain("`${BASE_PATH}manifest.webmanifest`");
    expect(serviceWorkerText).toContain("`${BASE_PATH}icon-192.png`");
    expect(serviceWorkerText).toContain("`${BASE_PATH}icon-512.png`");
  });

  it("keeps support navigation from replacing the app shell cache", () => {
    const appShellNavigation = extractConstExpression(
      serviceWorkerText,
      "isAppShellNavigation",
    );
    const scopedNavigation = extractConstExpression(serviceWorkerText, "isScopedNavigation");

    expect(serviceWorkerText).toContain("const isAppShellNavigation");
    expect(serviceWorkerText).toContain("const isScopedNavigation");
    expect(serviceWorkerText).toContain("cache.put(event.request, copy)");
    expect(appShellNavigation).toContain("url.pathname === BASE_PATH");
    expect(appShellNavigation).toContain("`${BASE_PATH}index.html`");
    expect(appShellNavigation).not.toContain("support.html");
    expect(scopedNavigation).toContain('event.request.mode === "navigate"');
    expect(scopedNavigation).toContain("url.pathname.startsWith(BASE_PATH)");
  });

  it("keeps built assets discoverable for install-time precaching", () => {
    expect(serviceWorkerText).toContain("const getBuildAssetUrls");
    expect(serviceWorkerText).toContain("\\/assets\\/");
    expect(serviceWorkerText).toContain("pathname.startsWith(`${BASE_PATH}assets/`)");
    expect(serviceWorkerText).toContain("cacheAppShell()");
  });
});
