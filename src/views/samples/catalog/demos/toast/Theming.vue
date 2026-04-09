<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toast / Theming</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったトーストのスタイルカスタマイズ例。</p>
      <ion-button id="open-toast">Open Toast</ion-button>
        <ion-toast
          trigger="open-toast"
          :duration="3000"
          message="Hello Styled World!"
          class="custom-toast"
          :buttons="toastButtons"
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
  <ion-button id="open-toast">Open Toast</ion-button>
  <ion-toast
    trigger="open-toast"
    :duration="3000"
    message="Hello Styled World!"
    class="custom-toast"
    :buttons="toastButtons"
  ></ion-toast>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonToast } from '@ionic/vue';

  const toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];
<\/script>

<style>
  ion-toast.custom-toast {
    --background: #f4f4fa;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
    --color: #4b4a50;
  }

  ion-toast.custom-toast::part(message) {
    font-style: italic;
  }

  ion-toast.custom-toast::part(button) {
    border-left: 1px solid #d2d2d2;
    color: #030207;
    font-size: 15px;
  }
</style>`;


  const toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];
</script>

<style>
  ion-toast.custom-toast {
    --background: #f4f4fa;
    --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
    --color: #4b4a50;
  }

  ion-toast.custom-toast::part(message) {
    font-style: italic;
  }

  ion-toast.custom-toast::part(button) {
    border-left: 1px solid #d2d2d2;
    color: #030207;
    font-size: 15px;
  }
</style>
