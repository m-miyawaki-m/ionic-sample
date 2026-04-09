<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使った入力フィールドの色のカスタマイズ例。</p>
      <ion-input aria-label="Primary input" color="primary" placeholder="Primary input"></ion-input>
        <ion-input aria-label="Secondary input" color="secondary" placeholder="Secondary input"></ion-input>
        <ion-input aria-label="Tertiary input" color="tertiary" placeholder="Tertiary input"></ion-input>
        <ion-input aria-label="Success input" color="success" placeholder="Success input"></ion-input>
        <ion-input aria-label="Warning input" color="warning" placeholder="Warning input"></ion-input>
        <ion-input aria-label="Danger input" color="danger" placeholder="Danger input"></ion-input>
        <ion-input aria-label="Light input" color="light" placeholder="Light input"></ion-input>
        <ion-input aria-label="Medium input" color="medium" placeholder="Medium input"></ion-input>
        <ion-input aria-label="Dark input" color="dark" placeholder="Dark input"></ion-input>
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
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-input aria-label="Primary input" color="primary" placeholder="Primary input"></ion-input>
  <ion-input aria-label="Secondary input" color="secondary" placeholder="Secondary input"></ion-input>
  <ion-input aria-label="Tertiary input" color="tertiary" placeholder="Tertiary input"></ion-input>
  <ion-input aria-label="Success input" color="success" placeholder="Success input"></ion-input>
  <ion-input aria-label="Warning input" color="warning" placeholder="Warning input"></ion-input>
  <ion-input aria-label="Danger input" color="danger" placeholder="Danger input"></ion-input>
  <ion-input aria-label="Light input" color="light" placeholder="Light input"></ion-input>
  <ion-input aria-label="Medium input" color="medium" placeholder="Medium input"></ion-input>
  <ion-input aria-label="Dark input" color="dark" placeholder="Dark input"></ion-input>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput } from '@ionic/vue';
<\/script>`;

</script>
