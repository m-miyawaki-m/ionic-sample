# ionic-sample

Ionic Vue によるサンプル・学習用プロジェクト。
倉庫管理向け業務用ハンディターミナル (Xnavis 等) での利用を想定。

## 技術スタック

| 項目 | バージョン |
|------|-----------|
| Node.js | v24.x |
| npm | 11.x |
| Ionic | 8.x |
| Vue | 3.x |
| Vite | 5.x |
| Capacitor | 5.x |
| TypeScript | 5.x |

## Android ビルド環境

- JDK 17 (SDKMAN 等で切替)
- Android SDK 33 (Android 13)
- AGP 8.0.x / Gradle 8.0.x (Capacitor 5 が自動生成)

> Play ストア公開は想定せず、ローカル実機インストール (Android 13 前提) のみの運用。
> Capacitor を 6 以上に上げると JDK / SDK の要求が上がるので、現状 5 系を維持する。
> 検証の経緯は [docs/guides/27-capacitor-version-audit-2026-04-23.md](./docs/guides/27-capacitor-version-audit-2026-04-23.md) 参照。

## セットアップ手順 (Windows)

### 前提条件

- Node.js v24.x がインストール済みであること
- オンライン環境とオフライン環境で Node.js / npm のバージョンを揃えること

```bash
# バージョン確認
node -v
npm -v
```

### 1. オンライン環境で依存取得

```bash
npm install
```

### 2. オフライン環境へコピー

プロジェクトフォルダを丸ごとコピーする (`node_modules` を含む)。

> オフライン側で `npm install` は実行しない。
> `node_modules` がそのまま使えるため不要。ネット接続がないとエラーになる。

### 3. 起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開く。

## npm scripts

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 (Vite) |
| `npm run build` | 本番ビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run lint` | ESLint 実行 |
| `npm run test:unit` | ユニットテスト (Vitest) |
| `npm run test:e2e` | E2E テスト (Cypress) |

## ドキュメント

`docs/guides/` にガイド・チートシートあり。

| ファイル | 内容 |
|---------|------|
| 01-ionic-basics.md | Ionic 基礎 |
| 02-vue3-composition-api.md | Vue 3 Composition API |
| 16-warehouse-ht-workflow.md | 倉庫 HT 業務フロー |
| 18-ht-common-design-guideline.md | HT 画面設計ガイドライン |
| 21-ionic-layout-cheatsheet.md | レイアウト チートシート |
| 22-device-resolution-guide.md | 端末解像度・DPR 調査ガイド |
