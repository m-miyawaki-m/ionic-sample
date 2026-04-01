<template>
  <PageLayout
    title="在庫照会"
    :menu-items="menuItems"
    @menu-select="onMenuSelect"
  >
    <ScannerStatus :status="status" />

    <!-- A) 縦並び型 — 検索バー + 結果カード -->
    <template v-if="layout === 'vertical'">
      <ion-list class="ion-margin-top">
        <SearchBar v-model="itemCode" label="品目コード" placeholder="スキャンまたは入力して検索"
          @search="search" @scan="scanAndSearch" />
      </ion-list>
      <ResultCard :visible="!!result" :title="result?.itemName ?? ''" :subtitle="result?.itemCode ?? ''"
        :items="resultItems" />
    </template>

    <!-- B) グループ分け型 — 検索カード + 結果カード -->
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
      <ion-card v-if="result">
        <ion-card-header>
          <ion-card-subtitle>検索結果</ion-card-subtitle>
          <ion-card-title>{{ result.itemName }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list lines="none">
            <ion-item v-for="item in resultItems" :key="item.label">
              <ion-label>{{ item.label }}</ion-label>
              <ion-note slot="end">{{ item.value }}</ion-note>
            </ion-item>
          </ion-list>
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
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useSP2Scanner } from '@/composables/useSP2Scanner';
import { useApi } from '@/composables/useApi';
import type { InventoryInfo, MenuAction } from '@/types';

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
const { get } = useApi();

const itemCode = ref('');
const result = ref<InventoryInfo | null>(null);
const errorMessage = ref('');

const resultItems = computed(() => {
  if (!result.value) return [];
  return [
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

const search = async () => {
  result.value = null;
  const res = await get<InventoryInfo>(`/inventory/${encodeURIComponent(itemCode.value)}`);
  if (res.success && res.data) {
    result.value = res.data;
    searchDone.value = true;
  } else {
    errorMessage.value = res.error || '在庫情報が見つかりません';
  }
};

const resetSearch = () => {
  itemCode.value = '';
  result.value = null;
  searchDone.value = false;
};
</script>
