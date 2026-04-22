# Ionic React 版 別プロジェクト作成手順書

本プロジェクト（Ionic Vue）の下記 3 点を Ionic React の別プロジェクトに移植するための手順書。
**新セッションで作業する人（自分 or 別の AI セッション）はこのドキュメントだけ読めば進められる**ことを目指して書く。

## 移植対象

| 対象 | 本プロジェクトのパス | 備考 |
|---|---|---|
| サンプル集メニュー | `src/views/samples/SamplesIndexPage.vue` | 画面パターン/モック行は除外、2 項目に絞る |
| Ionic 公式コンポーネントカタログ（シェル） | `src/views/samples/catalog/`（CatalogLayout / Sidebar / Welcome / catalog-data.ts） | `ion-split-pane` + `ion-menu` + 動的ルーティング |
| Ionic 公式コンポーネントカタログ（demo 本体） | **Ionic 公式ドキュメントの React サンプルコード** <https://ionicframework.com/docs/ja/api> | Vue 側の 410 本を逐語翻訳するのではなく、公式 React サンプルを貼り直す |
| Ionicons 全集 | `src/views/samples/IoniconsCatalog.vue` | 514 種のアイコン一覧 |

**移植しないもの**: 業務系画面（Home / Receiving / Shipping / Relocation / Stocktaking / Inventory）、`pickup/`、`screen-patterns/`、`mockups/`、`CoveragePage.vue`、共通 UI 部品（`ScanInput` / `PageLayout` / `ScannerStatus` 等）。

## 根本方針（重要）

**demo の内容は Ionic 公式ドキュメントの React 版サンプルコードを直接採用する**。本プロジェクトの Vue 版 demo は「どの component をどの順で並べるか」の**索引としてのみ**使う。

- 公式ドキュメント: <https://ionicframework.com/docs/ja/api>
- 各 component ページ右上のフレームワーク切替で **React** を選ぶと React 版の動くサンプルが出る
- カタログで「そのサンプルをそのまま表示するページ」を作るのが demo の実態

メリット:
- Vue → React の構文変換バグが起きない
- Ionic が公式に「こう書けば動く」と保証したコードが元ネタ
- `sourceCode` 文字列と実装が必ず一致する（公式コードをそのまま貼るから）
- 作業者の判断コストが減る

---

## 完成条件（Definition of Done）

- [ ] `ionic-sample-react` ディレクトリで `npm install` & `npm run dev` が成功する
- [ ] `/samples` を開くと 3 項目メニュー（カタログ / アイコン集 / カタログ以外は非表示）が表示される
- [ ] `/samples/ionicons` で 514 アイコンのグリッドが動き、バリアント切替・コピーが動作する
- [ ] `/samples/catalog` を開くと左サイドバー + Welcome が出る
- [ ] 各 demo ルート（例: `/samples/catalog/accordion/basic`）で**公式 React サンプル**が表示される（Phase 6 は段階的。全 410 本完走は必須ではない）
- [ ] `npm run build && npx cap sync android` が通る（Android ビルドは最低限確認）

---

## 前提

| 項目 | 値 |
|---|---|
| Node.js | 20 LTS 以上（本プロジェクト動作実績: v24.11.0） |
| 新プロジェクトの置き場 | `/home/miyaw/dev/learning/ionic-sample-react`（本プロジェクトと兄弟） |
| 本プロジェクト（参照元） | `/home/miyaw/dev/learning/ionic-sample`（**読み込みのみ。書き換えない**） |
| 対象 OS | WSL2 / Ubuntu |

**重要**: 本プロジェクトは**読むだけ**。いかなる編集もしない。

---

## フェーズ構成（全体像）

1. **Phase 1** — スキャフォールド（空の Ionic React プロジェクト起動）
2. **Phase 2** — 依存整理・TypeScript 設定・パスエイリアス
3. **Phase 3** — ルーティング雛形 + Samples メニュー
4. **Phase 4** — Ionicons Catalog 移植
5. **Phase 5** — Catalog シェル（Layout + Sidebar + Welcome + 動的ルーティング）
6. **Phase 6** — Demo の移植（段階的。全 410 本は必須としない）
7. **Phase 7** — Android 組み込み確認

