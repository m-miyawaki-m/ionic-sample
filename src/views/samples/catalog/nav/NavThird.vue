<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button text="Second へ戻る" />
        </ion-buttons>
        <ion-title>Nav — Third</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Third ページ (スタック深さ 3)</h2>
      <p>
        Root → Second → Third とスタックが積み重なっている。
        <code>ion-back-button</code> は自動でスタックを検出し、ひとつ前のページへ戻るボタンを表示する。
      </p>

      <h2>popToRoot でルートへ一気に戻る</h2>
      <p><code>nav.popToRoot()</code> でスタックを空にし、Root ページに一気に戻ることができる。</p>
      <ion-button expand="block" color="danger" @click="goToRoot">
        popToRoot() でルートへ戻る
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
} from '@ionic/vue';
import { inject } from 'vue';

const nav = inject<any>('navRef');

const goToRoot = async () => {
  if (nav?.value) {
    await nav.value.$el.popToRoot();
  }
};
</script>
