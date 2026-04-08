<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Select</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-note color="medium" class="ion-padding ion-margin-bottom" style="display: block;">
        📝 以下のサンプルは自作。末尾の「公式サンプル」セクションに公式ドキュメントのコード例あり。
      </ion-note>

      <h2 class="ion-padding">Basic</h2>
      <p class="ion-padding-horizontal">ion-select はドロップダウン選択。子要素に ion-select-option を並べる。タップするとデフォルトでは Alert が開く。</p>
      <ion-list>
        <ion-item>
          <ion-select label="果物" v-model="fruit" placeholder="選択してください">
            <ion-select-option value="apple">Apple</ion-select-option>
            <ion-select-option value="banana">Banana</ion-select-option>
            <ion-select-option value="cherry">Cherry</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <p class="ion-padding-horizontal">選択中: {{ fruit || '(未選択)' }}</p>

      <h2 class="ion-padding">Interface</h2>
      <p class="ion-padding-horizontal">interface 属性で選択UIを切替。alert (デフォルト) / popover / action-sheet が選べる。</p>
      <ion-list>
        <ion-item>
          <ion-select label="Alert" interface="alert">
            <ion-select-option value="1">Option 1</ion-select-option>
            <ion-select-option value="2">Option 2</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-select label="Popover" interface="popover">
            <ion-select-option value="1">Option 1</ion-select-option>
            <ion-select-option value="2">Option 2</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-select label="Action Sheet" interface="action-sheet">
            <ion-select-option value="1">Option 1</ion-select-option>
            <ion-select-option value="2">Option 2</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <h2 class="ion-padding">Multiple</h2>
      <p class="ion-padding-horizontal">:multiple="true" で複数選択モードになる。値は配列。</p>
      <ion-list>
        <ion-item>
          <ion-select label="複数選択" :multiple="true" v-model="multipleValues">
            <ion-select-option value="red">Red</ion-select-option>
            <ion-select-option value="green">Green</ion-select-option>
            <ion-select-option value="blue">Blue</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <p class="ion-padding-horizontal">選択中: {{ multipleValues.join(', ') || '(未選択)' }}</p>

      <h2 class="ion-padding">公式サンプル (Ionic Docs)</h2>
      <p class="ion-padding-horizontal">
        公式: <a href="https://ionicframework.com/docs/api/select" target="_blank" rel="noopener">ionicframework.com/docs/api/select ↗</a>
      </p>
      <!-- 公式ドキュメントの基本サンプルをそのまま実装 -->
      <ion-list>
        <ion-item>
          <ion-select aria-label="fruit" placeholder="Select fruit">
            <ion-select-option value="apples">Apples</ion-select-option>
            <ion-select-option value="oranges">Oranges</ion-select-option>
            <ion-select-option value="bananas">Bananas</ion-select-option>
          </ion-select>
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
  IonList, IonItem, IonSelect, IonSelectOption,
  IonNote,
} from '@ionic/vue';

const fruit = ref<string>('');
const multipleValues = ref<string[]>([]);
</script>
