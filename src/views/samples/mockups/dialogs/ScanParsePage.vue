<template>
  <PageLayout title="入力補助（ページ遷移）" back-href="/samples/mockups/dialog-demo">
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