各フェーズの末尾に「完了条件」を置く。完了条件を満たしたら次へ進む。

---

## Phase 1: スキャフォールド

### 1-1. Ionic CLI でプロジェクト作成

```bash
cd /home/miyaw/dev/learning
npm install -g @ionic/cli   # 未インストールなら
ionic start ionic-sample-react blank --type=react --capacitor
cd ionic-sample-react
```

`blank` テンプレート・`--type=react`・`--capacitor` 指定が必須。
途中「Create a free Ionic account?」と聞かれたら **n** で良い。

### 1-2. 起動確認

```bash
npm run dev    # もしくは ionic serve
```

ブラウザで `http://localhost:5173/`（または Ionic CLI の出す URL）が開き、"Blank" のひな形ページが見えれば OK。

### Phase 1 完了条件
- [ ] `ionic-sample-react/` が作られ、`npm run dev` で空のページが起動する

---

## Phase 2: 依存とツール設定

### 2-1. 追加・不足パッケージの把握

`ionic start ... --type=react` で入る典型的な依存:

| 種別 | パッケージ | 備考 |
|---|---|---|
| コア | `@ionic/react`, `@ionic/react-router` | Vue 版 `@ionic/vue` / `@ionic/vue-router` に対応 |
| ルーティング | `react-router`, `react-router-dom` | `@ionic/react-router` が内部で使う。v5 系（Ionic React 8 は react-router 5 前提） |
| React | `react`, `react-dom`, `@types/react`, `@types/react-dom` | |
| アイコン | `ionicons` | 本プロジェクトと同じ |
| Capacitor | `@capacitor/core`, `@capacitor/android`, `@capacitor/cli`, 各プラグイン | 今回は最小限（`@capacitor/app` 程度）でよい |

> **注意**: Ionic React 8 は現状 **react-router v5** 系に依存する（v6 は未サポート）。`npm install react-router@5 react-router-dom@5` を強制しないと v6 が入る場合があるので、`package.json` を必ず確認する。

### 2-2. パスエイリアス `@/`

本プロジェクトは `@/` を `src/` にマップしている。新プロジェクトでも揃える。

`vite.config.ts`（抜粋）:

```ts
import path from 'path';

export default defineConfig({
  plugins: [react(), legacy()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
```

`tsconfig.json` にも同じエイリアスを追加:

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

### 2-3. Ionic CSS と theme

`src/main.tsx`（または `src/App.tsx`）に本プロジェクトの `src/main.ts` と同等の CSS を import:

```ts
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.class.css';
import './theme/variables.css';
```

本プロジェクトの `src/theme/variables.css` をコピーして良い（そのまま React 側でも動く CSS）。

### Phase 2 完了条件
- [ ] `@/` エイリアスが TS と Vite 両方で効く（適当な import 文で確認）
- [ ] ダークモード CSS 含む import が通り、ビルドが成功する

---

## Phase 3: ルーティング雛形と Samples メニュー

### 3-1. App のルート定義

`src/App.tsx` の典型形:

```tsx
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import SamplesIndexPage from '@/pages/samples/SamplesIndexPage';
import IoniconsCatalog from '@/pages/samples/IoniconsCatalog';
import CatalogLayout from '@/pages/samples/catalog/CatalogLayout';

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/samples" component={SamplesIndexPage} />
        <Route exact path="/samples/ionicons" component={IoniconsCatalog} />
        <Route path="/samples/catalog" component={CatalogLayout} />
        <Redirect exact from="/" to="/samples" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
```

ポイント:
- `IonRouterOutlet` は**直下に `Route` を並べる**（`Switch` は不要。Ionic React が内部で扱う）
- カタログのように子ルートがある画面は `<Route path="/samples/catalog" component={CatalogLayout} />` のように exact を付けずにする

### 3-2. SamplesIndexPage.tsx（3 項目版）

