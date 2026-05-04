const DEFAULT_PREVIEW_URL = "http://127.0.0.1:4173/Edgion/";

const previewUrl = new URL(process.argv[2] ?? DEFAULT_PREVIEW_URL);
if (!previewUrl.pathname.endsWith("/")) {
  previewUrl.pathname = `${previewUrl.pathname}/`;
}

const checks = [];

const fail = (message) => {
  throw new Error(message);
};

const fetchText = async (path, label) => {
  const url = new URL(path, previewUrl);
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    fail(`${label} returned HTTP ${response.status}: ${url.href}`);
  }

  checks.push(`${label}: ${response.status}`);
  return response.text();
};

const assertIncludes = (text, expected, label) => {
  if (!text.includes(expected)) {
    fail(`${label} did not include ${JSON.stringify(expected)}`);
  }
};

const assertEqual = (actual, expected, label) => {
  if (actual !== expected) {
    fail(`${label} expected ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`);
  }
};

const assertArrayIncludes = (values, expected, label) => {
  if (!Array.isArray(values) || !values.includes(expected)) {
    fail(`${label} did not include ${JSON.stringify(expected)}`);
  }
};

const toPreviewPath = (assetPath) => {
  const assetUrl = new URL(assetPath, previewUrl);
  return `${assetUrl.pathname}${assetUrl.search}`;
};

try {
  const rootHtml = await fetchText("", "App shell");
  assertIncludes(rootHtml, '<div id="root"></div>', "App shell");
  assertIncludes(rootHtml, "/Edgion/assets/", "App shell");

  const assetPaths = Array.from(
    new Set(
      Array.from(rootHtml.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g)).map(
        (match) => toPreviewPath(match[1]),
      ),
    ),
  );

  if (assetPaths.length === 0) {
    fail("App shell did not reference any built assets");
  }

  const manifest = await fetchText("manifest.webmanifest", "Manifest");
  const manifestJson = JSON.parse(manifest);
  assertEqual(manifestJson.name, "Edgion", "Manifest name");
  assertEqual(manifestJson.short_name, "Edgion", "Manifest short_name");
  assertEqual(manifestJson.id, "/Edgion/", "Manifest id");
  assertEqual(manifestJson.start_url, "/Edgion/", "Manifest start_url");
  assertEqual(manifestJson.scope, "/Edgion/", "Manifest scope");
  assertEqual(manifestJson.display, "standalone", "Manifest display");
  assertEqual(manifestJson.orientation, "portrait-primary", "Manifest orientation");
  assertEqual(manifestJson.lang, "ja", "Manifest lang");
  assertArrayIncludes(manifestJson.categories, "education", "Manifest categories");
  assertArrayIncludes(manifestJson.categories, "news", "Manifest categories");

  const iconSources = manifestJson.icons?.map((icon) => icon.src) ?? [];
  assertArrayIncludes(iconSources, "/Edgion/icon-192.png", "Manifest icons");
  assertArrayIncludes(iconSources, "/Edgion/icon-512.png", "Manifest icons");

  const serviceWorker = await fetchText("sw.js", "Service worker");
  assertIncludes(serviceWorker, 'const BASE_PATH = "/Edgion/"', "Service worker");
  assertIncludes(serviceWorker, "edgion-shell-", "Service worker");
  assertIncludes(serviceWorker, "support.html", "Service worker");
  assertIncludes(serviceWorker, "manifest.webmanifest", "Service worker");
  assertIncludes(serviceWorker, "icon-192.png", "Service worker");
  assertIncludes(serviceWorker, "icon-512.png", "Service worker");
  assertIncludes(serviceWorker, "getBuildAssetUrls", "Service worker");
  assertIncludes(serviceWorker, 'key.startsWith("edgion-")', "Service worker");

  const supportHtml = await fetchText("support.html", "Support page");
  assertIncludes(supportHtml, '<html lang="ja">', "Support page");
  assertIncludes(supportHtml, "Edgion Support", "Support page");
  assertIncludes(supportHtml, "Support and Privacy", "Support page");
  assertIncludes(supportHtml, "サポート", "Support page");
  assertIncludes(supportHtml, "プライバシー", "Support page");
  assertIncludes(supportHtml, "localStorage", "Support page");
  assertIncludes(supportHtml, "最終的なプライバシーポリシーでは", "Support page");

  await fetchText("icon-192.png", "Icon 192");
  await fetchText("icon-512.png", "Icon 512");

  await Promise.all(
    assetPaths.map(async (assetPath) => {
      await fetchText(assetPath, `Asset ${assetPath}`);
    }),
  );

  console.log(`Production smoke checks passed for ${previewUrl.href}`);
  for (const check of checks) {
    console.log(`- ${check}`);
  }
} catch (error) {
  console.error(`Production smoke checks failed for ${previewUrl.href}`);
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
