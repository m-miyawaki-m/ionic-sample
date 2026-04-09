<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Datetime / Styling Wheel Styling</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ホイール型ピッカーのスタイルをカスタマイズする例。</p>
      <ion-datetime presentation="date" :prefer-wheel="true"></ion-datetime>
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
  IonDatetime,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-datetime presentation="date" :prefer-wheel="true"></ion-datetime>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonDatetime } from '@ionic/vue';
<\/script>

<style scoped>
  ion-datetime {
    --background: rgb(245, 235, 247);
    --background-rgb: 245, 235, 247;
    --wheel-highlight-background: rgb(218, 216, 255);
    --wheel-highlight-border-radius: 48px;
    --wheel-fade-background-rgb: 245, 235, 247;
  }

  ion-datetime::part(wheel):focus {
    background: rgb(109, 208, 164);
  }

  ion-datetime::part(wheel-item) {
    color: rgb(255, 66, 97);
  }

  ion-datetime::part(wheel-item active) {
    color: rgb(128, 30, 171);
  }
</style>`;

</script>

<style scoped>
  ion-datetime {
    --background: rgb(245, 235, 247);
    --background-rgb: 245, 235, 247;
    --wheel-highlight-background: rgb(218, 216, 255);
    --wheel-highlight-border-radius: 48px;
    --wheel-fade-background-rgb: 245, 235, 247;
  }

  ion-datetime::part(wheel):focus {
    background: rgb(109, 208, 164);
  }

  ion-datetime::part(wheel-item) {
    color: rgb(255, 66, 97);
  }

  ion-datetime::part(wheel-item active) {
    color: rgb(128, 30, 171);
  }
</style>
