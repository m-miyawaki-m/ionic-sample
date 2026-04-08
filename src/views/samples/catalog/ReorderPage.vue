<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Reorder</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-margin ion-padding" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic (ドラッグハンドル右端)</h2>
      <p class="ion-padding-horizontal">ion-reorder-group 内の各 ion-item に ion-reorder を置くとドラッグハンドルが表示される。ハンドルをドラッグして順番を変更し、完了後に @ionReorder で配列を更新する。</p>
      <ion-list>
        <ion-reorder-group :disabled="false" @ionReorder="handleReorderBasic">
          <ion-item v-for="item in basicItems" :key="item">
            <ion-label>{{ item }}</ion-label>
            <ion-reorder slot="end" />
          </ion-item>
        </ion-reorder-group>
      </ion-list>

      <h2 class="ion-padding">ハンドル左端</h2>
      <p class="ion-padding-horizontal">ion-reorder を slot="start" にするとハンドルが左端に来る。アイコンと組み合わせると視覚的にわかりやすい。</p>
      <ion-list>
        <ion-reorder-group :disabled="false" @ionReorder="handleReorderStart">
          <ion-item v-for="item in startItems" :key="item">
            <ion-reorder slot="start" />
            <ion-label>{{ item }}</ion-label>
          </ion-item>
        </ion-reorder-group>
      </ion-list>

      <h2 class="ion-padding">Disabled (並び替え無効)</h2>
      <p class="ion-padding-horizontal">:disabled="true" (デフォルト) にするとハンドルが非表示になり並び替えできなくなる。条件によって動的に有効/無効を切り替えられる。</p>
      <ion-button
        class="ion-margin-horizontal"
        :color="reorderEnabled ? 'warning' : 'primary'"
        @click="reorderEnabled = !reorderEnabled"
      >
        {{ reorderEnabled ? '並び替えを無効化' : '並び替えを有効化' }}
      </ion-button>
      <ion-list>
        <ion-reorder-group :disabled="!reorderEnabled" @ionReorder="handleReorderToggle">
          <ion-item v-for="item in toggleItems" :key="item">
            <ion-label>{{ item }}</ion-label>
            <ion-reorder slot="end" />
          </ion-item>
        </ion-reorder-group>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/reorder" target="_blank" rel="noopener">ionicframework.com/docs/api/reorder ↗</a>
      </p>
      <ion-list>
        <ion-reorder-group :disabled="false" @ionReorder="handleReorderOfficial">
          <ion-item v-for="item in officialItems" :key="item">
            <ion-label>{{ item }}</ion-label>
            <ion-reorder slot="end" />
          </ion-item>
        </ion-reorder-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
  IonList, IonItem, IonLabel, IonNote,
  IonReorderGroup, IonReorder,
} from '@ionic/vue';

const basicItems = ref([
  '入荷エリア A',
  '出荷エリア B',
  '保管エリア C',
  '検品エリア D',
  '返品エリア E',
]);

const startItems = ref([
  'ステップ 1: バーコードスキャン',
  'ステップ 2: 数量確認',
  'ステップ 3: 棚番登録',
  'ステップ 4: 完了報告',
]);

const toggleItems = ref([
  '優先度 高: 冷蔵品',
  '優先度 中: 精密機器',
  '優先度 低: 一般品',
]);

const reorderEnabled = ref(false);

const handleReorderBasic = (event: CustomEvent) => {
  basicItems.value = event.detail.complete(basicItems.value);
};

const handleReorderStart = (event: CustomEvent) => {
  startItems.value = event.detail.complete(startItems.value);
};

const handleReorderToggle = (event: CustomEvent) => {
  toggleItems.value = event.detail.complete(toggleItems.value);
};

const officialItems = ref(['Item 1', 'Item 2', 'Item 3']);

const handleReorderOfficial = (event: CustomEvent) => {
  officialItems.value = event.detail.complete(officialItems.value);
};
</script>
