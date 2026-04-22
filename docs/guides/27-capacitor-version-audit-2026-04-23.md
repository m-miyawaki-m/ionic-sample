# Capacitor バージョン整合性検証と Capacitor 5 へのダウングレード (2026-04-23)

## 背景

`ionic-sample` はローカル開発環境 (**JDK 17 / Android SDK 33 (Android 13 実機想定)**) 向けの学習プロジェクト。Play ストア公開は想定していないため、Google Play の targetSdk フロア要件は適用されない。

一方、プロジェクトのコミット履歴上どこかで Capacitor が 8.x に上がっており、**現行環境では Android ビルドが通らない状態**だった。本ドキュメントはその検証結果と対処を記録する。

## 検証日

2026-04-23

## 検出した不整合

### サマリ

プロジェクトは **Capacitor 8.3.0 構成**で書かれており、以下の点でユーザ環境と矛盾していた。

| 項目 | 検出値 | 要求環境 | ユーザ環境 | 判定 |
|---|---|---|---|---|
| `@capacitor/core` / `cli` | 8.3.0 | — | — | Capacitor 8 系 |
| `@capacitor/android` | ^8.3.0 | compileSdk 36 + JDK 21 推奨 | SDK 33 / JDK 17 | ❌ |
| `android/variables.gradle` `compileSdkVersion` | **36** | Android SDK 36 (Android 16) インストール必須 | SDK 33 | ❌ |
| `android/variables.gradle` `targetSdkVersion` | **36** | 同上 | — | ❌ |
| `android/variables.gradle` `minSdkVersion` | 24 | Android 7+ | Android 13 | ✅ |
| `android/app/capacitor.build.gradle` `compileOptions` | **`JavaVersion.VERSION_21`** | **JDK 21 必須** | JDK 17 | ❌ (致命的) |
| `android/build.gradle` AGP | 8.13.0 | JDK 17 最低 / 21 推奨 | JDK 17 | ⚠ 警告レベル |
| `android/gradle/wrapper/gradle-wrapper.properties` | 8.14.3 | JDK 17+ | JDK 17 | ✅ |
| `@ionic/vue` / `@ionic/vue-router` | 8.0.0 | Vue 3 + Capacitor 5-8 互換 | — | ✅ |
| Vue / vue-router | 3.3+ / 4.2+ | — | — | ✅ |
| `cordovaAndroidVersion` | 14.0.1 | Capacitor 8 系 | — | ✅ (内部整合) |

### 一番致命的なポイント

`android/app/capacitor.build.gradle` (Capacitor CLI が自動生成):

```gradle
android {
  compileOptions {
      sourceCompatibility JavaVersion.VERSION_21
      targetCompatibility JavaVersion.VERSION_21
  }
}
```

- このファイルは **Capacitor CLI が `cap update/sync/add` のたびに再生成**する。手で編集しても次回の sync で元に戻る。
- JDK 17 環境では `Unsupported class file major version` 等のコンパイルエラーになる。
- Capacitor 5 系では `JavaVersion.VERSION_17` が生成されるため、JDK 17 と整合する。

### README の自己申告との齟齬

既存 README は以下を掲げていた:

| README 記載 | 実態 | 備考 |
|---|---|---|
| Capacitor 8.x | 8.3.0 (package.json) | 一致 |
| **Vite 6.x** | `vite ^5.0.0` | 不一致 |
| Node.js v24.x | — | ランタイムのため問題なし |
| Ionic 8.x | `@ionic/vue ^8.0.0` | 一致 |
| Vue 3.x | `vue ^3.3.0` | 一致 |
| TypeScript 5.x | `typescript ~5.9.0` | 一致 |

## 採用した対処方針

### 選択肢

| 案 | 内容 | 判定 |
|---|---|---|
| A. **Capacitor を 5 に下げる** | 既存プロジェクトと揃える、環境を変えない | ✅ 採用 |
| B. 環境を JDK 21 + SDK 36 に上げる | Capacitor 8 を活かす | 見送り |
| C. Capacitor 6 or 7 を採用 | SDK 34-35 + JDK 17 の中間案 | 見送り |

### 採用理由 (A)

- 他の学習プロジェクト (`ionic-qr-scanner`, `ionic-qr-generator`, `ionic-qr-scanner-vue`, `ionic-qr-generator-vue`) と **Capacitor バージョンを揃える**
- Play ストア公開しないため targetSdk の縛りなし
- 使用中プラグインはすべて Capacitor 5 に対応版が存在 (`@capacitor/app/haptics/keyboard/status-bar`)
- カスタム Capacitor プラグイン `SP2Plugin.java` は Capacitor 5-8 で API 互換のため、コード修正不要

## 実施した変更

### 1. `package.json` のバージョンダウン

| パッケージ | 変更前 | 変更後 |
|---|---|---|
| `@capacitor/core` | 8.3.0 | `^5.7.8` |
| `@capacitor/cli` | 8.3.0 | `^5.7.8` |
| `@capacitor/android` | ^8.3.0 | `^5.7.8` |
| `@capacitor/app` | 8.1.0 | `^5.0.8` |
| `@capacitor/haptics` | 8.0.2 | `^5.0.8` |
| `@capacitor/keyboard` | 8.0.2 | `^5.0.9` |
| `@capacitor/status-bar` | 8.0.2 | `^5.0.8` |

### 2. `android/` ディレクトリの再生成

```bash
rm -rf node_modules package-lock.json android/
npm install
npx cap add android
```

生成後の値:

| 項目 | 値 |
|---|---|
| `compileSdkVersion` | 33 |
| `targetSdkVersion` | 33 |
| `minSdkVersion` | 22 |
| `capacitor.build.gradle` `sourceCompatibility` | `VERSION_17` |
| AGP | 8.0.x |
| Gradle wrapper | 8.0.x |

### 3. カスタムプラグインの復元

再生成前にバックアップしたものを戻す:

- `android/app/src/main/java/jp/co/example/warehouse/sp2/SP2Plugin.java` — そのままコピー
- `android/app/src/main/java/jp/co/example/warehouse/MainActivity.java` — `registerPlugin(SP2Plugin.class)` を再追記

### 4. README のバージョン表を修正

- `Capacitor 8.x` → `5.x`
- `Vite 6.x` → `5.x` (元から実態と乖離していたのを正確にする)

## 今後の予防策

1. **package.json の Capacitor 系パッケージをバージョン固定**する方向で運用 (`^` ではなく具体的バージョン) ことで、`npm install` で勝手に上がるのを防ぐ
2. `@capacitor/*` を手動で上げる場合は、本ドキュメントの「要求環境」表を先に確認し、ローカル環境で必要な SDK/JDK が揃っているか確認する
3. `docs/guides/14-android-capability-checklist.md` に Capacitor バージョンとローカル環境要件の対応を追記することを推奨 (フォロー要)
4. CLAUDE.md や AGENTS.md にローカル環境の固定値 (JDK 17 / SDK 33 / Capacitor 5) を記載しておくと、AI エージェントが勝手に上げるリスクを減らせる

## 参考

- Capacitor 公式バージョン別要件: https://capacitorjs.com/docs/updating/
- 本プロジェクトでの既存 Capacitor 解説: `docs/guides/00-what-is-capacitor.md`
- SP2 カスタムプラグイン実装: `docs/guides/11-sp2-aar-integration.md`
