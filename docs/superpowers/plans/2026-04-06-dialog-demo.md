# ダイアログ/入力補助画面デモ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** バーコードスキャン→値分解→元画面に返す入力補助画面を、モーダル/フルスクリーンモーダル/ページ遷移の3パターンで実装し、サンプルページとして公開する

**Architecture:** 共通の分解ロジックを `parseScanCode()` ユーティリティに集約。3パターンは同じUI構成（ScanInput + 分解ボタン + プレビュー + 確定）を持ち、呼び出し方と値の返し方だけが異なる。ページ遷移パターンでは composable で値を受け渡す。

**Tech Stack:** Ionic 8 / Vue 3 Composition API / TypeScript / vue-router

---

## File Structure

| ファイル | 責務 |
|---------|------|
| `src/types/index.ts` | `ParsedScanCode` 型を追加 |
| `src/utils/parseScanCode.ts` | バーコード値の分解ロジック |
| `src/composables/useScanTransfer.ts` | ページ遷移パターン用の値受け渡し |
| `src/views/samples/DialogDemoPage.vue` | デモ親ページ（3パターンのボタン + 結果表示 + 使い方説明） |
| `src/views/samples/dialogs/ScanParseModal.vue` | パターン1: モーダル |
| `src/views/samples/dialogs/ScanParseFullscreen.vue` | パターン2: フルスクリーンモーダル |
| `src/views/samples/dialogs/ScanParsePage.vue` | パターン3: ページ遷移先 |
| `src/router/index.ts` | ルート2つ追加 |
| `src/views/HomePage.vue` | サンプルリンク追加 |

---

### Task 1: 型定義と分解ユーティリティ

**Files:**
- Modify: `src/types/index.ts`
- Create: `src/utils/parseScanCode.ts`

- [ ] **Step 1: `ParsedScanCode` 型を追加**

`src/types/index.ts` の末尾に追加:

```typescript
/** バーコード分解結果 */
export interface ParsedScanCode {
  warehouseCode: string;
  shelfCode: string;
  itemCode: string;
  raw: string;
}
```

- [ ] **Step 2: 分解ユーティリティを作成**

`src/utils/parseScanCode.ts` を作成:

```typescript
import type { ParsedScanCode } from '@/types';

/**
 * バーコード値をハイフン区切りで分解する
 * 例: "WH01-A03-02-ITEM9876" → { warehouseCode: "WH01", shelfCode: "A03-02", itemCode: "ITEM9876", raw: "..." }
 */
export function parseScanCode(raw: string): ParsedScanCode {
  const parts = raw.split('-');
  if (parts.length >= 4) {
    return {
      warehouseCode: parts[0],
      shelfCode: parts[1] + '-' + parts[2],
      itemCode: parts.slice(3).join('-'),
      raw,
    };
  }
  // パースできない場合はそのまま返す
  return {
    warehouseCode: '',
    shelfCode: '',
    itemCode: raw,
    raw,
  };
}
```

- [ ] **Step 3: コミット**

```bash
git add src/types/index.ts src/utils/parseScanCode.ts
git commit -m "feat: add ParsedScanCode type and parseScanCode utility"
```

---

### Task 2: ページ遷移用の値受け渡し composable

**Files:**
- Create: `src/composables/useScanTransfer.ts`

- [ ] **Step 1: composable を作成**

`src/composables/useScanTransfer.ts` を作成:

```typescript
import { ref } from 'vue';
import type { ParsedScanCode } from '@/types';

const transferredValue = ref<ParsedScanCode | null>(null);

/** ページ遷移パターンで、入力補助画面と親画面の間で値を受け渡す */
export function useScanTransfer() {
  const send = (value: ParsedScanCode) => {
    transferredValue.value = value;
  };

  const receive = (): ParsedScanCode | null => {
    const value = transferredValue.value;
    transferredValue.value = null;
    return value;
  };

  return { send, receive };
}
```

- [ ] **Step 2: コミット**

```bash
git add src/composables/useScanTransfer.ts
git commit -m "feat: add useScanTransfer composable for page navigation pattern"
```

---

### Task 3: パターン1 — モーダルダイアログ

**Files:**
- Create: `src/views/samples/dialogs/ScanParseModal.vue`

- [ ] **Step 1: モーダルコンポーネントを作成**

`src/views/samples/dialogs/ScanParseModal.vue` を作成:

