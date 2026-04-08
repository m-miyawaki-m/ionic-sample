<template>
  <CatalogMenu content-id="menu-about-content" />
  <ion-page id="menu-about-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="catalog-side-menu" />
          <ion-back-button default-href="/samples/catalog/menu" />
        </ion-buttons>
        <ion-title>Menu - About</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>About</h2>
      <p>これはサイドメニューから遷移した About ページ。</p>
      <p>各ページは独立した <code>ion-page</code> を持ち、メニューはそれぞれ固有の <code>content-id</code> で紐付けられる。</p>
      <p>メニューの <code>router-direction="root"</code> により、遷移時にスタックが積み重ならず切替になる。</p>
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
