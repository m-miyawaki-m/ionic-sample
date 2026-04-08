<template>
  <PageLayout
    title="コンポーネント一覧"
    :menu-items="sampleMenuItems"
    @menu-select="onMenuSelect"
  >
    <p class="ion-padding-horizontal ion-text-center">
      業務画面で使用する共通コンポーネントの一覧です。
    </p>

    <!-- ========== メニュー3パターン比較 ========== -->
    <ion-list-header><ion-label>メニュー比較（3パターン）</ion-label></ion-list-header>
    <div class="ion-padding-horizontal">
      <ion-button @click="openPopoverMenu">A) Popover</ion-button>
      <ion-button @click="showActionSheet = true">B) ActionSheet</ion-button>
      <ion-button @click="showSideMenu = true">C) サイドメニュー</ion-button>
      <p>選択結果: {{ menuResult || '(未選択)' }}</p>
    </div>

    <!-- Popover メニュー -->
    <ion-popover
      :is-open="showPopoverMenu"
      :event="popoverEvent"
      @did-dismiss="showPopoverMenu = false"
    >
      <ion-content>
        <ion-list lines="none">
          <ion-item
            v-for="item in menuDemoItems"
            :key="item.action"
            button
            :detail="false"
            @click="selectMenuDemo('Popover', item.label)"
          >
            <ion-label>{{ item.label }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-popover>

    <!-- ActionSheet メニュー -->
    <ion-action-sheet
      :is-open="showActionSheet"
      header="スキャンモード選択"
      :buttons="actionSheetButtons"
      @did-dismiss="showActionSheet = false"
    />

    <!-- サイドメニュー (モーダルで再現) -->
    <ion-modal
      :is-open="showSideMenu"
      :initial-breakpoint="1"
      :breakpoints="[0, 1]"
      @did-dismiss="showSideMenu = false"
    >
      <ion-header>
        <ion-toolbar>
          <ion-title>メニュー</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="showSideMenu = false">閉じる</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item
            v-for="item in menuDemoItems"
            :key="item.action"
            button
            :detail="false"
            @click="selectMenuDemo('サイドメニュー', item.label)"
          >
            <ion-label>{{ item.label }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-modal>

    <!-- ========== ScannerStatus ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>ScannerStatus</ion-label></ion-list-header>
    <div class="ion-padding-horizontal">
      <ScannerStatus status="connected" />
      <ScannerStatus status="disconnected" />
      <ScannerStatus status="unknown" />
    </div>

    <!-- ========== ScanInput ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>ScanInput</ion-label></ion-list-header>
    <ion-list>
      <ScanInput
        v-model="demoScanValue"
        label="スキャン入力サンプル"
        placeholder="スキャンまたは入力"
        @scan="onDemoScan"
      />
    </ion-list>
    <p class="ion-padding-horizontal">値: {{ demoScanValue || '(未入力)' }}</p>

    <!-- ========== NumberInput ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>NumberInput</ion-label></ion-list-header>
    <ion-list>
      <NumberInput
        v-model="demoNumberValue"
        label="数量入力サンプル"
        placeholder="0"
        :min="0"
      />
    </ion-list>
    <p class="ion-padding-horizontal">値: {{ demoNumberValue }}</p>

    <!-- ========== SearchBar ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>SearchBar</ion-label></ion-list-header>
    <ion-list>
      <SearchBar
        v-model="demoSearchValue"
        label="検索サンプル"
        placeholder="検索キーワード"
        @search="onDemoSearch"
        @scan="onDemoScan"
      />
    </ion-list>
    <p class="ion-padding-horizontal">検索値: {{ demoSearchValue || '(未入力)' }}</p>

    <!-- ========== ResultCard ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>ResultCard</ion-label></ion-list-header>
    <ResultCard
      :visible="true"
      title="サンプル品目"
      subtitle="ITEM-001"
      :items="[
        { label: 'ロケーション', value: 'A-01-03' },
        { label: '在庫数', value: 150 },
        { label: '単位', value: '個' },
      ]"
    />

    <!-- ========== DataList ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>DataList</ion-label></ion-list-header>
    <DataList
      :items="demoListItems"
      @select="onDemoListSelect"
    />
    <p class="ion-padding-horizontal">選択: {{ demoSelectedId || '(未選択)' }}</p>

    <!-- ========== SelectPopup ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>SelectPopup</ion-label></ion-list-header>
    <div class="ion-padding-horizontal">
      <ion-button @click="showSelectPopup = true">ポップアップを開く</ion-button>
      <p>選択値: {{ demoSelectValue || '(未選択)' }}</p>
    </div>
    <SelectPopup
      :is-open="showSelectPopup"
      title="選択してください"
      :options="demoSelectOptions"
      :selected-value="demoSelectValue"
      @select="(v) => demoSelectValue = v"
      @close="showSelectPopup = false"
    />

    <!-- ========== SubmitButton ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>SubmitButton</ion-label></ion-list-header>
    <div class="ion-padding-horizontal">
      <SubmitButton label="登録" @submit="onDemoSubmit" :loading="demoLoading" />
      <SubmitButton label="照合・送信" loading-label="照合中..." @submit="onDemoSubmit" :loading="demoLoading" />
      <SubmitButton label="無効状態" :disabled="true" @submit="onDemoSubmit" />
    </div>

    <!-- ========== FeedbackToast ========== -->
    <ion-list-header class="ion-margin-top"><ion-label>FeedbackToast</ion-label></ion-list-header>
    <div class="ion-padding-horizontal ion-padding-bottom">
      <ion-button color="success" @click="showSuccessToast">成功Toast</ion-button>
      <ion-button color="danger" @click="showErrorToast">エラーToast</ion-button>
    </div>

    <FeedbackToast
      :message="toastMessage"
      :color="toastColor"
      @dismiss="toastMessage = ''"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonList, IonListHeader, IonLabel, IonButton,
  IonPopover, IonContent, IonItem,
  IonActionSheet,
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons,
} from '@ionic/vue';
import PageLayout from '@/components/PageLayout.vue';
import ScannerStatus from '@/components/ScannerStatus.vue';
import ScanInput from '@/components/ScanInput.vue';
import NumberInput from '@/components/NumberInput.vue';
import SearchBar from '@/components/SearchBar.vue';
import ResultCard from '@/components/ResultCard.vue';
import DataList from '@/components/DataList.vue';
import SelectPopup from '@/components/SelectPopup.vue';
import SubmitButton from '@/components/SubmitButton.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import type { MenuAction, DataListItem, SelectOption } from '@/types';

