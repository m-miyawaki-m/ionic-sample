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
