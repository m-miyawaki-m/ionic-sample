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
import ScanParseModal from '@/views/samples/mockups/dialogs/ScanParseModal.vue';
import ScanParseFullscreen from '@/views/samples/mockups/dialogs/ScanParseFullscreen.vue';
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
  router.push('/samples/mockups/dialog-demo/scan');
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
