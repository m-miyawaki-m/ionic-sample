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
      <ion-button @click="showBasic">Show Basic Toast</ion-button>

      <h2>Colors</h2>
      <ion-button color="success" @click="showColor('success')">Success</ion-button>
      <ion-button color="warning" @click="showColor('warning')">Warning</ion-button>
      <ion-button color="danger" @click="showColor('danger')">Danger</ion-button>

      <h2>Position</h2>
      <ion-button @click="showPosition('top')">Top</ion-button>
      <ion-button @click="showPosition('middle')">Middle</ion-button>
      <ion-button @click="showPosition('bottom')">Bottom</ion-button>

      <h2>With Button</h2>
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