本プロジェクトの `SamplesIndexPage.vue` の 5 項目のうち、**カタログ / アイコン集** の 2 項目だけを残す（「画面パターン集」「画面モック」「カバレッジ」は除外）。

```tsx
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel,
  IonList, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';

const SamplesIndexPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>サンプル</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem routerLink="/samples/catalog" detail>
          <IonLabel>
            <h2>コンポーネントカタログ</h2>
            <p>Ionic公式コンポーネントの動作サンプル</p>
          </IonLabel>
        </IonItem>
        <IonItem routerLink="/samples/ionicons" detail>
          <IonLabel>
            <h2>Ionicons 全集</h2>
            <p>514種のアイコン一覧・バリアント切替・インポート文コピー</p>
          </IonLabel>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
);

export default SamplesIndexPage;
```

### Phase 3 完了条件
- [ ] `/` → `/samples` にリダイレクトされる
- [ ] `/samples` でメニューが 2 項目表示される
- [ ] 各項目をクリックしてページ遷移（中身は未実装でも "Not Found" か空ページが表示されれば可）

---

## Phase 4: Ionicons 全集の移植

### 4-1. 本プロジェクトの実装を読む

参照: `/home/miyaw/dev/learning/ionic-sample/src/views/samples/IoniconsCatalog.vue`

主なロジック:
- `ionicons/icons` から**全アイコン**をインポート（`import * as allIcons from 'ionicons/icons'`）
- 検索・バリアント切替（outline / filled / sharp）
- クリックで `import { xxx } from 'ionicons/icons';` をクリップボードへコピー

### 4-2. React への変換指針

- `ref` / `reactive` → `useState`
- `computed` → `useMemo`
- `IonIcon` コンポーネントは `@ionic/react` から import（Vue 版と同名）
- クリップボードは `navigator.clipboard.writeText` のまま使える
- アイコン一覧生成ロジックは Vue/React で同じ（純粋な JS）

### 4-3. 実装の型

```tsx
import { useMemo, useState } from 'react';
import * as allIcons from 'ionicons/icons';
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonIcon,
  IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, IonLabel,
} from '@ionic/react';

type Variant = 'outline' | 'filled' | 'sharp';

const variantSuffix: Record<Variant, string> = {
  outline: 'Outline', filled: '', sharp: 'Sharp',
};

const allIconNames = Object.keys(allIcons);

const IoniconsCatalog: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [variant, setVariant] = useState<Variant>('outline');

  const filtered = useMemo(() => {
    const suf = variantSuffix[variant];
    return allIconNames
      .filter((n) => (suf ? n.endsWith(suf) : !n.endsWith('Outline') && !n.endsWith('Sharp')))
      .filter((n) => n.toLowerCase().includes(keyword.toLowerCase()));
  }, [keyword, variant]);

  // ... グリッド表示、コピー処理は Vue 版ロジックを流用
};

export default IoniconsCatalog;
```

> **Note**: Vue 版の実装ディテール（グリッド CSS、コピー成功トーストなど）はそのまま React 流儀に移す。`v-for` → `.map()`、`v-model` → `value + onIonChange`、`@click` → `onClick`。

### Phase 4 完了条件
- [ ] `/samples/ionicons` で 514 個のアイコンが表示される
- [ ] 検索バーが機能する
- [ ] バリアント切替で表示が変わる
- [ ] クリックで import 文がクリップボードにコピーされる

---

## Phase 5: Catalog シェル（Layout / Sidebar / Welcome）

### 5-1. catalog-data.ts はそのままコピー

`src/views/samples/catalog/catalog-data.ts` は**純粋な TypeScript**（Vue 依存なし）。
新プロジェクトの `src/pages/samples/catalog/catalog-data.ts` に**無変更でコピー**。

### 5-2. CatalogLayout.tsx

本プロジェクトの `CatalogLayout.vue` は `IonSplitPane` + `IonMenu` + `IonRouterOutlet` の構造。React 版:

