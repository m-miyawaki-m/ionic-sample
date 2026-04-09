<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Refresher / Pull Properties</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">pullMin / pullMax / snapbackDuration などのプロパティでプル動作をカスタマイズする例。</p>
        <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
    
        <p>Pull this content down to trigger the refresh.</p>
      
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

  <ion-content class="ion-padding">
    <ion-refresher slot="fixed" :pull-factor="0.5" :pull-min="100" :pull-max="200" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <p>Pull this content down to trigger the refresh.</p>
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
<\/script>`;


  const handleRefresh = (event: RefresherCustomEvent) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  };
</script>
