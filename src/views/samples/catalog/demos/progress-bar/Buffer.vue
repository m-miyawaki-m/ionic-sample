<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Progress Bar / Buffer</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">buffer プロパティでバッファリング進行状況を視覚化するプログレスバーの例。</p>
      <ion-progress-bar :buffer="buffer" :value="progress"></ion-progress-bar>
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
  IonMenuButton,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

const sourceCode = `<template>
  <ion-progress-bar :buffer="buffer" :value="progress"></ion-progress-bar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonProgressBar } from '@ionic/vue';
  import { ref, onMounted } from 'vue';

  const buffer = ref(0.06);
  const progress = ref(0);

  onMounted(() => {
    setInterval(() => {
      buffer.value += 0.06;
      progress.value += 0.06;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (progress.value > 1) {
        setTimeout(() => {
          buffer.value = 0.06;
          progress.value = 0;
        }, 1000);
      }
    }, 1000);
  });
<\/script>`;


  const buffer = ref(0.06);
  const progress = ref(0);

  onMounted(() => {
    setInterval(() => {
      buffer.value += 0.06;
      progress.value += 0.06;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (progress.value > 1) {
        setTimeout(() => {
          buffer.value = 0.06;
          progress.value = 0;
        }, 1000);
      }
    }, 1000);
  });
</script>
