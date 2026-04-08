<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Checkbox</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-padding ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">ion-checkbox は単独で使える。v-model で boolean を持つ。複数選択したいときに使う。</p>
      <ion-list>
        <ion-item>
          <ion-checkbox v-model="checked">{{ checked ? 'チェック済み' : '未チェック' }}</ion-checkbox>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Colors</h2>
      <p class="ion-padding-horizontal">color 属性でチェック時の色を変える。</p>
      <ion-list>
        <ion-item>
          <ion-checkbox color="primary" :checked="true">Primary</ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox color="success" :checked="true">Success</ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox color="danger" :checked="true">Danger</ion-checkbox>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Label Placement</h2>
      <p class="ion-padding-horizontal">label-placement でチェックボックスとラベルの位置関係を変える。</p>
      <ion-list>
        <ion-item>
          <ion-checkbox label-placement="end">End (default)</ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox label-placement="start">Start</ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox label-placement="stacked">Stacked</ion-checkbox>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Disabled</h2>
      <p class="ion-padding-horizontal">disabled で操作不可にできる。</p>
      <ion-list>
        <ion-item>
          <ion-checkbox :disabled="true">Disabled</ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-checkbox :disabled="true" :checked="true">Disabled (checked)</ion-checkbox>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/checkbox" target="_blank" rel="noopener">ionicframework.com/docs/api/checkbox ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプルをそのまま実装 -->
      <ion-list>
        <ion-item>
          <ion-checkbox>I agree to the terms and conditions</ion-checkbox>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonCheckbox,
  IonNote,
} from '@ionic/vue';

const checked = ref(false);
</script>
