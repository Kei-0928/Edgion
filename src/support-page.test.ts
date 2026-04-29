import { describe, expect, it } from "vitest";

import supportPageHtml from "../public/support.html?raw";

const loadSupportPage = () => {
  const html = supportPageHtml;
  const text = html.replace(/\s+/g, " ");

  return { html, text };
};

describe("public support and privacy page", () => {
  it("keeps the public support surface reachable and clearly labeled", () => {
    const { html, text } = loadSupportPage();

    expect(html).toContain('<html lang="ja">');
    expect(text).toContain("Support and Privacy");
    expect(text).toContain("サポート");
    expect(text).toContain("プライバシー");
    expect(html).toContain('href="https://github.com/Kei-0928/Edgion"');
  });

  it("explains the current local-only privacy posture", () => {
    const { text } = loadSupportPage();

    expect(text).toContain("localStorage");
    expect(text).toContain("Edgionのサーバーや第三者の分析 サービスへ送信");
    expect(text).toContain("クラウド同期したりする仕組みはありません");
    expect(text).toContain("外部トラッキングも導入していません");
  });

  it("keeps reset scope and support-request privacy warnings visible", () => {
    const { text } = loadSupportPage();

    expect(text).toContain("Progress画面からリセット");
    expect(text).toContain("初回オンボーディングの 完了状態");
    expect(text).toContain("個人情報や 機微な情報を含めないでください");
  });

  it("states that the MVP summary is not the final App Store privacy policy", () => {
    const { text } = loadSupportPage();

    expect(text).toContain("Web/PWA版MVPのプライバシー概要");
    expect(text).toContain("App Store提出用の最終的なプライバシーポリシーでは ありません");
  });
});