```tsx
import {
  IonContent, IonHeader, IonMenu, IonPage, IonRouterOutlet,
  IonSplitPane, IonTitle, IonToolbar,
} from '@ionic/react';
import { Route } from 'react-router-dom';
import CatalogSidebar from './CatalogSidebar';
import CatalogWelcome from './CatalogWelcome';
import { catalogDemoRoutes } from './demo-routes';  // Phase 5-4 で作る

const CatalogLayout: React.FC = () => (
  <IonPage>
    <IonSplitPane contentId="catalog-main" when="lg">
      <IonMenu contentId="catalog-main" type="overlay">
        <IonHeader>
          <IonToolbar><IonTitle>Components</IonTitle></IonToolbar>
        </IonHeader>
        <IonContent>
          <CatalogSidebar />
        </IonContent>
      </IonMenu>

      <IonRouterOutlet id="catalog-main">
        <Route exact path="/samples/catalog" component={CatalogWelcome} />
        {catalogDemoRoutes.map((r) => (
          <Route key={r.path} exact path={r.path} component={r.component} />
        ))}
      </IonRouterOutlet>
    </IonSplitPane>
  </IonPage>
);

export default CatalogLayout;
```

### 5-3. CatalogSidebar.tsx / CatalogWelcome.tsx

Vue 版を読み、同じ構造で React に書き換える:
- `v-for="c in categories"` → `categories.map((c) => ...)`
- `router-link="/..."` → `routerLink="/..."`（Ionic React の IonItem が対応）
- `<script setup>` 内の import は React の import 文へ

### 5-4. デモの自動ルート生成（`import.meta.glob`）

本プロジェクトは `src/router/index.ts` で:

```ts
const demoModules = import.meta.glob('../views/samples/catalog/demos/**/*.vue');
```

で 410 本を自動収集している。Vite は React でも同じ API が使えるが、React コンポーネントは `.tsx` 拡張子なので:

`src/pages/samples/catalog/demo-routes.ts`:

```ts
const demoModules = import.meta.glob<{ default: React.ComponentType }>(
  './demos/**/*.tsx',
  { eager: false },
);

function pascalToKebab(s: string) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export const catalogDemoRoutes = Object.keys(demoModules)
  .map((modulePath) => {
    const m = modulePath.match(/\/demos\/([^/]+)\/(.+)\.tsx$/);
    if (!m) return null;
    const [, componentSlug, fileName] = m;
    const demoSlug = pascalToKebab(fileName);
    return {
      path: `/samples/catalog/${componentSlug}/${demoSlug}`,
      // React.lazy で遅延ロード
      component: React.lazy(demoModules[modulePath] as any),
    };
  })
  .filter((x): x is NonNullable<typeof x> => x !== null);
```

> **ポイント**: `React.lazy` と `<Suspense>` を使う。`IonRouterOutlet` の外側で `<Suspense fallback={<IonSpinner />}>` で包む。

### Phase 5 完了条件
- [ ] `/samples/catalog` で Welcome と左サイドバーが出る
- [ ] サイドバーのリンクが `/samples/catalog/<component>/<demo>` で生成される（クリックして 404 でも可。demo 本体は Phase 6）

---

## Phase 6: Demo の移植（公式 React サンプルを流用）

**Vue 版 demo を逐語翻訳しない**。Ionic 公式ドキュメントの React サンプルコードをそのまま貼るのが原則。

### 6-1. 作業手順（1 demo あたり）

1. **対象 component を決める**: Vue 側 `catalog-data.ts` で構成を確認（どの component・どの demo が必要か）
2. **Ionic 公式ドキュメントを開く**: <https://ionicframework.com/docs/ja/api/{component}>
   - 例: Accordion → <https://ionicframework.com/docs/ja/api/accordion>
3. **フレームワーク切替を React にする**: 各サンプルブロックの右上トグル、もしくはページ左上で **React** を選択
4. **サンプルコードをコピーして新しい `.tsx` に貼る**: 下記テンプレートの `{/* 本体 */}` に差し込む
5. **`sourceCode` 文字列にも同じコードを入れる**: `<details>` で表示するソースと実装を完全一致させる

### 6-2. 共通テンプレート（`IonPage` でラップする枠だけ作る）

