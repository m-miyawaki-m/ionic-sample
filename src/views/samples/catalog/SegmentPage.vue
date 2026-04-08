<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Segment</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <p>ion-segment はタブ風の選択UI。子要素に ion-segment-button を並べる。1つだけ選べる。v-model で選択値を保持。</p>
      <ion-segment v-model="basicValue">
        <ion-segment-button value="all">
          <ion-label>All</ion-label>
        </ion-segment-button>
        <ion-segment-button value="active">
          <ion-label>Active</ion-label>
        </ion-segment-button>
        <ion-segment-button value="done">
          <ion-label>Done</ion-label>
        </ion-segment-button>
      </ion-segment>
      <p>選択中: {{ basicValue }}</p>

      <h2>Colors</h2>
      <p>color 属性で選択中の色を変える。</p>
      <ion-segment :value="'a'" color="success">
        <ion-segment-button value="a"><ion-label>A</ion-label></ion-segment-button>
        <ion-segment-button value="b"><ion-label>B</ion-label></ion-segment-button>
      </ion-segment>
      <ion-segment :value="'a'" color="danger">
        <ion-segment-button value="a"><ion-label>A</ion-label></ion-segment-button>
        <ion-segment-button value="b"><ion-label>B</ion-label></ion-segment-button>
      </ion-segment>

      <h2>Scrollable</h2>
      <p>:scrollable="true" でボタンが画面幅を超えても横スクロールできる。タブが多いときに使う。</p>
      <ion-segment :scrollable="true" :value="'1'">
        <ion-segment-button value="1"><ion-label>Tab 1</ion-label></ion-segment-button>
        <ion-segment-button value="2"><ion-label>Tab 2</ion-label></ion-segment-button>
        <ion-segment-button value="3"><ion-label>Tab 3</ion-label></ion-segment-button>
        <ion-segment-button value="4"><ion-label>Tab 4</ion-label></ion-segment-button>
        <ion-segment-button value="5"><ion-label>Tab 5</ion-label></ion-segment-button>
        <ion-segment-button value="6"><ion-label>Tab 6</ion-label></ion-segment-button>
      </ion-segment>

      <h2>Disabled</h2>
      <p>:disabled="true" でセグメント全体を無効化できる。</p>
      <ion-segment :disabled="true" :value="'a'">
        <ion-segment-button value="a"><ion-label>A</ion-label></ion-segment-button>
        <ion-segment-button value="b"><ion-label>B</ion-label></ion-segment-button>
      </ion-segment>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonLabel,
  IonSegment, IonSegmentButton,
} from '@ionic/vue';

const basicValue = ref<string>('all');
</script>
