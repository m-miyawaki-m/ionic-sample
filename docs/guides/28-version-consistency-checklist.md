# バージョン整合性チェックリスト (JDK / SDK / Capacitor / Android)

本プロジェクトで「Android ビルドが通らない」「`npm install` 後に挙動が変わった」系のトラブルを5分で自己診断するための手順書。

2026-04-23 の Capacitor 8 → 5 ダウングレード ([27-capacitor-version-audit](./27-capacitor-version-audit-2026-04-23.md)) の経験を汎化したもの。

## §1 前提 (本プロジェクトのローカル固定値)

| 項目 | 値 | 理由 |
|---|---|---|
| JDK | **17** | AGP 8.0 最低要件 / Android Studio 同梱 |
| Android SDK Platform | **33** (Android 13) | 業務 HT 実機想定 |
| Capacitor | **5.x** | Play ストア公開しないため上げる動機なし、既存プラグインが v5 安定 |
| Ionic Vue | 8.x | Capacitor 5-8 いずれとも互換 |
| Vue | 3.3+ | — |
| Node.js | 20 LTS 以上 | Capacitor 5 は Node 18+ で動作可 |

Play ストア公開の予定がない = targetSdk の下限要求なし。環境を上げる動機がない限り、これらを**動かさない**のが安全策。

## §2 1 発現状確認コマンド

プロジェクトルートで以下をコピペして結果を確認:

### Linux / WSL / macOS

```bash
echo "=== Node/npm ==="
node -v; npm -v
echo "=== JDK ==="
java -version 2>&1 | head -1
echo "=== package.json Capacitor deps ==="
grep '@capacitor' package.json
echo "=== installed Capacitor ==="
grep '"version"' node_modules/@capacitor/core/package.json 2>/dev/null
grep '"version"' node_modules/@capacitor/android/package.json 2>/dev/null
echo "=== variables.gradle ==="
grep -E "minSdkVersion|compileSdkVersion|targetSdkVersion" android/variables.gradle 2>/dev/null
echo "=== capacitor.build.gradle (Java level) ==="
grep -E "sourceCompatibility|targetCompatibility" android/app/capacitor.build.gradle 2>/dev/null
echo "=== AGP / Gradle ==="
grep -E "classpath 'com.android.tools.build" android/build.gradle 2>/dev/null
grep "distributionUrl" android/gradle/wrapper/gradle-wrapper.properties 2>/dev/null
```

### Windows (cmd)

```cmd
echo === Node/npm ===
node -v & npm -v
echo === JDK ===
java -version
echo === package.json ===
findstr "@capacitor" package.json
echo === variables.gradle ===
findstr /R "minSdkVersion compileSdkVersion targetSdkVersion" android\variables.gradle
echo === capacitor.build.gradle ===
findstr /R "sourceCompatibility targetCompatibility" android\app\capacitor.build.gradle
echo === AGP / Gradle ===
findstr "com.android.tools.build" android\build.gradle
findstr "distributionUrl" android\gradle\wrapper\gradle-wrapper.properties
```

## §3 Capacitor バージョン × 環境要件の対応表

下の表を基準に「今のプロジェクトが前提環境と整合しているか」を判断する。値は `npx cap add android` が自動生成する既定値。

| Capacitor | compileSdk / targetSdk | minSdk | Java (生成値) | AGP | Gradle | cordova-android |
|---|---|---|---|---|---|---|
| 5.7.x | **33** | 22 | **17** | 8.0.x | 8.0.x | 10.1.x |
| 6.x | 34 | 22 | 17 | 8.2.x | 8.2.x | 12.x |
| 7.x | 35 | 23 | 17 | 8.7+ | 8.11.x | 13.x |
| **8.x** | **36** | 24 | **21** | 8.13 | 8.14 | 14.x |

本プロジェクトの固定値 (JDK 17 / SDK 33) に**無痛で乗るのは Capacitor 5 のみ**。6 以上にする場合は SDK 34+ を別途インストール、8 にする場合は JDK 21 も必須。

## §4 整合チェックリスト (yes/no 7 項目)

現状を §2 のコマンド結果と照らし合わせて、すべて yes なら整合。

- [ ] **A1.** `package.json` の `@capacitor/core` と `node_modules/@capacitor/core/package.json` のバージョンが**一致**している (lock と install の齟齬なし)
- [ ] **A2.** `@capacitor/*` 各パッケージの **major が揃っている** (core / cli / android / app / haptics / keyboard / status-bar)
- [ ] **A3.** `android/app/capacitor.build.gradle` の `sourceCompatibility` が **ローカル JDK 以下** (`VERSION_17` かつローカル JDK 17 なら OK。`VERSION_21` かつローカル JDK 17 なら ❌)
- [ ] **A4.** `android/variables.gradle` の `compileSdkVersion` が **ローカルに install 済みの SDK Platform** に含まれている (SDK Manager で確認)
- [ ] **A5.** `android/build.gradle` の AGP が JDK の最低要件以下 (AGP 8.13 は JDK 17 最低、AGP 8.7 以下は JDK 11 でも可)
- [ ] **A6.** `gradle-wrapper.properties` の Gradle が JDK と整合 (Gradle 8.14 は JDK 17 で動くが、Gradle 9 系は JDK 21 必須)
- [ ] **A7.** `README.md` の技術スタック表が `package.json` の実態と一致 (古い Capacitor / Vite 表記が残っていないか)