公式サンプルは **`<IonPage>` で包まれていない**ことが多い（スニペット単位）。カタログで表示するときは下記の枠で包む:

```tsx
import {
  IonButtons, IonContent, IonHeader, IonMenuButton,
  IonPage, IonTitle, IonToolbar,
  // ↓公式サンプルで使われている Ion... をここに追記
} from '@ionic/react';

const sourceCode = `// 公式 React サンプルをそのまま文字列として入れる
// <IonAccordionGroup>...</IonAccordionGroup>`;

const Basic: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start"><IonMenuButton /></IonButtons>
        <IonTitle>Accordion / Basic</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <p style={{ color: 'var(--ion-color-medium)', fontSize: 14, margin: '0 0 16px' }}>
        （任意）Vue 版にあった日本語短説明があれば流用。無くてもよい
      </p>

      {/* ここに公式 React サンプルの本体を貼る */}

      <details style={{ borderTop: '1px solid var(--ion-color-light-shade)', marginTop: 16, paddingTop: 16 }}>
        <summary style={{ cursor: 'pointer', color: 'var(--ion-color-medium)', fontSize: 14 }}>Source</summary>
        <pre style={{ overflowX: 'auto', background: 'var(--ion-color-light-tint)', padding: 12, borderRadius: 8, fontSize: 13, marginTop: 8 }}>
          <code>{sourceCode}</code>
        </pre>
      </details>
    </IonContent>
  </IonPage>
);

