<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Item Sliding</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="ion-padding">Basic (左スワイプで削除)</h2>
      <p class="ion-padding-horizontal">各アイテムを左にスワイプするとアクションボタンが現れる。ion-item-options の side="end" (デフォルト) が右側のオプション領域。</p>
      <ion-list>
        <ion-item-sliding v-for="item in basicItems" :key="item.id">
          <ion-item>
            <ion-label>
              <h2>{{ item.name }}</h2>
              <p>{{ item.detail }}</p>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger" @click="removeBasic(item.id)">
              <ion-icon slot="icon-only" :icon="trashOutline" />
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <h2 class="ion-padding">複数オプション</h2>
      <p class="ion-padding-horizontal">ion-item-options 内に複数の ion-item-option を並べると複数のアクションを提供できる。アイコン+テキストで役割を明示。</p>
      <ion-list>
        <ion-item-sliding v-for="item in multiItems" :key="item.id">
          <ion-item>
            <ion-label>{{ item.name }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="primary">
              <ion-icon slot="start" :icon="mailOutline" />
              通知
            </ion-item-option>
            <ion-item-option color="warning">
              <ion-icon slot="start" :icon="starOutline" />
              お気に入り
            </ion-item-option>
            <ion-item-option color="danger">
              <ion-icon slot="start" :icon="trashOutline" />
              削除
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <h2 class="ion-padding">アイコンのみオプション</h2>
      <p class="ion-padding-horizontal">slot="icon-only" を使うとテキストなしのアイコンだけのボタンになる。スペースが限られているときに有効。</p>
      <ion-list>
        <ion-item-sliding v-for="item in iconItems" :key="item.id">
          <ion-item>
            <ion-label>{{ item.name }}</ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="success">
              <ion-icon slot="icon-only" :icon="archiveOutline" />
            </ion-item-option>
            <ion-item-option color="danger">
              <ion-icon slot="icon-only" :icon="trashOutline" />
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>

      <h2 class="ion-padding">両サイドオプション</h2>
      <p class="ion-padding-horizontal">side="start" と side="end" を両方置くと、右スワイプと左スワイプでそれぞれ異なるアクションを提供できる。</p>
      <ion-list>
        <ion-item-sliding v-for="item in bothItems" :key="item.id">
          <ion-item-options side="start">
            <ion-item-option color="success">
              <ion-icon slot="icon-only" :icon="archiveOutline" />
            </ion-item-option>
          </ion-item-options>
          <ion-item>
            <ion-label>
              <h2>{{ item.name }}</h2>
              <p>← アーカイブ / 削除 →</p>
            </ion-label>
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option color="danger">
              <ion-icon slot="icon-only" :icon="trashOutline" />
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon,
  IonItemSliding, IonItemOptions, IonItemOption,
} from '@ionic/vue';
import { trashOutline, archiveOutline, mailOutline, starOutline } from 'ionicons/icons';

const basicItems = ref([
  { id: 1, name: '入荷作業 #001', detail: '2025-06-15 — 東京倉庫' },
  { id: 2, name: '入荷作業 #002', detail: '2025-06-16 — 大阪倉庫' },
  { id: 3, name: '入荷作業 #003', detail: '2025-06-17 — 名古屋倉庫' },
]);

const removeBasic = (id: number) => {
  basicItems.value = basicItems.value.filter(i => i.id !== id);
};

const multiItems = ref([
  { id: 1, name: '出荷依頼 #101' },
  { id: 2, name: '出荷依頼 #102' },
  { id: 3, name: '出荷依頼 #103' },
]);

const iconItems = ref([
  { id: 1, name: '在庫レポート 6月' },
  { id: 2, name: '在庫レポート 7月' },
  { id: 3, name: '在庫レポート 8月' },
]);

const bothItems = ref([
  { id: 1, name: '棚卸しタスク A' },
  { id: 2, name: '棚卸しタスク B' },
  { id: 3, name: '棚卸しタスク C' },
]);
</script>
