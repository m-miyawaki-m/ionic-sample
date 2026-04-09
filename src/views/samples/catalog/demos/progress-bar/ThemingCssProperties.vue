<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Progress Bar / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったプログレスバーのスタイルカスタマイズ例。</p>
      <ion-progress-bar :value=".25" :buffer=".5"></ion-progress-bar>
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
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

const sourceCode = `<template>
  <ion-progress-bar :value=".25" :buffer=".5"></ion-progress-bar>
  <ion-progress-bar type="indeterminate"></ion-progress-bar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonProgressBar } from '@ionic/vue';
<\/script>

<style scoped>
  ion-progress-bar {
    --background: #f3e895;
    --progress-background: #09c567;
  }
</style>`;

</script>

<style scoped>
  ion-progress-bar {
    --background: #f3e895;
    --progress-background: #09c567;
  }
</style>
