// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、旅行かばん。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <rect x="22" y="36" width="56" height="42" rx="7" fill="#f6d77a"/><rect x="38" y="24" width="24" height="14" rx="4" fill="none" stroke="#fffdf7" stroke-width="5"/><rect x="22" y="52" width="56" height="6" fill="#123554"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
