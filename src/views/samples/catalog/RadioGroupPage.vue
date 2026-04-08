<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Radio Group</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-padding ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">ion-radio-group の中に ion-radio を入れる。1つだけ選択できる。v-model で選択中の値を保持する。</p>
      <ion-radio-group v-model="basicValue">
        <ion-list>
          <ion-item>
            <ion-radio value="apple">Apple</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="banana">Banana</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="cherry">Cherry</ion-radio>
          </ion-item>
        </ion-list>
      </ion-radio-group>
      <p class="ion-padding-horizontal">選択中: {{ basicValue }}</p>

      <h2 class="ion-padding">Label Placement</h2>
      <p class="ion-padding-horizontal">ion-radio に label-placement を指定するとラベル位置を変えられる。end (デフォルト) はラベル左・ラジオ右、start は逆、stacked はラベル上・ラジオ下。</p>
      <ion-radio-group :value="'end'">
        <ion-list>
          <ion-item>
            <ion-radio value="end" label-placement="end">End (default)</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="start" label-placement="start">Start</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="stacked" label-placement="stacked">Stacked</ion-radio>
          </ion-item>
        </ion-list>
      </ion-radio-group>

      <h2 class="ion-padding">Disabled</h2>
      <p class="ion-padding-horizontal">disabled で個別に無効化できる。グループ全体に :disabled を付けることも可能。</p>
      <ion-radio-group :value="'b'">
        <ion-list>
          <ion-item>
            <ion-radio value="a">Enabled A</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="b">Enabled B</ion-radio>
          </ion-item>
          <ion-item>
            <ion-radio value="c" :disabled="true">Disabled C</ion-radio>
          </ion-item>
        </ion-list>
      </ion-radio-group>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/radio-group" target="_blank" rel="noopener">ionicframework.com/docs/api/radio-group ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプルをそのまま実装 -->
      <div class="ion-padding-horizontal">
        <ion-radio-group value="strawberries">
          <ion-radio value="grapes">Grapes</ion-radio><br />
          <ion-radio value="strawberries">Strawberries</ion-radio><br />
          <ion-radio value="pineapple">Pineapple</ion-radio><br />
          <ion-radio value="cherries">Cherries</ion-radio>
        </ion-radio-group>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
  IonList, IonItem, IonRadioGroup, IonRadio,
  IonNote,
} from '@ionic/vue';

const basicValue = ref<string>('apple');
</script>
