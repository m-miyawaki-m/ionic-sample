<template>
  <CatalogMenu content-id="menu-home-content" />
  <ion-page id="menu-home-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="catalog-side-menu" />
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Menu - Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>Menu Home</h2>
      <p>左上のハンバーガーボタンでサイドメニューが開く。メニュー項目で他のサブページに遷移。</p>
      <p><code>ion-menu</code> は <code>content-id</code> で対象ページと紐付ける。<code>ion-menu-button</code> は対応するメニューを自動で開く。</p>
      <p>このデモでは再利用可能な <code>CatalogMenu.vue</code> コンポーネントを各サブページにインポートしている。</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonMenuButton,
} from '@ionic/vue';
import CatalogMenu from './CatalogMenu.vue';
</script>
