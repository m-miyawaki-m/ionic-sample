<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples" />
        </ion-buttons>
        <ion-title>画面パターン集</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item router-link="/samples/screen-patterns/receiving" detail>
          <ion-icon :icon="downloadOutline" slot="start" />
          <ion-label>
            <h2>入荷検品</h2>
            <p>入荷伝票の検品登録パターン</p>
          </ion-label>
        </ion-item>
        <ion-item router-link="/samples/screen-patterns/shipping" detail>
          <ion-icon :icon="pushOutline" slot="start" />
          <ion-label>
            <h2>出庫</h2>
            <p>出庫指示の確認・登録パターン</p>
          </ion-label>
        </ion-item>
        <ion-item router-link="/samples/screen-patterns/inventory" detail>
          <ion-icon :icon="searchOutline" slot="start" />
          <ion-label>
            <h2>在庫照会（テーブル）</h2>
            <p>20項目の横スクロールテーブル</p>
          </ion-label>
        </ion-item>
        <ion-item router-link="/samples/screen-patterns/inventory-card" detail>
          <ion-icon :icon="gridOutline" slot="start" />
          <ion-label>
            <h2>在庫照会（カード）</h2>
            <p>品番単位のカード表示パターン</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonIcon,
} from '@ionic/vue';
import { downloadOutline, pushOutline, searchOutline, gridOutline } from 'ionicons/icons';
</script>