```vue
<template>
  <ion-modal :is-open="isOpen" @did-dismiss="emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-title>入力補助（モーダル）</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="emit('close')">閉じる</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ScanInput
          v-model="scanValue"
          label="バーコード読み取り"
          placeholder="スキャンまたは手入力"
          @scan="onScan"
        />
      </ion-list>

      <ion-button
        expand="block"
        class="ion-margin-top"
        :disabled="!scanValue"
        @click="parse"
      >
        分解
      </ion-button>

      <ResultCard
        :visible="parsed !== null"
        title="分解結果プレビュー"
        :items="previewItems"
      />

      <ion-button
        v-if="parsed"
        expand="block"
        color="success"
        class="ion-margin-top"
        @click="confirm"
      >
        確定
      </ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonModal, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonContent, IonList,
} from '@ionic/vue';
import ScanInput from '@/components/ScanInput.vue';
import ResultCard from '@/components/ResultCard.vue';
import { parseScanCode } from '@/utils/parseScanCode';
import type { ParsedScanCode } from '@/types';

defineProps<{ isOpen: boolean }>();

const emit = defineEmits<{
  close: [];
  confirm: [value: ParsedScanCode];
}>();

const scanValue = ref('');
const parsed = ref<ParsedScanCode | null>(null);

const previewItems = computed(() => {
  if (!parsed.value) return [];
  return [
    { label: '倉庫コード', value: parsed.value.warehouseCode },
    { label: '棚番', value: parsed.value.shelfCode },
    { label: '品目コード', value: parsed.value.itemCode },
    { label: '元の値', value: parsed.value.raw },
  ];
});

const onScan = () => {
  scanValue.value = 'WH01-A03-02-ITEM9876';
};

const parse = () => {
  parsed.value = parseScanCode(scanValue.value);
};

const confirm = () => {
  if (parsed.value) {
    emit('confirm', parsed.value);
    scanValue.value = '';
    parsed.value = null;
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/samples/dialogs/ScanParseModal.vue
git commit -m "feat: add ScanParseModal (pattern 1: modal dialog)"
```

---

### Task 4: パターン2 — フルスクリーンモーダル

**Files:**
- Create: `src/views/samples/dialogs/ScanParseFullscreen.vue`

- [ ] **Step 1: フルスクリーンモーダルを作成**

`src/views/samples/dialogs/ScanParseFullscreen.vue` を作成:

```vue
<template>
  <ion-modal :is-open="isOpen" @did-dismiss="emit('close')">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="emit('close')">
            <ion-icon :icon="arrowBackOutline" />
            戻る
          </ion-button>
        </ion-buttons>
        <ion-title>入力補助（フルスクリーン）</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>画面全体を覆うモーダルです。見た目はページ遷移に近いですが、ルーターは使いません。</p>

      <ion-list>
        <ScanInput
          v-model="scanValue"
          label="バーコード読み取り"
          placeholder="スキャンまたは手入力"
          @scan="onScan"
        />
      </ion-list>

      <ion-button
        expand="block"
        class="ion-margin-top"
        :disabled="!scanValue"
        @click="parse"
      >
        分解
      </ion-button>

      <ResultCard
        :visible="parsed !== null"
        title="分解結果プレビュー"
        :items="previewItems"
      />

      <ion-button
        v-if="parsed"
        expand="block"
        color="success"
        class="ion-margin-top"
        @click="confirm"
      >
        確定して戻る
      </ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  IonModal, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonContent, IonList, IonIcon,
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import ScanInput from '@/components/ScanInput.vue';
import ResultCard from '@/components/ResultCard.vue';
import { parseScanCode } from '@/utils/parseScanCode';
import type { ParsedScanCode } from '@/types';

defineProps<{ isOpen: boolean }>();

const emit = defineEmits<{
  close: [];
  confirm: [value: ParsedScanCode];
}>();

const scanValue = ref('');
const parsed = ref<ParsedScanCode | null>(null);

const previewItems = computed(() => {
  if (!parsed.value) return [];
  return [
    { label: '倉庫コード', value: parsed.value.warehouseCode },
    { label: '棚番', value: parsed.value.shelfCode },
    { label: '品目コード', value: parsed.value.itemCode },
    { label: '元の値', value: parsed.value.raw },
  ];
});

const onScan = () => {
  scanValue.value = 'WH01-A03-02-ITEM9876';
};

const parse = () => {
  parsed.value = parseScanCode(scanValue.value);
};

const confirm = () => {
  if (parsed.value) {
    emit('confirm', parsed.value);
    scanValue.value = '';
    parsed.value = null;
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/samples/dialogs/ScanParseFullscreen.vue
git commit -m "feat: add ScanParseFullscreen (pattern 2: fullscreen modal)"
```

---

### Task 5: パターン3 — ページ遷移

**Files:**
- Create: `src/views/samples/dialogs/ScanParsePage.vue`

- [ ] **Step 1: ページ遷移先コンポーネントを作成**

`src/views/samples/dialogs/ScanParsePage.vue` を作成:

