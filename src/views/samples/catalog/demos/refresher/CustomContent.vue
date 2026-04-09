<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Refresher / Custom Content</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-refresher-content をカスタマイズしてローディング中の表示を変更する例。</p>
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
          <ion-refresher-content
            :pulling-icon="chevronDownCircleOutline"
            pulling-text="Pull to refresh"
            refreshing-spinner="circles"
            refreshing-text="Refreshing..."
          >
          </ion-refresher-content>
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
  import { chevronDownCircleOutline } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Pull to Refresh</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content
        :pulling-icon="chevronDownCircleOutline"
        pulling-text="Pull to refresh"
        refreshing-spinner="circles"
        refreshing-text="Refreshing..."
      >
      </ion-refresher-content>
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
  import { chevronDownCircleOutline } from 'ionicons/icons';

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
