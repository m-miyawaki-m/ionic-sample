<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Lines</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">lines プロパティで区切り線のスタイル（full / inset / none）を変更する例。</p>
      <ion-item>
          <ion-label> Default Item Lines </ion-label>
        </ion-item>
      
        <ion-item lines="inset">
          <ion-label>Item Lines Inset</ion-label>
        </ion-item>
      
        <ion-item lines="full">
          <ion-label>Item Lines Full</ion-label>
        </ion-item>
      
        <ion-item lines="none">
          <ion-label>Item Lines None</ion-label>
        </ion-item>
      
        <ion-item>
          <ion-icon :icon="star" slot="start"></ion-icon>
          <ion-label>Default Item Lines</ion-label>
          <ion-icon :icon="informationCircle" slot="end"></ion-icon>
        </ion-item>
      
        <ion-item lines="inset">
          <ion-icon :icon="star" slot="start"></ion-icon>
          <ion-label>Item Lines Inset</ion-label>
          <ion-icon :icon="informationCircle" slot="end"></ion-icon>
        </ion-item>
      
        <ion-item lines="full">
          <ion-icon :icon="star" slot="start"></ion-icon>
          <ion-label>Item Lines Full</ion-label>
          <ion-icon :icon="informationCircle" slot="end"></ion-icon>
        </ion-item>
      
        <ion-item lines="none">
          <ion-icon :icon="star" slot="start"></ion-icon>
          <ion-label>Item Lines None</ion-label>
          <ion-icon :icon="informationCircle" slot="end"></ion-icon>
        </ion-item>
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
  IonIcon,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { informationCircle, star } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-item>
    <ion-label> Default Item Lines </ion-label>
  </ion-item>

  <ion-item lines="inset">
    <ion-label>Item Lines Inset</ion-label>
  </ion-item>

  <ion-item lines="full">
    <ion-label>Item Lines Full</ion-label>
  </ion-item>

  <ion-item lines="none">
    <ion-label>Item Lines None</ion-label>
  </ion-item>

  <ion-item>
    <ion-icon :icon="star" slot="start"></ion-icon>
    <ion-label>Default Item Lines</ion-label>
    <ion-icon :icon="informationCircle" slot="end"></ion-icon>
  </ion-item>

  <ion-item lines="inset">
    <ion-icon :icon="star" slot="start"></ion-icon>
    <ion-label>Item Lines Inset</ion-label>
    <ion-icon :icon="informationCircle" slot="end"></ion-icon>
  </ion-item>

  <ion-item lines="full">
    <ion-icon :icon="star" slot="start"></ion-icon>
    <ion-label>Item Lines Full</ion-label>
    <ion-icon :icon="informationCircle" slot="end"></ion-icon>
  </ion-item>

  <ion-item lines="none">
    <ion-icon :icon="star" slot="start"></ion-icon>
    <ion-label>Item Lines None</ion-label>
    <ion-icon :icon="informationCircle" slot="end"></ion-icon>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonIcon, IonItem, IonLabel } from '@ionic/vue';
  import { informationCircle, star } from 'ionicons/icons';
<\/script>`;

</script>
