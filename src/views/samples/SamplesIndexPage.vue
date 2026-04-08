<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home" />
        </ion-buttons>
        <ion-title>サンプル</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item router-link="/samples/catalog" detail>
          <ion-label>
            <h2>コンポーネントカタログ</h2>
            <p>Ionic公式コンポーネントの動作サンプル</p>
          </ion-label>
        </ion-item>
        <ion-item router-link="/samples/mockups" detail>
          <ion-label>
            <h2>画面モック</h2>
            <p>業務画面のレイアウト・操作感の検討用</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
} from '@ionic/vue';
</script>
