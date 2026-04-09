<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Label / Input</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">入力フィールドと組み合わせた ion-label の使い方。</p>
      <ion-item>
          <ion-label>Default Label</ion-label>
          <ion-input placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-label position="fixed">Fixed Label</ion-label>
          <ion-input placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-label position="floating">Floating Label</ion-label>
          <ion-input placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-label position="stacked">Stacked Label</ion-label>
          <ion-input placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-label>Toggle</ion-label>
          <ion-toggle slot="end" checked></ion-toggle>
        </ion-item>
      
        <ion-item>
          <ion-checkbox slot="start" checked></ion-checkbox>
          <ion-label>Checkbox</ion-label>
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
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item>
    <ion-label>Default Label</ion-label>
    <ion-input placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="fixed">Fixed Label</ion-label>
    <ion-input placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="floating">Floating Label</ion-label>
    <ion-input placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label position="stacked">Stacked Label</ion-label>
    <ion-input placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label>Toggle</ion-label>
    <ion-toggle slot="end" checked></ion-toggle>
  </ion-item>

  <ion-item>
    <ion-checkbox slot="start" checked></ion-checkbox>
    <ion-label>Checkbox</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCheckbox, IonInput, IonItem, IonLabel, IonToggle } from '@ionic/vue';
<\/script>`;

</script>
