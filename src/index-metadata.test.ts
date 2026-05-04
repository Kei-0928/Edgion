import { describe, expect, it } from "vitest";

import indexHtml from "../index.html?raw";

const normalizedHtml = indexHtml.replace(/\s+/g, " ");

describe("index HTML metadata", () => {
  it("keeps the Japanese app shell entrypoint and root mount", () => {
    expect(indexHtml).toContain('<html lang="ja">');
    expect(indexHtml).toContain('<div id="root"></div>');
    expect(indexHtml).toContain('<script type="module" src="/src/main.tsx"></script>');
    expect(indexHtml).toContain("<title>Edgion</title>");
  });

  it("keeps core app and Apple web app metadata", () => {
    expect(normalizedHtml).toContain('name="description"');
    expect(normalizedHtml).toContain("ニュースの背景知識を楽しく学び");
    expect(indexHtml).toContain('<meta name="theme-color" content="#111827" />');
    expect(indexHtml).toContain('<meta name="application-name" content="Edgion" />');
    expect(indexHtml).toContain('<meta name="apple-mobile-web-app-title" content="Edgion" />');
    expect(indexHtml).toContain('<meta name="apple-mobile-web-app-capable" content="yes" />');
    expect(indexHtml).toContain(
      '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
    );
  });

  it("keeps GitHub Pages canonical and Open Graph metadata aligned", () => {
    expect(indexHtml).toContain(
      '<link rel="canonical" href="https://kei-0928.github.io/Edgion/" />',
    );
    expect(indexHtml).toContain('<meta property="og:site_name" content="Edgion" />');
    expect(indexHtml).toContain(
      '<meta property="og:title" content="Edgion - ニュースを考える材料に変える" />',
    );
    expect(normalizedHtml).toContain(
      'property="og:description" content="ニュースの背景知識、クイズ、思考ツリーで理解と意見形成を支える学習アプリ。"',
    );
    expect(indexHtml).toContain('<meta property="og:type" content="website" />');
    expect(indexHtml).toContain(
      '<meta property="og:url" content="https://kei-0928.github.io/Edgion/" />',
    );
    expect(indexHtml).toContain('<meta property="og:image" content="%BASE_URL%icon-512.png" />');
  });

  it("keeps PWA metadata using the Vite base URL placeholder", () => {
    expect(indexHtml).toContain(
      '<link rel="manifest" href="%BASE_URL%manifest.webmanifest" />',
    );
    expect(indexHtml).toContain(
      '<link rel="icon" href="%BASE_URL%icon-192.png" type="image/png" />',
    );
    expect(indexHtml).toContain('<link rel="apple-touch-icon" href="%BASE_URL%icon-192.png" />');
  });
});
