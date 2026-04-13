<template>
  <PageLayout title="詳細・編集" back-href="/shipping-record">
    <template v-if="item">
      <!-- 読み取り専用フィールド -->
      <ion-list-header>
        <ion-label>スキャン情報</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item>
          <ion-label>
            <p>品番</p>
            <h2>{{ item.itemCode }}</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>数量</p>
            <h2>{{ item.quantity }}</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>ロット</p>
            <h2>{{ item.lotNumber }}</h2>
          </ion-label>
        </ion-item>
        <ion-item>
          <ion-label>
            <p>スキャン時刻</p>
            <h2>{{ item.scannedAt }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <!-- 編集可能フィールド -->
      <ion-list-header class="ion-margin-top">
        <ion-label>手入力項目</ion-label>
      </ion-list-header>
      <ion-list>
        <ion-item>
          <ion-input
            v-model="editForm.storageLoc"
            label="保管場所"
            label-placement="stacked"
            placeholder="例: WH01-A01"
          />
        </ion-item>
        <ion-item>
          <ion-input
            v-model="editForm.remarks"
            label="備考"
            label-placement="stacked"
            placeholder="備考を入力"
          />
        </ion-item>
      </ion-list>

      <!-- 保存ボタン -->
      <div class="ion-padding">
        <ion-button expand="block" @click="save">保存</ion-button>
      </div>
    </template>

    <template v-else>
      <ion-text color="medium" class="ion-padding ion-text-center" style="display:block;">
        アイテムが見つかりません
      </ion-text>
    </template>

    <FeedbackToast :message="toastMessage" :color="toastColor" @dismiss="toastMessage = ''" />
  </PageLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import {
  IonList, IonListHeader, IonItem, IonLabel, IonInput,
  IonButton, IonText,
} from '@ionic/vue';
import { useRouter, useRoute } from 'vue-router';
import PageLayout from '@/components/PageLayout.vue';
import FeedbackToast from '@/components/FeedbackToast.vue';
import { useShippingRecordStore } from '@/composables/useShippingRecordStore';

const router = useRouter();
const route = useRoute();
const { getItemById, updateItem } = useShippingRecordStore();

const itemId = Number(route.params.id);
const item = getItemById(itemId);

const editForm = reactive({
  storageLoc: item?.storageLoc ?? '',
  remarks: item?.remarks ?? '',
});

const toastMessage = ref('');
const toastColor = ref('success');

const save = () => {
  updateItem(itemId, {
    storageLoc: editForm.storageLoc,
    remarks: editForm.remarks,
  });
  toastMessage.value = '保存しました';
  toastColor.value = 'success';
  setTimeout(() => {
    router.back();
  }, 500);
};
</script>
