<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/pickup" />
        </ion-buttons>
        <ion-title>チェックボックス パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 8px">
        ion-checkbox は単一の ON/OFF 選択に使う基本部品。
        color / justify / alignment / label-placement などのプロパティで多様な配置に対応し、
        indeterminate や disabled など状態管理も柔軟に行える。
      </p>

      <!-- 1. Color -->
      <div class="section">
        <h2>Color</h2>
        <p>色で重要度やカテゴリを視覚的に区別する。</p>
        <div class="check-row">
          <ion-checkbox color="primary" :checked="true">primary</ion-checkbox>
          <ion-checkbox color="secondary" :checked="true">secondary</ion-checkbox>
          <ion-checkbox color="success" :checked="true">success</ion-checkbox>
          <ion-checkbox color="warning" :checked="true">warning</ion-checkbox>
          <ion-checkbox color="danger" :checked="true">danger</ion-checkbox>
        </div>
      </div>

      <!-- 2. Justify -->
      <div class="section">
        <h2>Justify</h2>
        <p>justify でラベルとチェックの間隔を調整。space-between はリスト向き。</p>
        <ion-list lines="full" style="border-radius:8px;overflow:hidden;">
          <ion-item>
            <ion-checkbox justify="start">justify="start"</ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-checkbox justify="end">justify="end"</ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-checkbox justify="space-between">justify="space-between"</ion-checkbox>
          </ion-item>
        </ion-list>
      </div>

      <!-- 3. Alignment -->
      <div class="section">
        <h2>Alignment</h2>
        <p>長いラベル時の垂直揃え。start=上揃え、center=中央揃え。</p>
        <ion-list lines="full" style="border-radius:8px;overflow:hidden;">
          <ion-item>
            <ion-checkbox alignment="start" justify="space-between">
              alignment="start" — 長いラベルテキストが複数行に折り返された場合、チェックボックスはラベルの上端に揃います。
            </ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-checkbox alignment="center" justify="space-between">
              alignment="center" — 長いラベルテキストが複数行に折り返された場合、チェックボックスはラベルの中央に揃います。
            </ion-checkbox>
          </ion-item>
        </ion-list>
      </div>

      <!-- 4. Label Placement -->
      <div class="section">
        <h2>Label Placement</h2>
        <p>ラベル位置。end(右)がデフォルト。start(左)はリスト内で使う。</p>
        <ion-list lines="full" style="border-radius:8px;overflow:hidden;">
          <ion-item>
            <ion-checkbox label-placement="start">label-placement="start"</ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-checkbox label-placement="end">label-placement="end"</ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-checkbox label-placement="fixed">label-placement="fixed"</ion-checkbox>
          </ion-item>
          <ion-item>
            <ion-checkbox label-placement="stacked">label-placement="stacked"</ion-checkbox>
          </ion-item>
        </ion-list>
      </div>

      <!-- 5. Indeterminate -->
      <div class="section">
        <h2>Indeterminate</h2>
        <p>indeterminate=一部選択状態。親チェックボックスに使う。</p>
        <div class="check-row">
          <ion-checkbox :indeterminate="true" :checked="false">一部選択中（indeterminate）</ion-checkbox>
        </div>
      </div>

      <!-- 6. Helper & Error -->
      <div class="section">
        <h2>Helper &amp; Error</h2>
        <p>バリデーション。必須チェックの未入力時にエラー表示。</p>
        <div class="check-row">
          <ion-checkbox
            helper-text="利用規約を確認してください"
            error-text="同意が必要です"
          >
            利用規約に同意する（helper-text）
          </ion-checkbox>
        </div>
        <div class="check-row" style="margin-top:12px">
          <ion-checkbox
            class="ion-invalid ion-touched"
            error-text="同意が必要です"
          >
            利用規約に同意する（error 表示）
          </ion-checkbox>
        </div>
      </div>

      <!-- 7. Disabled -->
      <div class="section">
        <h2>Disabled</h2>
        <p>disabled でグレーアウト。チェック済み/未チェック両方。</p>
        <div class="check-row">
          <ion-checkbox :disabled="true" :checked="true">disabled + checked</ion-checkbox>
          <ion-checkbox :disabled="true" :checked="false">disabled + unchecked</ion-checkbox>
        </div>
      </div>

      <!-- 8. 検品チェックリスト -->
      <div class="section">
        <h2>検品チェックリスト</h2>
        <p>ion-list 内にチェック項目を並べる。完了数/全数をリアルタイム表示。</p>
        <p class="status-text">完了: {{ checkedInspections.length }}/{{ inspectionItems.length }}</p>
        <ion-list lines="full" style="border-radius:8px;overflow:hidden;">
          <ion-item v-for="item in inspectionItems" :key="item.id">
            <ion-checkbox
              justify="space-between"
              :checked="checkedInspections.includes(item.id)"
              @ionChange="toggleInspection(item.id, $event)"
            >
              {{ item.label }}
            </ion-checkbox>
          </ion-item>
        </ion-list>
      </div>

      <!-- 9. 利用規約同意 -->
      <div class="section">
        <h2>利用規約同意</h2>
        <p>単独チェック。未チェックで送信ボタンを disabled にする。</p>
        <ion-list lines="none" style="border-radius:8px;overflow:hidden;">
          <ion-item>
            <ion-checkbox
              justify="space-between"
              v-model="agreed"
            >
              利用規約およびプライバシーポリシーに同意する
            </ion-checkbox>
          </ion-item>
        </ion-list>
        <ion-button expand="block" :disabled="!agreed" style="margin-top:12px">
          送信する
        </ion-button>
      </div>

      <!-- 10. 一括選択 -->
      <div class="section">
        <h2>一括選択</h2>
        <p>全選択/全解除の親チェック。子の状態で indeterminate を連動。</p>
        <ion-list lines="full" style="border-radius:8px;overflow:hidden;">
          <ion-item>
            <ion-checkbox
              justify="space-between"
              :checked="allSelected"
              :indeterminate="isIndeterminate"
              @ionChange="toggleAll($event)"
            >
              <strong>すべて選択</strong>
            </ion-checkbox>
          </ion-item>
          <ion-item v-for="child in childItems" :key="child.id">
            <ion-checkbox
              justify="space-between"
              :checked="child.checked"
              @ionChange="toggleChild(child.id, $event)"
            >
              {{ child.label }}
            </ion-checkbox>
          </ion-item>
        </ion-list>
      </div>

      <!-- 11. フィルタチェック -->
      <div class="section">
        <h2>フィルタチェック</h2>
        <p>横並びでチップ風の選択UI。flex-wrap で折返し。</p>
        <div class="chip-row">
          <ion-checkbox
            v-for="tag in filterTags"
            :key="tag.id"
            class="chip-check"
            :checked="tag.checked"
            @ionChange="toggleTag(tag.id, $event)"
          >
            {{ tag.label }}
          </ion-checkbox>
        </div>
      </div>

      <!-- 12. 設定画面 -->
      <div class="section">
        <h2>設定画面</h2>
        <p>ion-item 内で justify='space-between' 配置。toggle 的な見た目。</p>
        <ion-list lines="full" style="border-radius:8px;overflow:hidden;">
          <ion-item v-for="setting in settings" :key="setting.id">
            <ion-checkbox
              justify="space-between"
              :checked="setting.checked"
              @ionChange="toggleSetting(setting.id, $event)"
            >
              {{ setting.label }}
            </ion-checkbox>
          </ion-item>
        </ion-list>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCheckbox,
  IonItem,
  IonList,
  IonButton,
  IonLabel,
} from '@ionic/vue';

