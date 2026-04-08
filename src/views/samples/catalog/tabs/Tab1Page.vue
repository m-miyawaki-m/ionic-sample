<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Tabs - Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Home Tab</h2>
      <p>これはタブの最初のページ。下のタブバーで他のタブに切り替え可能。</p>
      <p>タブはネストされたルーティングで実現する。親 (/samples/catalog/tabs) に &lt;ion-tabs&gt; を置き、子ルートを宣言する。</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton,
} from '@ionic/vue';
</script>
