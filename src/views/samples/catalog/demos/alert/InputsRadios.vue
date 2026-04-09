<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Alert / Inputs Radios</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ラジオボタン付きアラートの実装例。選択肢から一つを選ぶ UI を確認できる。</p>
      <ion-button id="present-alert">Click Me</ion-button>
        <ion-alert
          trigger="present-alert"
          header="Select your favorite color"
          :buttons="alertButtons"
          :inputs="alertInputs"
        ></ion-alert>
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
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button id="present-alert">Click Me</ion-button>
  <ion-alert
    trigger="present-alert"
    header="Select your favorite color"
    :buttons="alertButtons"
    :inputs="alertInputs"
  ></ion-alert>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonAlert, IonButton } from '@ionic/vue';

  const alertButtons = ['OK'];
  const alertInputs = [
    {
      label: 'Red',
      type: 'radio',
      value: 'red',
    },
    {
      label: 'Blue',
      type: 'radio',
      value: 'blue',
    },
    {
      label: 'Green',
      type: 'radio',
      value: 'green',
    },
  ];
<\/script>`;


  const alertButtons = ['OK'];
  const alertInputs = [
    {
      label: 'Red',
      type: 'radio',
      value: 'red',
    },
    {
      label: 'Blue',
      type: 'radio',
      value: 'blue',
    },
    {
      label: 'Green',
      type: 'radio',
      value: 'green',
    },
  ];
</script>