```vue
<template>
  <PageLayout title="入力補助（ページ遷移）" back-href="/samples/dialog-demo">
    <p>実際のページ遷移です。URLが変わり、ブラウザの戻るボタンでも戻れます。</p>

    <ion-list>
      <ScanInput
        v-model="scanValue"
        label="バーコード読み取り"
        placeholder="スキャンまたは手入力"
        @scan="onScan"
      />
    </ion-list>

    <ion-button
      expand="block"
      class="ion-margin-top"
      :disabled="!scanValue"
      @click="parse"
    >
      分解
    </ion-button>

    <ResultCard
      :visible="parsed !== null"
      title="分解結果プレビュー"
      :items="previewItems"
    />

    <ion-button
      v-if="parsed"
      expand="block"
      color="success"
      class="ion-margin-top"
      @click="confirmAndBack"
    >
      確定して戻る
    </ion-button>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { IonList, IonButton } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScanInput from '@/components/ScanInput.vue';
import ResultCard from '@/components/ResultCard.vue';
import { parseScanCode } from '@/utils/parseScanCode';
import { useScanTransfer } from '@/composables/useScanTransfer';
import type { ParsedScanCode } from '@/types';

const router = useRouter();
const { send } = useScanTransfer();

const scanValue = ref('');
const parsed = ref<ParsedScanCode | null>(null);

const previewItems = computed(() => {
  if (!parsed.value) return [];
  return [
    { label: '倉庫コード', value: parsed.value.warehouseCode },
    { label: '棚番', value: parsed.value.shelfCode },
    { label: '品目コード', value: parsed.value.itemCode },
    { label: '元の値', value: parsed.value.raw },
  ];
});

const onScan = () => {
  scanValue.value = 'WH01-A03-02-ITEM9876';
};

const parse = () => {
  parsed.value = parseScanCode(scanValue.value);
};

const confirmAndBack = () => {
  if (parsed.value) {
    send(parsed.value);
    router.back();
  }
};
</script>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/samples/dialogs/ScanParsePage.vue
git commit -m "feat: add ScanParsePage (pattern 3: page navigation)"
```

---

### Task 6: デモ親ページ

**Files:**
- Create: `src/views/samples/DialogDemoPage.vue`

- [ ] **Step 1: デモ親ページを作成**

`src/views/samples/DialogDemoPage.vue` を作成:

