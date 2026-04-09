<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Refresher / Custom Scroll Target</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-content :scroll-y="false">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">スクロールターゲットを指定して独自スクロールコンテナでリフレッシャーを使う例。</p>
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
    
        <div class="ion-content-scroll-host ion-padding">
          <p>Pull this content down to trigger the refresh.</p>
        </div>
      
    <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
      <details>
        <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
        <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
      </details>
    </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Pull to Refresh</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content :scroll-y="false">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <div class="ion-content-scroll-host ion-padding">
      <p>Pull this content down to trigger the refresh.</p>
    </div>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonContent,
    IonHeader,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    RefresherCustomEvent,
  } from '@ionic/vue';

  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
<\/script>

<style scoped>
  .ion-content-scroll-host {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .ion-content-scroll-host::before,
  .ion-content-scroll-host::after {
    position: absolute;

    width: 1px;
    height: 1px;

    content: '';
  }

  .ion-content-scroll-host::before {
    bottom: -1px;
  }

  .ion-content-scroll-host::after {
    top: -1px;
  }
</style>`;


  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
</script>

<style scoped>
  .ion-content-scroll-host {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow-y: auto;
  }

  .ion-content-scroll-host::before,
  .ion-content-scroll-host::after {
    position: absolute;

    width: 1px;
    height: 1px;

    content: '';
  }

  .ion-content-scroll-host::before {
    bottom: -1px;
  }

  .ion-content-scroll-host::after {
    top: -1px;
  }
</style>
