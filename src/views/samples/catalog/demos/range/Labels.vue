<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Range / Labels</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">スライダーのラベルをカスタマイズする例。</p>
      <ion-range label-placement="start" label="Label at the Start"></ion-range>
      
        <br />
      
        <ion-range label-placement="end" label="Label at the End"></ion-range>
      
        <br />
      
        <ion-range label-placement="fixed" label="Fixed Width Label"></ion-range>
      
        <br />
      
        <ion-range label-placement="stacked" label="Stacked Label"></ion-range>
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
  <ion-range label-placement="start" label="Label at the Start"></ion-range>

  <br />

  <ion-range label-placement="end" label="Label at the End"></ion-range>

  <br />

  <ion-range label-placement="fixed" label="Fixed Width Label"></ion-range>

  <br />

  <ion-range label-placement="stacked" label="Stacked Label"></ion-range>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRange } from '@ionic/vue';
<\/script>`;

</script>
