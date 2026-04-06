<template>
  <ion-modal :is-open="isOpen" @did-dismiss="close">
    <ion-header>
      <ion-toolbar>
        <ion-title>バーコード読み取り</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="close">閉じる</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <!-- 1. 分解パターン選択 -->
      <ion-list>
        <ion-radio-group :value="selectedPattern" @ion-change="onPatternChange">
          <ion-list-header>
            <ion-label>分解パターン</ion-label>
          </ion-list-header>
          <ion-item v-for="p in parsePatterns" :key="p.id">
            <ion-radio :value="p.id" justify="start" label-placement="end">
              <div>
                <strong>{{ p.label }}</strong>
                <br/><span class="pattern-desc">{{ p.description }}</span>
                <br/><span class="pattern-example">例: {{ p.example }}</span>
              </div>
            </ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>

      <!-- 2. バーコード読み取り -->
      <ion-list class="ion-margin-top">
        <ion-item>
          <ion-input
            v-model="localValue"
            label="バーコード値"
            label-placement="stacked"
            placeholder="手入力またはスキャン"
          />
        </ion-item>
      </ion-list>

      <ion-button expand="block" class="ion-margin-top" :disabled="scanning" @click="doScan">
        <ion-spinner v-if="scanning" name="crescent" slot="start" />
        <ion-icon v-else :icon="scanOutline" slot="start" />
        {{ scanning ? '読み取り中...' : 'スキャン' }}
      </ion-button>

      <!-- 3. 分解ボタン -->
      <ion-button
        expand="block"
        fill="outline"
        class="ion-margin-top"
        :disabled="!localValue"
        @click="parse"
      >
        分解
      </ion-button>

      <!-- 分解結果（読み取り専用） -->
      <ResultCard
        :visible="parsed !== null"
        title="分解結果"
        :items="previewItems"
      />

      <!-- 4. 確定して反映 -->
      <ion-button
        v-if="parsed"
        expand="block"
        color="success"
        class="ion-margin-top"
        @click="confirm"
      >
        確定して反映
      </ion-button>
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
  IonModal, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonButton, IonContent, IonList, IonListHeader,
  IonItem, IonInput, IonIcon, IonSpinner, IonRadioGroup, IonRadio, IonLabel,
} from '@ionic/vue';
import { scanOutline } from 'ionicons/icons';
import ResultCard from '@/components/ResultCard.vue';
import { parseScanCode, parsePatterns } from '@/utils/parseScanCode';
import type { ParsedScanCode } from '@/types';

const props = defineProps<{
  isOpen: boolean;
  scanValue?: string;
}>();

const emit = defineEmits<{
  close: [];
  scan: [];
  confirm: [value: ParsedScanCode];
}>();

const selectedPattern = ref(
  localStorage.getItem('scanParsePattern') || 'warehouse-shelf-item'
);
const localValue = ref('');
const parsed = ref<ParsedScanCode | null>(null);
const scanning = ref(false);
let scanStartedAt = 0;

const previewItems = computed(() => {
  if (!parsed.value) return [];
  return [
    { label: '倉庫コード', value: parsed.value.warehouseCode || '-' },
    { label: '棚番', value: parsed.value.shelfCode || '-' },
    { label: '品目コード', value: parsed.value.itemCode || '-' },
    { label: '元の値', value: parsed.value.raw },
  ];
});

const onPatternChange = (e: CustomEvent) => {
  selectedPattern.value = e.detail.value;
  localStorage.setItem('scanParsePattern', e.detail.value);
};

const doScan = () => {
  scanning.value = true;
  scanStartedAt = Date.now();
  parsed.value = null;
  emit('scan');
};

// スキャン結果が親から渡されたら最低0.5秒待ってからセット
watch(() => props.scanValue, (val) => {
  if (val) {
    const elapsed = Date.now() - scanStartedAt;
    const delay = Math.max(500 - elapsed, 0);
    setTimeout(() => {
      localValue.value = val;
      parsed.value = null;
      scanning.value = false;
    }, delay);
  }
});

// ダイアログが閉じたらリセット（パターン選択は保持）
watch(() => props.isOpen, (val) => {
  if (!val) {
    localValue.value = '';
    parsed.value = null;
    scanning.value = false;
  }
});

const parse = () => {
  parsed.value = parseScanCode(localValue.value, selectedPattern.value);
};

const confirm = () => {
  if (parsed.value) {
    emit('confirm', parsed.value);
  }
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.pattern-desc {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
}
.pattern-example {
  font-size: 0.75rem;
  color: var(--ion-color-medium-shade);
  font-family: monospace;
}
</style>