export default Basic;
```

### 6-3. 公式ドキュメントと Vue 版の対応

Vue 側 `catalog-data.ts` に並んでいる demo 名（例: `Basic`, `Multiple`, `Readonly Individual`...）は、**Ionic 公式ドキュメントの見出しと基本的に対応している**。

| Vue 側 demo 名 | 公式ドキュメントでの探し方 |
|---|---|
| Basic | "Basic Usage" セクションの最初のサンプル |
| Disable Group / Readonly Group | "Disabled Accordions" / "Readonly Accordions" セクション |
| Customization Theming | "Theming" セクションの該当サンプル |
| Listen Changes | "Listening for Changes" セクション |

見つからない demo があっても構わない。その場合:
- その demo ファイルは**作らずスキップ**し、`catalog-data.ts` 側からも一旦該当エントリを除く
- または Vue 版実装を参考に React で最小再実装

### 6-4. 公式に React サンプルが無いケース → 移植しない

**公式ドキュメントの React タブに対応するサンプルコードが無い demo は移植しない**。Vue 版からの翻訳は行わない。

扱い:
- その demo 用の `.tsx` ファイルは**作らない**
- `catalog-data.ts` から該当エントリを**削除**する（サイドバーにも出さない）
- 何件スキップしたかはコミットメッセージか PR 本文にメモしておくと後で把握しやすい

理由:
- 公式が React で書いていないものを手動翻訳すると動作保証が無くなる
- カタログは「公式のコピペで動く見本」を集めたものに限定する方が学習教材として迷わない
- 全 410 本完走より「貼ったものは全部動く」を優先

### 6-5. 進め方の推奨順

Vue 側と同じ component 単位で進める:

1. **Phase 6a**: 表示系（`accordion`, `badge`, `chip`, `icon`, `label`, `note`, `text`, `title`, `thumbnail`, `spinner`, `avatar`, `skeleton-text`）
2. **Phase 6b**: フォーム系（`button`, `buttons`, `checkbox`, `radio`, `input`, `textarea`, `toggle`, `range`, `segment`, `searchbar`, `select`, `input-otp`, `input-password-toggle`）
3. **Phase 6c**: リスト/レイアウト系（`card`, `grid`, `item`, `item-divider`, `item-group`, `item-sliding`, `list`, `list-header`, `header`, `footer`, `toolbar`, `content`, `split-pane`, `tabs`, `menu`, `layout`）
4. **Phase 6d**: オーバーレイ系（`alert`, `action-sheet`, `loading`, `modal`, `popover`, `toast`, `picker`, `picker-legacy`, `breadcrumbs`, `backdrop`）
5. **Phase 6e**: 高度/その他（`datetime`, `datetime-button`, `gestures`, `animations`, `reorder`, `refresher`, `infinite-scroll`, `fab`, `progress-bar`, `ripple-effect`, `keyboard`, `app`, `img`, `config`)

各 Phase の終わりに動作確認し、コミット。

### 6-6. 1 つの demo を作るときの最短フロー

```
1. Vue 版 catalog-data.ts でエントリ確認 (component, demo 名)
2. https://ionicframework.com/docs/ja/api/<component> を開く
3. React タブに切替
4. 該当サンプルをコピー
5. 新規ファイル src/pages/samples/catalog/demos/<component>/<Demo>.tsx を作成
6. 上の共通テンプレに当てはめて貼る（本体 + sourceCode 両方）
7. 左サイドバーから遷移して表示確認
8. 次の demo へ
```

### Phase 6 完了条件（段階的）
- [ ] Phase 6a: 表示系 component のうち**公式 React サンプルがある demo** が全部 /samples/catalog/ 下で動く
- [ ] 公式 React サンプルが無い demo はサイドバーから消えている（`catalog-data.ts` から削除済み）
- [ ] Phase 6b 以降は随時判断（全 410 demo の完走は必須ではない）

---

## Phase 7: Android 組み込み確認

```bash
# プロジェクトルートで
npm run build
npx cap add android          # 初回のみ
npx cap sync android
```

`capacitor.config.ts` は**本プロジェクトと別の `appId`** にする:

```ts
// 例: jp.co.example.warehouse.react
const config: CapacitorConfig = {
  appId: 'jp.co.example.warehouse.react',
  appName: '倉庫管理(React)',
  webDir: 'dist',
};
```

Android Studio で `android/` を開き、Gradle Sync → Run で実機/エミュレータに展開して、`/samples` メニューから Ionicons と Catalog を触って動くこと確認。

詳しい手順は本プロジェクトの [`docs/guides/25-android-studio-integration-howto.md`](./25-android-studio-integration-howto.md) を参照。**コマンド列は全く同じ**。

### Phase 7 完了条件
- [ ] APK/エミュレータで起動する
- [ ] 実機で Ionicons 全集と Catalog の初期表示が OK

---

## Vue → React 変換チートシート（プロジェクト固有コード用）

**demo の移植には使わない**（Phase 6-4 の方針により、公式サンプルが無い demo はスキップする）。

このチートシートは **Ionic 公式 component ではないコード** — `SamplesIndexPage` / `IoniconsCatalog` / `CatalogLayout` / `CatalogSidebar` / `CatalogWelcome` — を Vue から React に書き直すときにだけ使う。


| カテゴリ | Vue | React |
|---|---|---|
| コンポーネント定義 | `<script setup lang="ts">` + `<template>` | `const Foo: React.FC = () => (<> ... </>)` |
| props | `defineProps<{ x: string }>()` | 関数引数 `({ x }: { x: string })` |
| emits | `defineEmits<{ (e: 'foo', v: string): void }>()` | props に関数を渡す: `onFoo: (v: string) => void` |
| slots | `<slot>` / `<slot name="xxx">` | `children` / 任意の prop（`header` 等） |
| 双方向バインド | `v-model="x"` | `value={x} onChange={(e) => setX(...)}` |
| 条件分岐 | `v-if` / `v-else` | `{cond ? <A /> : <B />}` |
| リスト | `v-for="i in xs" :key="i.id"` | `{xs.map((i) => <div key={i.id}>...</div>)}` |
| 参照 | `ref` / `reactive` | `useState` / `useReducer` |
| 派生値 | `computed` | `useMemo` |
| 副作用 | `onMounted` / `onUnmounted` / `watch` | `useEffect` |
| ルーティング | `useRouter()` / `useRoute()` / `router-link` | `useHistory()` / `useParams()` / `<Link>` or `routerLink` |
| ナビゲーション | `router.push('/x')` | `history.push('/x')` |
| クラス | `class="a"` / `:class="..."` | `className="a"` / `className={...}` |
| インラインスタイル | `style="color: red"` | `style={{ color: 'red' }}` |

### Ionic 部品の import 置き換え

Vue:
```ts
import { IonButton, IonIcon } from '@ionic/vue';
```

React:
```ts
import { IonButton, IonIcon } from '@ionic/react';
```

**コンポーネント名は同一**（`IonButton`, `IonIcon`, `IonPage`, ...）。差し替えは import 文のみ。

### React Router（v5）の典型イディオム

```tsx
// 遷移
import { useHistory } from 'react-router-dom';
const history = useHistory();
history.push('/samples/catalog');