```vue
<template>
  <PageLayout title="ダイアログデモ">
    <p class="ion-padding-horizontal ion-text-center">
      入力補助画面に遷移して値を分解し、元画面に返すデモです。<br>
      3つのパターンを比較できます。
    </p>

    <!-- ========== 使い方 ========== -->
    <ion-list-header><ion-label>使い方</ion-label></ion-list-header>
    <ion-card>
      <ion-card-content>
        <ol>
          <li>下のボタンで入力補助画面を開く</li>
          <li>スキャンボタン（またはデモ値 <code>WH01-A03-02-ITEM9876</code> を手入力）</li>
          <li>「分解」ボタンで値をパース</li>
          <li>「確定」で元画面に結果が返る</li>
        </ol>
      </ion-card-content>
    </ion-card>

    <!-- ========== パターン1: モーダル ========== -->
    <ion-list-header class="ion-margin-top">
      <ion-label>パターン1: モーダルダイアログ</ion-label>
    </ion-list-header>
    <div class="ion-padding-horizontal">
      <p class="pattern-desc">
        画面の上に重なって表示。背景が暗くなる。軽い入力補助に最適。
      </p>
      <ion-button expand="block" @click="showModal = true">
        モーダルを開く
      </ion-button>
      <p class="code-hint">
        <code>IonModal</code> + <code>@emit</code> で値を返却
      </p>
    </div>

    <!-- ========== パターン2: フルスクリーンモーダル ========== -->
    <ion-list-header class="ion-margin-top">
      <ion-label>パターン2: フルスクリーンモーダル</ion-label>
    </ion-list-header>
    <div class="ion-padding-horizontal">
      <p class="pattern-desc">
        画面全体を覆う。別ページに見えるがルーター遷移ではない。複雑な入力補助に向く。
      </p>
      <ion-button expand="block" @click="showFullscreen = true">
        フルスクリーンモーダルを開く
      </ion-button>
      <p class="code-hint">
        <code>IonModal</code>（全画面）+ <code>@emit</code> で値を返却
      </p>
    </div>

    <!-- ========== パターン3: ページ遷移 ========== -->
    <ion-list-header class="ion-margin-top">
      <ion-label>パターン3: ページ遷移</ion-label>
    </ion-list-header>
    <div class="ion-padding-horizontal">
      <p class="pattern-desc">
        実際のURL遷移。ブラウザ戻るボタンが使える。入力画面が独立して大きい場合に適切。
      </p>
      <ion-button expand="block" @click="goToScanPage">
        入力補助ページへ遷移
      </ion-button>
      <p class="code-hint">
        <code>router.push</code> + <code>composable</code> で値を返却
      </p>
    </div>

    <!-- ========== 結果表示 ========== -->
    <ion-list-header class="ion-margin-top">
      <ion-label>返却された結果</ion-label>
    </ion-list-header>
    <ResultCard
      :visible="result !== null"
      title="分解結果"
      :subtitle="resultPattern"
      :items="resultItems"
    />
    <p v-if="!result" class="ion-padding-horizontal ion-text-center" style="color: var(--ion-color-medium)">
      まだ結果がありません。上のボタンで試してください。
    </p>

    <!-- モーダルコンポーネント -->
    <ScanParseModal
      :is-open="showModal"
      @close="showModal = false"
      @confirm="onConfirm('モーダル', $event)"
    />
    <ScanParseFullscreen
      :is-open="showFullscreen"
      @close="showFullscreen = false"
      @confirm="onConfirm('フルスクリーン', $event)"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonListHeader, IonLabel, IonButton,
  IonCard, IonCardContent,
} from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ResultCard from '@/components/ResultCard.vue';
import ScanParseModal from '@/views/samples/dialogs/ScanParseModal.vue';
import ScanParseFullscreen from '@/views/samples/dialogs/ScanParseFullscreen.vue';
import { useScanTransfer } from '@/composables/useScanTransfer';
import type { ParsedScanCode } from '@/types';

const router = useRouter();
const { receive } = useScanTransfer();

const showModal = ref(false);
const showFullscreen = ref(false);
const result = ref<ParsedScanCode | null>(null);
const resultPattern = ref('');

const resultItems = computed(() => {
  if (!result.value) return [];
  return [
    { label: '倉庫コード', value: result.value.warehouseCode },
    { label: '棚番', value: result.value.shelfCode },
    { label: '品目コード', value: result.value.itemCode },
    { label: '元の値', value: result.value.raw },
  ];
});

const onConfirm = (pattern: string, value: ParsedScanCode) => {
  result.value = value;
  resultPattern.value = `パターン: ${pattern}`;
  showModal.value = false;
  showFullscreen.value = false;
};

const goToScanPage = () => {
  router.push('/samples/dialog-demo/scan');
};

// ページ遷移から戻ってきた時に composable から値を受け取る
onActivated(() => {
  const transferred = receive();
  if (transferred) {
    result.value = transferred;
    resultPattern.value = 'パターン: ページ遷移';
  }
});
</script>

<style scoped>
.pattern-desc {
  font-size: 14px;
  color: var(--ion-color-medium);
  margin: 4px 0 8px;
}
.code-hint {
  font-size: 12px;
  color: var(--ion-color-medium);
  margin-top: 4px;
}
.code-hint code {
  background: var(--ion-color-light);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 12px;
}
</style>
```

- [ ] **Step 2: コミット**

```bash
git add src/views/samples/DialogDemoPage.vue
git commit -m "feat: add DialogDemoPage with 3 pattern demo"
```

---

### Task 7: ルーター設定とホームページリンク追加

**Files:**
- Modify: `src/router/index.ts`
- Modify: `src/views/HomePage.vue`

- [ ] **Step 1: ルートを追加**

`src/router/index.ts` の `routes` 配列（`/samples/feedback` の後）に追加:

```typescript
  {
    path: '/samples/dialog-demo',
    name: 'DialogDemo',
    component: () => import('@/views/samples/DialogDemoPage.vue'),
  },
  {
    path: '/samples/dialog-demo/scan',
    name: 'DialogDemoScan',
    component: () => import('@/views/samples/dialogs/ScanParsePage.vue'),
  },
```

- [ ] **Step 2: ホームページにサンプルリンクを追加**

`src/views/HomePage.vue` の `samples` 配列に追加:

```typescript
  { title: 'ダイアログデモ', path: '/samples/dialog-demo', icon: chatboxOutline },
```

`chatboxOutline` を ionicons の import に追加。

- [ ] **Step 3: コミット**

```bash
git add src/router/index.ts src/views/HomePage.vue
git commit -m "feat: add dialog demo routes and home page link"
```

---

### Task 8: 動作確認

- [ ] **Step 1: ビルドが通ることを確認**

```bash
cd /home/miyaw/dev/learning/ionic-sample && npx vue-tsc --noEmit && npm run build
```

- [ ] **Step 2: 問題があれば修正してコミット**

- [ ] **Step 3: 全タスク完了の最終コミット（必要な場合のみ）**
