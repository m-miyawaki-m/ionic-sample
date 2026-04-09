<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Badge / Inside Tab Bar</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">タブバーのタブボタン内にバッジを表示する例。未読件数などの通知表示に利用できる。</p>
      <ion-tab-bar color="light">
          <ion-tab-button tab="1">
            <ion-icon :icon="heart" />
            <ion-label>Favorites</ion-label>
            <ion-badge color="danger"></ion-badge>
          </ion-tab-button>
      
          <ion-tab-button tab="2">
            <ion-icon :icon="musicalNote" />
            <ion-label>Music</ion-label>
          </ion-tab-button>
      
          <ion-tab-button tab="3">
            <ion-icon :icon="calendar" />
            <ion-label>Calendar</ion-label>
            <ion-badge color="danger">47</ion-badge>
          </ion-tab-button>
        </ion-tab-bar>
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
  IonBadge,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { heart, calendar, musicalNote } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-tab-bar color="light">
    <ion-tab-button tab="1">
      <ion-icon :icon="heart" />
      <ion-label>Favorites</ion-label>
      <ion-badge color="danger"></ion-badge>
    </ion-tab-button>

    <ion-tab-button tab="2">
      <ion-icon :icon="musicalNote" />
      <ion-label>Music</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="3">
      <ion-icon :icon="calendar" />
      <ion-label>Calendar</ion-label>
      <ion-badge color="danger">47</ion-badge>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBadge, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/vue';
  import { heart, calendar, musicalNote } from 'ionicons/icons';
<\/script>`;

</script>
