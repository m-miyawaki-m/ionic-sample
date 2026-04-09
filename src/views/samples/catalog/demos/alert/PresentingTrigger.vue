<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Alert / Presenting Trigger</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">trigger 属性を使い、ボタンクリックでアラートを開くインラインパターン。</p>
      <ion-button id="present-alert">Click Me</ion-button>
        <ion-alert
          trigger="present-alert"
          header="A Short Title Is Best"
          sub-header="A Sub Header Is Optional"
          message="A message should be a short, complete sentence."
          :buttons="alertButtons"
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
    header="A Short Title Is Best"
    sub-header="A Sub Header Is Optional"
    message="A message should be a short, complete sentence."
    :buttons="alertButtons"
  ></ion-alert>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonAlert, IonButton } from '@ionic/vue';

  const alertButtons = ['Action'];
<\/script>`;


  const alertButtons = ['Action'];
</script>
