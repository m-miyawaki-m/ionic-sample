# 倉庫HT（Android）アプリ 技術スタック比較

## 前提条件

| 項目 | 内容 |
|------|------|
| 対象端末 | Android HT端末（Xnavis） |
| スキャナー | SP2スキャナ（AAR SDK提供、直接呼び出し） |
| 主な機能 | バーコード/QRコード読み取り → PCサーバーへAPIリクエスト |
| iOS対応 | 現時点では不要（将来の可能性は未定） |

---

## 1. 比較対象

| 略称 | 内容 | カテゴリ |
|------|------|----------|
| Ionic (Vue) | Ionic + Capacitor + Vue | ハイブリッド |
| Ionic (React) | Ionic + Capacitor + React | ハイブリッド |
| Ionic (Angular) | Ionic + Capacitor + Angular | ハイブリッド |
| React Native | React Native + Expo or bare | クロスプラットフォーム |
| Kotlin | Kotlin (Android Native) | ネイティブ |
| Flutter | Flutter + Dart | クロスプラットフォーム |

---

## 2. AAR直接呼び出し時のアーキテクチャ

```
┌─────────────────────────────────────────────────────┐
│  Kotlin (Native)                                    │
│  ┌──────────┐   直接呼出し   ┌──────────┐           │
│  │ UI/業務  │──────────────→│ AAR SDK  │           │
│  │ ロジック  │               │ (SP2)    │           │
│  └──────────┘               └──────────┘           │
│  ブリッジ層: なし                                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Ionic (Vue/React/Angular) + Capacitor              │
│  ┌──────────┐  JS→Bridge  ┌───────────┐  ┌──────┐  │
│  │ Web UI   │────────────→│ Capacitor │─→│ AAR  │  │
│  │ WebView  │             │ Plugin    │  │ SDK  │  │
│  └──────────┘             │ (Kotlin)  │  └──────┘  │
│                           └───────────┘            │
│  ブリッジ層: Capacitor Plugin (自作・Kotlin)         │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  React Native                                       │
│  ┌──────────┐  JS→Bridge  ┌───────────┐  ┌──────┐  │
│  │ React    │────────────→│ Native    │─→│ AAR  │  │
│  │ JS/TS   │             │ Module    │  │ SDK  │  │
│  └──────────┘             │ (Kotlin)  │  └──────┘  │
│                           └───────────┘            │
│  ブリッジ層: TurboModule (自作・Kotlin)              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Flutter                                            │
│  ┌──────────┐  Dart→Bridge ┌───────────┐  ┌──────┐ │
│  │ Dart     │─────────────→│ Platform  │─→│ AAR  │ │
│  │ Widget   │              │ Channel   │  │ SDK  │ │
│  └──────────┘              │ (Kotlin)  │  └──────┘ │
│                            └───────────┘           │
│  ブリッジ層: MethodChannel (自作・Kotlin)            │
└─────────────────────────────────────────────────────┘
```

**共通点**: Kotlin以外は全て「Kotlinでブリッジ層を書く」ことが必須。どの技術を選んでもKotlinのコードは書く。

---

## 3. 機能要件に関わる比較

### 3-1. スキャナー機器連携（SP2 / AAR SDK直接呼び出し）

| 項目 | Kotlin | Ionic (全般) | React Native | Flutter |
|------|--------|-------------|--------------|---------|
| AAR import | build.gradleに1行 | Plugin側build.gradleに追加 | Module側build.gradleに追加 | Plugin側build.gradleに追加 |
| SDK初期化 | Activityで直接 | Plugin内でContext取得して初期化 | Module内でReactContext経由 | FlutterPlugin内でContext経由 |
| コールバック受信 | Listener直接実装 | Listener→notifyListeners→JS | Listener→EventEmitter→JS | Listener→EventChannel→Dart |
| データ変換 | 不要 | Kotlin Object→JSObject→JS | Kotlin Map→WritableMap→JS | Kotlin Map→MethodChannel→Dart |
| デバッグ | Android Studioで完結 | Android Studio + Chrome DevTools | Android Studio + Metro + Flipper | Android Studio + DevTools |
| **ブリッジ想定工数** | **0日** | **3〜5日** | **3〜5日** | **3〜5日** |

