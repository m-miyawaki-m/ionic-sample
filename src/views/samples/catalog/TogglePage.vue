<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Toggle</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-padding ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">ion-toggle は ON/OFF のスイッチ。v-model で boolean を持つ。設定画面でよく使う。</p>
      <ion-list>
        <ion-item>
          <ion-toggle v-model="enabled">{{ enabled ? 'ON' : 'OFF' }}</ion-toggle>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Colors</h2>
      <p class="ion-padding-horizontal">color 属性で ON 時の色を変える。</p>
      <ion-list>
        <ion-item>
          <ion-toggle color="primary" :checked="true">Primary</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle color="success" :checked="true">Success</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle color="warning" :checked="true">Warning</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle color="danger" :checked="true">Danger</ion-toggle>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Label Placement</h2>
      <p class="ion-padding-horizontal">label-placement でスイッチとラベルの位置関係を変える。</p>
      <ion-list>
        <ion-item>
          <ion-toggle label-placement="end">End (default)</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle label-placement="start">Start</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle label-placement="stacked">Stacked</ion-toggle>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Disabled</h2>
      <p class="ion-padding-horizontal">disabled で操作不可にできる。</p>
      <ion-list>
        <ion-item>
          <ion-toggle :disabled="true">Disabled (off)</ion-toggle>
        </ion-item>
        <ion-item>
          <ion-toggle :disabled="true" :checked="true">Disabled (on)</ion-toggle>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/toggle" target="_blank" rel="noopener">ionicframework.com/docs/api/toggle ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプルをそのまま実装 -->
      <div class="ion-padding-horizontal">
        <ion-toggle>Default Toggle</ion-toggle><br /><br />
        <ion-toggle :checked="true">Checked Toggle</ion-toggle><br /><br />
        <ion-toggle :disabled="true">Disabled Toggle</ion-toggle><br /><br />
        <ion-toggle :checked="true" :disabled="true">Disabled Checked Toggle</ion-toggle>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonToggle,
  IonNote,
} from '@ionic/vue';

const enabled = ref(false);
</script>
