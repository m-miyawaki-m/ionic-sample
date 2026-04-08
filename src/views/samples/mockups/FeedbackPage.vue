<template>
  <PageLayout
    title="スキャンフィードバック"
    :menu-items="[]"
  >
    <p class="ion-padding-horizontal">
      スキャン読み取り時のフィードバック4パターンを比較できます。
      「スキャン実行」ボタンでモックスキャンを発火します。
    </p>

    <!-- 現在の設定 -->
    <ion-card class="ion-margin-top">
      <ion-card-header>
        <ion-card-subtitle>現在の設定</ion-card-subtitle>
        <ion-card-title>{{ feedbackLabels[feedbackType] }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list lines="none">
          <ion-radio-group :value="feedbackType" @ion-change="onFeedbackChange">
            <ion-item v-for="option in feedbackOptions" :key="option.value">
              <ion-radio :value="option.value" slot="start" />
              <ion-label>
                <h3>{{ option.label }}</h3>
                <p>{{ option.description }}</p>
              </ion-label>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </ion-card-content>
    </ion-card>

    <!-- テスト実行 -->
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>テスト</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ScanInput
          v-model="demoValue"
          label="スキャン対象"
          placeholder="ここにスキャン結果が入ります"
          @scan="doMockScan"
        />
        <div class="ion-margin-top" style="display:flex;gap:8px;">
          <ion-button expand="block" @click="doMockScan" style="flex:1;">
            スキャン実行
          </ion-button>
          <ion-button expand="block" color="success" @click="doSuccessVibrate" style="flex:1;">
            成功バイブ
          </ion-button>
          <ion-button expand="block" color="danger" @click="doErrorVibrate" style="flex:1;">
            エラーバイブ
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>

    <!-- 各パターン個別テスト -->
    <ion-card>
      <ion-card-header>
        <ion-card-subtitle>個別パターンテスト</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-button expand="block" fill="outline" @click="testPattern('none')">
          A) フィードバックなし
        </ion-button>
        <ion-button expand="block" fill="outline" class="ion-margin-top" @click="testPattern('vibrate')">
          B) バイブレーションのみ
        </ion-button>
        <ion-button expand="block" fill="outline" class="ion-margin-top" @click="testPattern('toast')">
          C) トーストのみ
        </ion-button>
        <ion-button expand="block" fill="outline" class="ion-margin-top" @click="testPattern('vibrate+toast')">
          D) バイブ + トースト
        </ion-button>
      </ion-card-content>
    </ion-card>

    <!-- スキャンフィードバック用トースト -->
    <ion-toast
      :is-open="toastVisible"
      :message="toastMessage"
      color="tertiary"
      position="bottom"
      :duration="1500"
      @did-dismiss="toastVisible = false"
    />

    <!-- 個別テスト用トースト -->
    <ion-toast
      :is-open="testToastVisible"
      :message="testToastMessage"
      color="tertiary"
      position="bottom"
      :duration="1500"
      @did-dismiss="testToastVisible = false"
    />
  </PageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonList, IonItem, IonLabel,
  IonRadioGroup, IonRadio, IonButton, IonToast,
} from '@ionic/vue';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import PageLayout from '@/components/PageLayout.vue';
import ScanInput from '@/components/ScanInput.vue';
import { useScanFeedback, type FeedbackType } from '@/composables/useScanFeedback';

const {
  feedbackType, setFeedbackType, triggerFeedback,
  triggerSuccess, triggerError,
  toastMessage, toastVisible,
} = useScanFeedback();

const demoValue = ref('');
const testToastVisible = ref(false);
const testToastMessage = ref('');

const feedbackLabels: Record<FeedbackType, string> = {
  'none': 'A) フィードバックなし',
  'vibrate': 'B) バイブレーションのみ',
  'toast': 'C) トーストのみ',
  'vibrate+toast': 'D) バイブ + トースト',
};

const feedbackOptions = [
  { value: 'none', label: 'A) なし', description: 'フィードバックを出さない' },
  { value: 'vibrate', label: 'B) バイブレーションのみ', description: '端末が短く振動する（画面表示なし）' },
  { value: 'toast', label: 'C) トーストのみ', description: '画面下部に読み取り値を一瞬表示' },
  { value: 'vibrate+toast', label: 'D) バイブ + トースト', description: '振動 + 画面下部に表示（推奨）' },
];

const onFeedbackChange = (event: CustomEvent) => {
  setFeedbackType(event.detail.value as FeedbackType);
};

const doMockScan = async () => {
  const mockResult = {
    value: 'ITEM-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    format: 'CODE128',
  };
  demoValue.value = mockResult.value;
  await triggerFeedback(mockResult);
};

const doSuccessVibrate = async () => {
  await triggerSuccess();
};

const doErrorVibrate = async () => {
  await triggerError();
};

const testPattern = async (type: FeedbackType) => {
  const mockResult = {
    value: 'TEST-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    format: 'QR_CODE',
  };

  // 一時的に指定パターンで実行
  if (type === 'vibrate' || type === 'vibrate+toast') {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch {
      console.log('[FeedbackTest] Haptics not available');
    }
  }

  if (type === 'toast' || type === 'vibrate+toast') {
    testToastMessage.value = `読み取り: ${mockResult.value}`;
    testToastVisible.value = true;
  }

  if (type === 'none') {
    demoValue.value = mockResult.value;
  }
};
</script>
