<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Range / Ion Change Event</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ionChange イベントでスライダー値の確定時の変化を検知する例。</p>
      <ion-range aria-label="Range with ionChange" @ionChange="onIonChange"></ion-range>
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
  IonRange,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-range aria-label="Range with ionChange" @ionChange="onIonChange"></ion-range>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRange } from '@ionic/vue';

  const onIonChange = ({ detail }) => {
    console.log('ionChange emitted value: ' + detail.value);
  };
<\/script>`;


  const onIonChange = ({ detail }) => {
    console.log('ionChange emitted value: ' + detail.value);
  };
</script>
