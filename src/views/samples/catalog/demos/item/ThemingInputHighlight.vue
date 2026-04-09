<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Theming Input Highlight</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">入力フィールドにフォーカスしたときのハイライト色をカスタマイズする例。</p>
      <ion-item lines="full" class="item-has-focus ion-touched">
          <ion-label position="stacked">Custom Input Highlight: Focused</ion-label>
          <ion-input></ion-input>
        </ion-item>
      
        <ion-item lines="full" class="item-has-focus ion-touched ion-valid">
          <ion-label position="stacked">Custom Input Highlight: Focused & Valid</ion-label>
          <ion-input></ion-input>
        </ion-item>
      
        <ion-item lines="full" class="item-has-focus ion-touched ion-invalid">
          <ion-label position="stacked">Custom Input Highlight: Focused & Invalid</ion-label>
          <ion-input></ion-input>
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
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item lines="full" class="item-has-focus ion-touched">
    <ion-label position="stacked">Custom Input Highlight: Focused</ion-label>
    <ion-input></ion-input>
  </ion-item>

  <ion-item lines="full" class="item-has-focus ion-touched ion-valid">
    <ion-label position="stacked">Custom Input Highlight: Focused & Valid</ion-label>
    <ion-input></ion-input>
  </ion-item>

  <ion-item lines="full" class="item-has-focus ion-touched ion-invalid">
    <ion-label position="stacked">Custom Input Highlight: Focused & Invalid</ion-label>
    <ion-input></ion-input>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput, IonItem, IonLabel } from '@ionic/vue';
<\/script>

<style>
  ion-item {
    --highlight-height: 2px;
    --highlight-color-focused: #43e7f3;
    --highlight-color-valid: #6f58d8;
    --highlight-color-invalid: #ff46be;
  }
</style>`;

</script>

<style>
  ion-item {
    --highlight-height: 2px;
    --highlight-color-focused: #43e7f3;
    --highlight-color-valid: #6f58d8;
    --highlight-color-invalid: #ff46be;
  }
</style>
