<template>
  <PageLayout
    title="在庫照会"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <!-- A) 縦並び型 — 検索バー + 一覧 + 結果カード -->
    <template v-if="layout === 'vertical'">
      <ion-list class="ion-margin-top">
        <SearchBar v-model="itemCode" label="品目コード" placeholder="スキャンまたは入力して検索"
          @search="search" @scan="scanAndSearch" />
      </ion-list>
      <DataList
        v-if="searched && !result && filteredListItems.length > 0"
        :items="filteredListItems"
        @select="selectFromList"
      />
      <ResultCard :visible="!!result" :title="result?.itemName ?? ''" :subtitle="result?.itemCode ?? ''"
        :items="resultItems" />
      <ion-button v-if="result" expand="block" fill="outline" class="ion-margin-top" @click="resetSearch">
        一覧に戻る
      </ion-button>
    </template>

    <!-- B) グループ分け型 — 検索カード + 一覧 + 結果カード -->
    <template v-if="layout === 'grouped'">
      <ion-card class="ion-margin-top">
        <ion-card-header>
          <ion-card-subtitle>検索条件</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="none">
            <SearchBar v-model="itemCode" label="品目コード" placeholder="スキャンまたは入力して検索"
              @search="search" @scan="scanAndSearch" />
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>{{ result ? '検索結果' : '在庫一覧' }}</ion-card-subtitle>
          <ion-card-title v-if="result">{{ result.itemName }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <template v-if="result">
            <ion-list lines="none">
              <ion-item v-for="item in resultItems" :key="item.label">
                <ion-label>{{ item.label }}</ion-label>
                <ion-note slot="end">{{ item.value }}</ion-note>
              </ion-item>
            </ion-list>
            <ion-button expand="block" fill="outline" class="ion-margin-top" @click="resetSearch">
              一覧に戻る
            </ion-button>
          </template>
          <DataList v-else-if="searched && filteredListItems.length > 0" :items="filteredListItems" @select="selectFromList" />
          <p v-else class="ion-padding ion-text-center" style="color:var(--ion-color-medium)">検索ボタンを押してください</p>
        </ion-card-content>
      </ion-card>
    </template>

    <!-- C) ステッパー型 — スキャン→結果の2ステップ -->
    <template v-if="layout === 'stepper'">
      <div class="ion-margin-top ion-padding-horizontal">
        <ion-text color="medium">
          <p>ステップ {{ searchDone ? '2/2: 結果表示' : '1/2: 品目スキャン' }}</p>
        </ion-text>
        <ion-progress-bar :value="searchDone ? 1 : 0.5" />
      </div>

      <template v-if="!searchDone">
        <ion-list class="ion-margin-top">
          <SearchBar v-model="itemCode" label="品目コード" placeholder="スキャンまたは入力して検索"
            @search="search" @scan="scanAndSearch" />
        </ion-list>
        <DataList v-if="searched && filteredListItems.length > 0" :items="filteredListItems" @select="selectFromList" />
      </template>
      <template v-else>
        <ResultCard :visible="!!result" :title="result?.itemName ?? ''" :subtitle="result?.itemCode ?? ''"
          :items="resultItems" />
        <ion-button expand="block" fill="outline" class="ion-margin-top" @click="resetSearch">
          別の品目を検索
        </ion-button>
      </template>
    </template>

    <FeedbackToast :message="errorMessage" color="danger" @dismiss="errorMessage = ''" />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonLabel, IonNote, IonButton, IonText, IonProgressBar } from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import SearchBar from '@/components/SearchBar.vue';
import ResultCard from '@/components/ResultCard.vue';
import DataList from '@/components/DataList.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import type { InventoryInfo, MenuAction, DataListItem } from '@/types';

type LayoutType = 'vertical' | 'grouped' | 'stepper';

const layout = ref<LayoutType>((localStorage.getItem('inventoryLayout') as LayoutType) || 'vertical');
const searchDone = ref(false);

const menuItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
  { label: 'リスト検索', action: 'list-search' },
  { label: 'A) 縦並び表示', action: 'vertical' },
  { label: 'B) グループ表示', action: 'grouped' },
  { label: 'C) ステッパー表示', action: 'stepper' },
];

const onMenuSelect = (action: string) => {
  if (['vertical', 'grouped', 'stepper'].includes(action)) {
    layout.value = action as LayoutType;
    localStorage.setItem('inventoryLayout', action);
    searchDone.value = false;
  }
};

const { status, startScan, onScanResult } = useSP2Scanner();

// モックデータ
const mockInventory: InventoryInfo[] = [
  { itemCode: 'ITEM-001', itemName: '防寒手袋', location: 'A-01-01', quantity: 150 },
  { itemCode: 'ITEM-002', itemName: '作業帽', location: 'A-01-02', quantity: 80 },
  { itemCode: 'ITEM-003', itemName: '安全靴 26cm', location: 'A-02-01', quantity: 45 },
  { itemCode: 'ITEM-004', itemName: '安全靴 27cm', location: 'A-02-02', quantity: 32 },
  { itemCode: 'ITEM-005', itemName: '防塵マスク', location: 'B-01-01', quantity: 500 },
  { itemCode: 'ITEM-006', itemName: '保護メガネ', location: 'B-01-02', quantity: 120 },
  { itemCode: 'ITEM-007', itemName: '作業服 上 M', location: 'C-01-01', quantity: 60 },
  { itemCode: 'ITEM-008', itemName: '作業服 上 L', location: 'C-01-02', quantity: 75 },
  { itemCode: 'ITEM-009', itemName: '作業服 下 M', location: 'C-02-01', quantity: 55 },
  { itemCode: 'ITEM-010', itemName: '作業服 下 L', location: 'C-02-02', quantity: 70 },
  { itemCode: 'ITEM-011', itemName: '軍手', location: 'D-01-01', quantity: 1000 },
  { itemCode: 'ITEM-012', itemName: 'ヘルメット', location: 'D-01-02', quantity: 90 },
];

const itemCode = ref('');
const result = ref<InventoryInfo | null>(null);
const errorMessage = ref('');
const searched = ref(false);
const filteredListItems = ref<DataListItem[]>([]);

const resultItems = computed(() => {
  if (!result.value) return [];
  return [
    { label: '品目コード', value: result.value.itemCode },
    { label: 'ロケーション', value: result.value.location },
    { label: '在庫数', value: result.value.quantity },
  ];
});

onScanResult((scanResult) => {
  itemCode.value = scanResult.value;
  search();
});

const scanAndSearch = async () => {
  await startScan();
};

const search = () => {
  result.value = null;
  searched.value = true;
  const keyword = itemCode.value.toLowerCase();
  const matches = mockInventory.filter((inv) =>
    !keyword ||
    inv.itemCode.toLowerCase().includes(keyword) ||
    inv.itemName.toLowerCase().includes(keyword)
  );

  if (matches.length === 1) {
    // 1件だけなら直接詳細表示
    result.value = matches[0];
    searchDone.value = true;
    filteredListItems.value = [];
  } else if (matches.length > 1) {
    // 複数件なら一覧表示
    filteredListItems.value = matches.map((inv) => ({
      id: inv.itemCode,
      title: inv.itemName,
      subtitle: `${inv.itemCode} / ${inv.location}`,
      note: `${inv.quantity}個`,
    }));
  } else {
    filteredListItems.value = [];
    errorMessage.value = '在庫情報が見つかりません';
  }
};

const selectFromList = (id: string) => {
  const found = mockInventory.find((inv) => inv.itemCode === id);
  if (found) {
    itemCode.value = found.itemCode;
    result.value = found;
    searchDone.value = true;
  }
};

const resetSearch = () => {
  itemCode.value = '';
  result.value = null;
  searchDone.value = false;
  searched.value = false;
  filteredListItems.value = [];
};
</script>