// ===== PageLayout の ActionMenu（実際に採用中のPopover方式） =====
const sampleMenuItems: MenuAction[] = [
  { label: 'サンプルアクション1', action: 'sample1' },
  { label: 'サンプルアクション2', action: 'sample2' },
];
const onMenuSelect = (action: string) => {
  menuResult.value = `ActionMenu(採用中): ${action}`;
};

// ===== メニュー3パターン比較 =====
const menuDemoItems: MenuAction[] = [
  { label: 'QRコード読み取り', action: 'qr' },
  { label: 'バーコード読み取り', action: 'barcode' },
  { label: '手入力', action: 'manual' },
];
const menuResult = ref('');

// A) Popover
const showPopoverMenu = ref(false);
const popoverEvent = ref<Event | null>(null);
const openPopoverMenu = (e: Event) => {
  popoverEvent.value = e;
  showPopoverMenu.value = true;
};

// B) ActionSheet
const showActionSheet = ref(false);
const actionSheetButtons = [
  ...menuDemoItems.map((item) => ({
    text: item.label,
    handler: () => { menuResult.value = `ActionSheet: ${item.label}`; },
  })),
  { text: 'キャンセル', role: 'cancel' as const },
];

// C) サイドメニュー
const showSideMenu = ref(false);

const selectMenuDemo = (type: string, label: string) => {
  menuResult.value = `${type}: ${label}`;
  showPopoverMenu.value = false;
  showSideMenu.value = false;
};

// ===== ScanInput demo =====
const demoScanValue = ref('');
const onDemoScan = () => {
  demoScanValue.value = 'SCAN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// ===== NumberInput demo =====
const demoNumberValue = ref(0);

// ===== SearchBar demo =====
const demoSearchValue = ref('');
const onDemoSearch = () => {
  menuResult.value = `検索実行: ${demoSearchValue.value}`;
};

// ===== DataList demo =====
const demoListItems: DataListItem[] = [
  { id: '1', title: '品目A', subtitle: 'A-01-01', note: '100個' },
  { id: '2', title: '品目B', subtitle: 'B-02-03', note: '50個' },
  { id: '3', title: '品目C', subtitle: 'C-01-02', note: '200個' },
];
const demoSelectedId = ref('');
const onDemoListSelect = (id: string) => {
  demoSelectedId.value = id;
};

// ===== SelectPopup demo =====
const showSelectPopup = ref(false);
const demoSelectValue = ref('');
const demoSelectOptions: SelectOption[] = [
  { label: 'QRコード読み取り', value: 'qr' },
  { label: 'バーコード読み取り', value: 'barcode' },
  { label: '手入力', value: 'manual' },
];

// ===== SubmitButton demo =====
const demoLoading = ref(false);
const onDemoSubmit = () => {
  demoLoading.value = true;
  setTimeout(() => { demoLoading.value = false; }, 2000);
};

// ===== FeedbackToast demo =====
const toastMessage = ref('');
const toastColor = ref('success');
const showSuccessToast = () => {
  toastMessage.value = '操作が成功しました';
  toastColor.value = 'success';
};
const showErrorToast = () => {
  toastMessage.value = 'エラーが発生しました';
  toastColor.value = 'danger';
};
</script>