### 注意

- A3 は `cap sync` / `cap update` / `cap add` のたびに Capacitor CLI が**自動再生成**する。手編集しても次回の sync で元に戻る。根本対処は `@capacitor/cli` のバージョンを合わせること。
- A4 は Android Studio の **SDK Manager** で実装済み SDK を確認する。CLI なら `sdkmanager --list_installed | grep platforms`。

## §5 不整合検出時の復旧フロー

### Case 1: `@capacitor/*` のバージョンが意図より高くなっていた

(例: 今回の 8.3 → 5.7 ダウングレード)

```bash
# 1. 目的のバージョンを package.json に固定 (手編集 or npm 指定)
#    @capacitor/core, cli, android, app, haptics, keyboard, status-bar を全部合わせる

# 2. ロック + node_modules + android を全廃棄
rm -rf node_modules package-lock.json android

# 3. 再インストール
npm install

# 4. android 再生成 (Capacitor 公式 template で)
npx cap add android

# 5. カスタマイズを手で戻す
#    - android/app/src/main/java/<package>/MainActivity.java の registerPlugin()
#    - android/app/src/main/java/<package>/<custom plugin>/*.java
#    - AndroidManifest.xml の追加パーミッション
#    - local.properties (自動生成)

# 6. ビルド確認
npm run build
```

Windows なら手順 2 を `rmdir /s /q node_modules & del package-lock.json & rmdir /s /q android` と読み替える。

### Case 2: JDK が不整合 (例: `VERSION_21` 要求だがローカルは 17)

選択肢は 2 つ:

- **A. Capacitor を下げる** (上記 Case 1 の手順)
- **B. JDK を上げる** (SDKMAN で `sdk install java 21.0.5-tem`、Android Studio の Gradle JDK も切替)

本プロジェクトは A を採用中 (§1 の方針)。

### Case 3: compileSdk が未インストール (例: 36 要求だが 33 しか入っていない)

- Android Studio 側: SDK Manager → `SDK Platforms` タブ → 対象 API にチェック → Apply
- CLI 側: `sdkmanager "platforms;android-36"`

ただし本プロジェクトは SDK 33 固定方針なので、install せず Capacitor を下げる側で解決する。

### Case 4: カスタムプラグインのビルドが壊れた

Capacitor のバージョンを上下させた直後によくある:

- プラグインの `build.gradle` が `capacitor-cordova-android-plugins` ディレクトリを参照している
- 再生成後にこのディレクトリが消えていることがある → `npx cap update android` で復旧
- それでも駄目なら `android/` ごと再生成 (Case 1 手順)

## §6 既存ドキュメントとの関係

| 既存ガイド | 記述 | 状態 |
|---|---|---|
| [10-build-deploy.md](./10-build-deploy.md) | JDK 17 / SDK 33 / Cap 5 に修正済 (旧 Cap 8 表記を 2026-04-23 修正) | ✅ |
| [10b-build-cli-only.md](./10b-build-cli-only.md) | JDK 17 に修正済 (旧 OpenJDK 24 を 2026-04-23 修正) | ✅ |
| [14-android-capability-checklist.md](./14-android-capability-checklist.md) | 端末機能(カメラ/バイブ等)のチェックリスト、本書と対象が違う | — |
| [25-android-studio-integration-howto.md](./25-android-studio-integration-howto.md) | Android Studio 起動/実機転送の手順 | — |
| [27-capacitor-version-audit-2026-04-23.md](./27-capacitor-version-audit-2026-04-23.md) | 本書の**元になった単発インシデント記録** | — |

## §7 次にバージョンを上げたくなった時の判断フロー

```
┌ Play ストア公開が必要か？
│  yes → targetSdk 下限要求を満たす必要あり(2026年時点で 35 以上)
│        → Capacitor 7 以上、§3 対応表で要件確認
│  no  → 公開なしなら下限要求なし
│        → 既存プラグインが v5 で動くなら上げる必要はない (YAGNI)
│
├ プラグインで v6+ でしか使えない機能を使いたいか？
│  yes → そのプラグインの最小 Capacitor version を確認
│        → §3 対応表で JDK / SDK 要件を確認
│        → ローカルに足りなければ環境を上げる
│  no  → 上げない
│
└ Capacitor セキュリティ修正が必要か？
   yes → セマンティック範囲内 (5.x.x → 5.y.z) ならリスク小、上げる
          major 上げは §3 の要件変化を必ず確認
   no  → 上げない
```

## §8 セルフチェック運用 (推奨)

- `git pull` / `npm install` の直後に §2 のコマンド一式を走らせる (癖にする)
- `package.json` の `@capacitor/*` は **キャレット `^` ではなく具体バージョン** で固定する運用も検討 (勝手な minor アップを防ぐ)
- Dependabot / Renovate を使うなら、Capacitor 系は Major 自動更新 OFF にする
