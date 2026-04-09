<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Spinner / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">スピナー（ion-spinner）の基本的な使い方。各種ローディングアニメーションを確認できる。</p>
      <ion-item>
          <ion-label>Default</ion-label>
          <ion-spinner></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Dots</ion-label>
          <ion-spinner name="dots"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Lines</ion-label>
          <ion-spinner name="lines"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Lines Small</ion-label>
          <ion-spinner name="lines-small"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Lines Sharp</ion-label>
          <ion-spinner name="lines-sharp"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Lines Sharp Small</ion-label>
          <ion-spinner name="lines-sharp-small"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Bubbles</ion-label>
          <ion-spinner name="bubbles"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Circles</ion-label>
          <ion-spinner name="circles"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Circular</ion-label>
          <ion-spinner name="circular"></ion-spinner>
        </ion-item>
      
        <ion-item>
          <ion-label>Crescent</ion-label>
          <ion-spinner name="crescent"></ion-spinner>
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
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item>
    <ion-label>Default</ion-label>
    <ion-spinner></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Dots</ion-label>
    <ion-spinner name="dots"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Lines</ion-label>
    <ion-spinner name="lines"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Lines Small</ion-label>
    <ion-spinner name="lines-small"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Lines Sharp</ion-label>
    <ion-spinner name="lines-sharp"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Lines Sharp Small</ion-label>
    <ion-spinner name="lines-sharp-small"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Bubbles</ion-label>
    <ion-spinner name="bubbles"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Circles</ion-label>
    <ion-spinner name="circles"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Circular</ion-label>
    <ion-spinner name="circular"></ion-spinner>
  </ion-item>

  <ion-item>
    <ion-label>Crescent</ion-label>
    <ion-spinner name="crescent"></ion-spinner>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel, IonSpinner } from '@ionic/vue';
<\/script>`;

</script>