// URL パラメータ
import { useParams } from 'react-router-dom';
const { slug } = useParams<{ slug: string }>();
```

---

## 引き継ぎ用: 本プロジェクトで参照すべきファイル一覧

次セッションで作業する際、本プロジェクトの以下を**読むだけ**使う:

| 目的 | パス |
|---|---|
| メニュー原本 | `src/views/samples/SamplesIndexPage.vue` |
| アイコン集原本 | `src/views/samples/IoniconsCatalog.vue` |
| Catalog Layout 原本 | `src/views/samples/catalog/CatalogLayout.vue` |
| Catalog Sidebar 原本 | `src/views/samples/catalog/CatalogSidebar.vue` |
| Catalog Welcome 原本 | `src/views/samples/catalog/CatalogWelcome.vue` |
| Catalog データ定義 | `src/views/samples/catalog/catalog-data.ts`（無変更でコピー可） |
| 各 Demo 原本 | `src/views/samples/catalog/demos/<component>/<Demo>.vue`（410 本） |
| ルーティングで参考 | `src/router/index.ts`（glob による自動ルート生成ロジック） |
| CSS / テーマ | `src/theme/variables.css`（コピー可） |
| Ionic CSS import 一式 | `src/main.ts` の CSS 行 |
| Android 手順 | `docs/guides/25-android-studio-integration-howto.md` |

**絶対に編集しないこと**。新プロジェクトは完全に独立したディレクトリで作る。

---

## チェックリスト（サマリ）

- [ ] Phase 1: スキャフォールド
- [ ] Phase 2: 依存・エイリアス・CSS
- [ ] Phase 3: ルーティング雛形 + Samples メニュー（2 項目）
- [ ] Phase 4: Ionicons Catalog
- [ ] Phase 5: Catalog シェル（Layout / Sidebar / Welcome / 動的ルート基盤）
- [ ] Phase 6a: 小型 demo（Accordion, Badge, Chip, Icon, Label, Note, Text, Title, Thumbnail, Spinner）
- [ ] Phase 6b: フォーム系 demo
- [ ] Phase 6c: レイアウト系 demo
- [ ] Phase 6d: オーバーレイ系 demo
- [ ] Phase 6e: 残り demo
- [ ] Phase 7: Android ビルド & 実機確認

---

## 失敗しがちなポイント

| 症状 | 原因 | 対策 |
|---|---|---|
| `IonRouterOutlet` で遷移しても URL だけ変わり画面が変わらない | `Route` が直下にない / `exact` の有無 | `IonRouterOutlet` 直下に `Route` を並べ、子階層のコンテナルートは非 exact にする |
| react-router v6 が入って型エラー多発 | Ionic React 8 は v5 系 | `react-router@^5 react-router-dom@^5 @types/react-router-dom@^5` を明示 |
| `navigator.clipboard` が Android WebView で失敗 | HTTPS/権限不足 | アイコンコピー機能は Android 側で動作を実機確認。必要なら Capacitor Clipboard プラグインへ差し替え |
| `import.meta.glob` で 410 本を一括 eager import するとビルド膨張 | eager: true にしている | `eager: false` + `React.lazy` + `Suspense` で遅延ロード |
| Vue の `v-model` を `value` だけに置換してしまい双方向でなくなる | handler 忘れ | `value={x} onIonInput={(e) => setX(e.detail.value!)}` のセット |
| Vue の `@click.stop` 相当 | React は `e.stopPropagation()` を明示的に呼ぶ | handler 内で `e.stopPropagation()` |
