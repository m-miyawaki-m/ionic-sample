<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/samples/catalog" />
        </ion-buttons>
        <ion-title>Toast</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h2>Basic</h2>
      <p>↓ボタンタップで2秒間トーストが表示される。toastController.create() → present() の2ステップ。</p>
      <ion-button @click="showBasic">Show Basic Toast</ion-button>

      <h2>Colors</h2>
      <p>color 属性で背景色を変える。Ionic 標準色 (success/warning/danger 等) が使える。</p>
      <ion-button color="success" @click="showColor('success')">Success</ion-button>
      <ion-button color="warning" @click="showColor('warning')">Warning</ion-button>
      <ion-button color="danger" @click="showColor('danger')">Danger</ion-button>

      <h2>Position</h2>
      <p>position で表示位置を top/middle/bottom に切替。デフォルトは bottom。</p>
      <ion-button @click="showPosition('top')">Top</ion-button>
      <ion-button @click="showPosition('middle')">Middle</ion-button>
      <ion-button @click="showPosition('bottom')">Bottom</ion-button>

      <h2>With Button</h2>
      <p>buttons オプションで Close ボタン等を付けられる。duration を省くと自動で消えなくなる。</p>
      <ion-button @click="showWithButton">Show with Close Button</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonButton,
  toastController,
} from '@ionic/vue';

const showBasic = async () => {
  const toast = await toastController.create({
    message: 'Hello from Toast',
    duration: 2000,
  });
  await toast.present();
};

const showColor = async (color: string) => {
  const toast = await toastController.create({
    message: `${color} toast`,
    duration: 2000,
    color,
  });
  await toast.present();
};

const showPosition = async (position: 'top' | 'middle' | 'bottom') => {
  const toast = await toastController.create({
    message: `Position: ${position}`,
    duration: 2000,
    position,
  });
  await toast.present();
};

const showWithButton = async () => {
  const toast = await toastController.create({
    message: 'Click X to close',
    buttons: [{ text: 'Close', role: 'cancel' }],
  });
  await toast.present();
};
</script>