### 3-2. バーコード/QRコード読み取り（カメラフォールバック）

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| ◎ ML Kit / ZXing直接利用 | ○ @capacitor-community/barcode-scanner | ○ vision-camera系 | ○ mobile_scanner等 |

SP2スキャナがメインのため、カメラ読み取りは補助的。どの技術でも対応可能。

### 3-3. APIリクエスト（PCサーバー通信）

全技術で成熟しており差はほぼない（Retrofit / axios / dio / fetch等）。差別化要因にならない。

### 3-4. Intent / Broadcast連携

| Kotlin | Ionic / React Native / Flutter |
|--------|-------------------------------|
| ◎ BroadcastReceiver直接実装 | △ ネイティブ側にレシーバーを書きブリッジで渡す |

AAR直接呼び出しが前提のため、Intent方式は補助的だが、端末固有のシステムイベント受信で必要になる場合がある。

---

## 4. ブリッジ起因のリスク

AAR直接呼び出しでクロスプラットフォーム技術を採用する場合、以下のリスクに注意が必要。

| リスク | 説明 |
|--------|------|
| 非同期の複雑さ | SDKコールバック→ブリッジ→UIスレッドの受け渡しでタイミングバグが起きやすい |
| ライフサイクル不一致 | SDK初期化/破棄がActivityライフサイクルと、WebView/JS/Dartのライフサイクルでずれる |
| エラーハンドリング | SDK例外がブリッジ層で握りつぶされ、UI側で原因不明エラーになるパターン |
| SDKバージョンアップ | API変更時にブリッジ層も修正が必要。ネイティブなら1箇所、ブリッジありだと2箇所 |

---

## 5. 開発生産性の比較

### 5-1. チームスキルとの親和性

| Kotlin | Ionic (Vue) | Ionic (React) | Ionic (Angular) | React Native | Flutter |
|--------|-------------|---------------|-----------------|--------------|---------|
| △ 新規学習 | ◎ Vue/TS直結 | ○ TS活きるがReact学習要 | ○ TS活きるがAngular学習要 | ○ TS活きるがReact学習要 | × Dart習得が必要 |

### 5-2. UI構築の効率

| Kotlin | Ionic (全般) | React Native | Flutter |
|--------|-------------|--------------|---------|
| △ Compose/XML。高レベル業務UIコンポーネント少ない | ◎ リスト・フォーム・モーダル等が豊富 | △ 標準コンポーネント少なめ | ○ Materialベースで豊富 |

### 5-3. ホットリロード / 開発体験

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| △ ビルド→デプロイ必要 | ◎ ブラウザで即反映。実機不要でUI開発可 | ○ Fast Refreshあり | ◎ Hot Reloadが高速 |

---

## 6. 非機能要件の比較

### 6-1. パフォーマンス（応答速度）

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| ◎ ネイティブ実行 | △ WebView上動作 | ○ New Architectureで改善 | ○ AOTコンパイル |

倉庫業務の実態: リスト100件程度・フォーム入力中心であればIonicでも体感差はほぼない。数千行スクロールや高頻度アニメーションがなければ問題にならない。

### 6-2. オフライン対応

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| ◎ Room/SQLite直接 | ○ Capacitor SQLite / IndexedDB | ○ WatermelonDB等 | ○ sqflite / drift等 |

倉庫内はWi-Fi死角がありえるため、ローカル蓄積→復帰時一括送信の仕組みが必要になるケースがある。

### 6-3. アプリサイズ

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| ◎ 数MB〜 | ○ 〜10MB（WebViewはOS組込） | △ 〜15MB | △ 〜15MB（Dartランタイム含） |

HT端末はストレージが限られるケースがある。

### 6-4. 保守・アップデート容易性

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| ◎ Android公式。長期サポート | ○ Web技術者が多く引継ぎやすい | △ メジャー更新時の破壊的変更が多い | ○ Google支援。Dart人口少なめ |

