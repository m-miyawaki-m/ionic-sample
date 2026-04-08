<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Range</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-note color="medium" class="ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2>Basic</h2>
      <p>シンプルなスライダー。デフォルトは 0〜100 で連続値を選択できる。</p>
      <ion-range v-model="basicValue" />
      <p>値: {{ basicValue }}</p>

      <h2>With Label</h2>
      <p>label プロパティでスライダーにラベルを付ける。label-placement で左・上・右などに配置できる。</p>
      <ion-range label="音量" v-model="labelValue" />
      <p>音量: {{ labelValue }}</p>

      <h2>Min / Max / Step</h2>
      <p>min・max で範囲を、step でスライダーの刻みを設定する。例: 温度 10〜40 °C を 0.5 刻みで選択。</p>
      <ion-range :min="10" :max="40" :step="0.5" v-model="stepValue" />
      <p>温度: {{ stepValue }} °C</p>

      <h2>Snaps (目盛り表示)</h2>
      <p>:snaps="true" で step 位置に目盛りが表示されスナップする。:ticks="true" で目盛り線も表示される。</p>
      <ion-range :min="0" :max="5" :step="1" :snaps="true" :ticks="true" v-model="snapsValue" />
      <p>評価: {{ snapsValue }}</p>

      <h2>Pin (値バブル)</h2>
      <p>:pin="true" でドラッグ中に現在値を示すバブルが表示される。数値が見えるので直感的に操作できる。</p>
      <ion-range :pin="true" :min="0" :max="100" :step="5" v-model="pinValue" />
      <p>値: {{ pinValue }}</p>

      <h2>Dual Knobs (範囲選択)</h2>
      <p>:dual-knobs="true" で上限・下限の両端を指定する範囲選択スライダーになる。値は { lower, upper } オブジェクト。</p>
      <ion-range :dual-knobs="true" :min="0" :max="100" v-model="dualValue" />
      <p>下限: {{ dualValue.lower }} / 上限: {{ dualValue.upper }}</p>

      <h2>Color</h2>
      <p>color プロパティでスライダーの色を変更できる。</p>
      <ion-range color="success" :value="70" />
      <ion-range color="warning" :value="50" />
      <ion-range color="danger" :value="30" />

      <h2>公式サンプル (Ionic Docs)</h2>
      <p>
        公式: <a href="https://ionicframework.com/docs/api/range" target="_blank" rel="noopener">ionicframework.com/docs/api/range ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプル -->
      <ion-range
        aria-label="Volume"
        :min="0"
        :max="100"
        :pin="true"
        v-model="officialRangeValue"
      >
        <ion-icon slot="start" name="volume-low-outline" />
        <ion-icon slot="end" name="volume-high-outline" />
      </ion-range>
      <p>値: {{ officialRangeValue }}</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonRange, IonNote, IonIcon,
} from '@ionic/vue';

const basicValue = ref(50);
const labelValue = ref(60);
const stepValue = ref(25);
const snapsValue = ref(3);
const pinValue = ref(40);
const dualValue = ref({ lower: 20, upper: 80 });
const officialRangeValue = ref(50);
</script>
