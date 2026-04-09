<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toast / Layout</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">layout プロパティでアイコン・テキスト・ボタンの配置スタイルを変更する例。</p>
      <ion-button id="open-inline-toast">Open Baseline Layout Toast</ion-button>
        <ion-button id="open-stacked-toast">Open Stacked Layout Toast</ion-button>
        <ion-toast
          trigger="open-inline-toast"
          :duration="3000"
          :buttons="toastButtons"
          message="This is a toast with a long message and a button that appears on the same line."
        ></ion-toast>
        <ion-toast
          trigger="open-stacked-toast"
          :duration="3000"
          :buttons="toastButtons"
          message="This is a toast with a long message and a button that appears on the next line."
          layout="stacked"
        ></ion-toast>
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
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button id="open-inline-toast">Open Baseline Layout Toast</ion-button>
  <ion-button id="open-stacked-toast">Open Stacked Layout Toast</ion-button>
  <ion-toast
    trigger="open-inline-toast"
    :duration="3000"
    :buttons="toastButtons"
    message="This is a toast with a long message and a button that appears on the same line."
  ></ion-toast>
  <ion-toast
    trigger="open-stacked-toast"
    :duration="3000"
    :buttons="toastButtons"
    message="This is a toast with a long message and a button that appears on the next line."
    layout="stacked"
  ></ion-toast>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonToast } from '@ionic/vue';

  const toastButtons = [
    {
      text: 'Action With Long Text',
    },
  ];
<\/script>`;


  const toastButtons = [
    {
      text: 'Action With Long Text',
    },
  ];
</script>