### 6-5. セキュリティ

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| ◎ Keystore・暗号化SP等を直接利用 | △ プラグイン経由。WebViewはXSS等の追加攻撃面あり | ○ プラグイン経由 | ○ プラグイン経由 |

倉庫管理データ（在庫情報、出荷先等）は業務機密のため保護が必要。

### 6-6. 端末キッティング・MDM連携

全技術共通で大きな差なし。最終的にAPK/AABになるため、MDMからのサイレントインストール等は同様に対応可能。

### 6-7. 長期運用時のフレームワーク存続リスク

| Kotlin | Ionic | React Native | Flutter |
|--------|-------|--------------|---------|
| ◎ Android公式言語。廃止リスク最小 | ○ OSSコミュニティ主導。Capacitor安定 | ○ Meta主導。New Architecture経て安定方向 | ○ Google支援（KilledbyGoogleの前例あり） |

---

## 7. 総合評価

| 評価軸 | Kotlin | Ionic (Vue) | Ionic (React) | Ionic (Angular) | React Native | Flutter |
|--------|--------|-------------|---------------|-----------------|--------------|---------|
| SDK連携の確実性 | ◎ | △ | △ | △ | △ | △ |
| SDK連携のデバッグ | ◎ | △ | △ | △ | △ | △ |
| チームスキル活用 | △ | ◎ | ○ | ○ | ○ | × |
| UI開発速度 | △ | ◎ | ◎ | ◎ | ○ | ○ |
| ブラウザ開発可能 | × | ◎ | ◎ | ◎ | × | × |
| スキャン応答速度 | ◎ | ○ | ○ | ○ | ○ | ○ |
| 保守時の技術要求 | Kotlinのみ | Vue/TS + Kotlin | React/TS + Kotlin | Angular/TS + Kotlin | React/TS + Kotlin | Dart + Kotlin |
| 長期存続性 | ◎ | ○ | ○ | ○ | ○ | ○ |

---

## 8. Ionic フレームワーク比較（Vue / React / Angular）

Ionicを採用する場合、内部フレームワークの選定も必要。以下はIonic固有の観点での比較。

### 8-1. Ionic公式のサポート状況

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| Ionicの歴史 | v5〜対応（2020年〜） | v5〜対応（2020年〜） | v1〜対応（創設時から） |
| 公式ドキュメント量 | ○ 十分 | ○ 十分 | ◎ 最も充実（元々Angular向け） |
| 公式サンプル・テンプレート | ○ | ○ | ◎ 最多 |
| Ionic公式のスタンス | 全FW同等サポートを明言 | 全FW同等サポートを明言 | 元々のメインFW |

### 8-2. コンポーネントバインディング

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| バインディング方式 | @ionic/vue（ラッパー） | @ionic/react（ラッパー） | @ionic/angular（ネイティブ統合） |
| コンポーネント網羅率 | ◎ 全コンポーネント対応 | ◎ 全コンポーネント対応 | ◎ 全コンポーネント対応 |
| 型定義の質 | ○ | ○ | ◎ TypeScript前提設計 |
| 機能リリースの速さ | ○ 同時リリース | ○ 同時リリース | ◎ 若干先行することあり |

### 8-3. 状態管理

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| 標準的な選択肢 | Pinia（公式推奨） | Redux / Zustand / Jotai | NgRx / Signal（組込） |
| 学習コスト | ◎ Piniaはシンプル | ○ 選択肢が多く迷いやすい | △ NgRxはボイラープレート多 |
| 業務アプリとの相性 | ◎ | ○ | ○ |

### 8-4. ルーティング

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| ルーター | Vue Router + IonRouterOutlet | React Router + IonRouterOutlet | Angular Router + IonRouterOutlet |
| ページ遷移アニメーション | ◎ Ionic標準と自然に統合 | ○ 統合されているが設定がやや複雑 | ◎ 最も成熟 |
| ガード（認証チェック等） | ○ beforeEach | ○ loader / element条件分岐 | ◎ canActivate等が組込 |

