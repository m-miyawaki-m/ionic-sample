<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toast / Presenting Controller</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">toastController を使ってプログラム的にトーストを表示する例。</p>
      <ion-button expand="block" @click="presentToast('top')">Present Toast At the Top</ion-button>
        <ion-button expand="block" @click="presentToast('middle')">Present Toast At the Middle</ion-button>
        <ion-button expand="block" @click="presentToast('bottom')">Present Toast At the Bottom</ion-button>
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
  IonToolbar,
  toastController,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button expand="block" @click="presentToast('top')">Present Toast At the Top</ion-button>
  <ion-button expand="block" @click="presentToast('middle')">Present Toast At the Middle</ion-button>
  <ion-button expand="block" @click="presentToast('bottom')">Present Toast At the Bottom</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, toastController } from '@ionic/vue';

  const presentToast = async (position: 'top' | 'middle' | 'bottom') => {
    const toast = await toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  };
<\/script>`;


  const presentToast = async (position: 'top' | 'middle' | 'bottom') => {
    const toast = await toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  };
</script>
