<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Backdrop / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">バックドロップ（ion-backdrop）の基本的な使い方。オーバーレイ背景の表示を確認できる。</p>
      <ion-backdrop :visible="true"></ion-backdrop>
        <div class="ion-page">
          <ion-header>
            <ion-toolbar>
              <ion-title>Backdrop</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <ion-item>
              <ion-checkbox>Checkbox</ion-checkbox>
            </ion-item>
            <ion-button expand="block">Button</ion-button>
          </ion-content>
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
  IonBackdrop,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<style>
  ion-backdrop {
    background: var(--ion-color-dark);
    opacity: 0.3;
  }
</style>

<template>
  <ion-backdrop :visible="true"></ion-backdrop>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Backdrop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-checkbox>Checkbox</ion-checkbox>
      </ion-item>
      <ion-button expand="block">Button</ion-button>
    </ion-content>
  </div>
</template>
<script setup lang="ts">
// @ts-nocheck
  import {
    IonBackdrop,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonCheckbox,
    IonButton,
  } from '@ionic/vue';
<\/script>`;

</script>

<style>
  ion-backdrop {
    background: var(--ion-color-dark);
    opacity: 0.3;
  }
</style>
