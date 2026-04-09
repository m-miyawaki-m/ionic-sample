<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Loading / Controller</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">loadingController を使ってプログラム的にローディングオーバーレイを表示する例。</p>
      <ion-button @click="showLoading">Show Loading</ion-button>
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
  loadingController,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button @click="showLoading">Show Loading</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, loadingController } from '@ionic/vue';

  const showLoading = async () => {
    const loading = await loadingController.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  };
<\/script>`;


  const showLoading = async () => {
    const loading = await loadingController.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  };
</script>