### 8-5. プロジェクト構成・規約

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| 構成の自由度 | ◎ 柔軟。チームで規約を決める | ◎ 最も自由。規約なしだと散らかりやすい | △ 規約が厳格（Module/Component/Service） |
| 小〜中規模（〜20画面） | ◎ 軽量で適切 | ○ 適切 | △ ボイラープレートが多く感じる |
| 大規模（50画面〜） | ○ 規約を自分で整備すれば対応可 | ○ 同上 | ◎ 規約があるため自然にスケール |
| DI（依存性注入） | × 組込なし（provide/inject で代替） | × 組込なし | ◎ 組込。テスト・保守で有利 |

### 8-6. エコシステム・コミュニティ

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| npm週間DL数（フレームワーク自体） | 中 | 大 | 中 |
| Ionic+FWの組合せ情報量 | ○ | ○ | ◎ 最多 |
| Stack Overflow等のQ&A | ○ | ◎ | ◎ |
| 採用人材の見つけやすさ（国内） | ○ | ◎ | ○ |

### 8-7. テスト

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| ユニットテスト | Vitest / Jest + vue-test-utils | Jest / Vitest + Testing Library | Jasmine / Jest + TestBed |
| E2Eテスト | Cypress / Playwright | Cypress / Playwright | Cypress / Playwright / Protractor |
| テスト環境構築の容易さ | ◎ | ◎ | ○ CLI生成時に含まれるが設定重め |

### 8-8. ビルド・バンドル

| 項目 | Vue | React | Angular |
|------|-----|-------|---------|
| ビルドツール | Vite（デフォルト） | Vite or Webpack | Webpack（Angular CLI） / esbuild移行中 |
| ビルド速度 | ◎ Viteで高速 | ◎ Vite利用時高速 | ○ esbuild移行で改善中 |
| バンドルサイズ | ◎ 最小（Vue本体が軽量） | ○ | △ フレームワーク自体が大きめ |

### 8-9. Ionic内フレームワーク総合

| 評価軸 | Vue | React | Angular |
|--------|-----|-------|---------|
| チームスキル適合 | ◎ Vue/TS経験が直結 | △ React学習が必要 | △ Angular学習が必要 |
| 学習コスト（FW自体） | ◎ 低い | ○ 中程度 | △ 高い（DI, Module, RxJS等） |
| Ionicとの統合成熟度 | ○ | ○ | ◎ |
| 小〜中規模での生産性 | ◎ | ○ | △ ボイラープレート多 |
| 長期保守（大規模化時） | ○ | ○ | ◎ |
| ビルド速度 | ◎ | ◎ | ○ |

---

## 9. 判断の軸

AAR直接呼び出し前提で最も重要な問い:

> **「2言語体制（Web技術 + Kotlin）のコストを払ってでも、Web技術によるUI開発速度の恩恵を取るか？」**

### Kotlin一本が向くケース

- 画面数が少ない（10画面以下）
- UIがシンプル（リスト・フォーム中心）
- SDK連携が複雑（スキャン設定変更、接続状態管理、エラーリカバリ等）
- チーム内にKotlin/Android経験者がいる、または育成する方針

### Ionic (Vue) が向くケース

- 画面数が多い（15画面以上）
- UIに凝った要件がある（検索フィルタ、ソート、タブ切替、複雑なフォーム）
- SDK連携がシンプル（初期化→スキャン開始→結果受信 程度）
- Vue/TS経験者が主力で、Kotlinは最小限に抑えたい
- 将来的にiOS対応の可能性がある

---

## 10. 次のアクション

1. **SP2 AAR SDKのAPI仕様を確認** — 公開API数、コールバックの種類、初期化/破棄の複雑さを把握
2. **画面数・UI要件の洗い出し** — 業務フローから必要画面を列挙し、規模感を確定
3. **PoC（技術検証）** — 第一候補の技術でSP2 SDK呼び出しの実機動作を確認
