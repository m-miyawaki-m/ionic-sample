<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Modal / Sheet Auto Height</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">シートモーダルで高さを自動調整する例。コンテンツの量に応じて変化する。</p>
        <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>
    
        <ion-modal trigger="open-modal" :initial-breakpoint="1" :breakpoints="[0, 1]">
          <div class="block">Block of Content</div>
        </ion-modal>
      
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<style>
  .block {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ion-modal {
    --height: auto;
  }
</style>

<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>App</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>

    <ion-modal trigger="open-modal" :initial-breakpoint="1" :breakpoints="[0, 1]">
      <div class="block">Block of Content</div>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/vue';
<\/script>`;

</script>

<style>
  .block {
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ion-modal {
    --height: auto;
  }
</style>