// --- 8. 検品チェックリスト ---
const inspectionItems = [
  { id: 1, label: '品番確認' },
  { id: 2, label: '数量確認' },
  { id: 3, label: '外観チェック' },
  { id: 4, label: '賞味期限確認' },
  { id: 5, label: '梱包状態確認' },
];
const checkedInspections = ref([]);

function toggleInspection(id, event) {
  if (event.detail.checked) {
    if (!checkedInspections.value.includes(id)) {
      checkedInspections.value = [...checkedInspections.value, id];
    }
  } else {
    checkedInspections.value = checkedInspections.value.filter((v) => v !== id);
  }
}

// --- 9. 利用規約同意 ---
const agreed = ref(false);

// --- 10. 一括選択 ---
const childItems = ref([
  { id: 1, label: '商品A', checked: false },
  { id: 2, label: '商品B', checked: false },
  { id: 3, label: '商品C', checked: false },
]);

const allSelected = computed(() => childItems.value.every((c) => c.checked));
const isIndeterminate = computed(
  () => childItems.value.some((c) => c.checked) && !allSelected.value
);

function toggleAll(event) {
  const checked = event.detail.checked;
  childItems.value = childItems.value.map((c) => ({ ...c, checked }));
}

function toggleChild(id, event) {
  childItems.value = childItems.value.map((c) =>
    c.id === id ? { ...c, checked: event.detail.checked } : c
  );
}

// --- 11. フィルタチェック ---
const filterTags = ref([
  { id: 1, label: '冷蔵', checked: false },
  { id: 2, label: '冷凍', checked: false },
  { id: 3, label: '常温', checked: true },
  { id: 4, label: '危険物', checked: false },
  { id: 5, label: '精密機器', checked: false },
  { id: 6, label: '大型', checked: false },
]);

function toggleTag(id, event) {
  filterTags.value = filterTags.value.map((t) =>
    t.id === id ? { ...t, checked: event.detail.checked } : t
  );
}

// --- 12. 設定画面 ---
const settings = ref([
  { id: 1, label: '通知ON', checked: true },
  { id: 2, label: 'ダークモード', checked: false },
  { id: 3, label: 'サウンド', checked: true },
  { id: 4, label: '自動ログイン', checked: false },
  { id: 5, label: 'データ同期', checked: true },
]);

function toggleSetting(id, event) {
  settings.value = settings.value.map((s) =>
    s.id === id ? { ...s, checked: event.detail.checked } : s
  );
}
</script>

<style scoped>
.section {
  margin-top: 24px;
}

.section h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.section p {
  font-size: 13px;
  color: var(--ion-color-medium);
  margin-top: 0;
  margin-bottom: 12px;
}

.check-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.status-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--ion-color-primary);
  margin-bottom: 8px;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.chip-check {
  --size: 18px;
  border: 1px solid var(--ion-color-medium);
  border-radius: 16px;
  padding: 4px 12px;
  font-size: 13px;
}
</style>
