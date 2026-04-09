<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input OTP / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使った OTP フィールドの色のカスタマイズ例。</p>
      <ion-input-otp length="2" color="primary"> Primary </ion-input-otp>
        <ion-input-otp length="2" color="secondary"> Secondary </ion-input-otp>
        <ion-input-otp length="2" color="tertiary"> Tertiary </ion-input-otp>
        <ion-input-otp length="2" color="success"> Success </ion-input-otp>
        <ion-input-otp length="2" color="warning"> Warning </ion-input-otp>
        <ion-input-otp length="2" color="danger"> Danger </ion-input-otp>
        <ion-input-otp length="2" color="light"> Light </ion-input-otp>
        <ion-input-otp length="2" color="medium"> Medium </ion-input-otp>
        <ion-input-otp length="2" color="dark"> Dark </ion-input-otp>
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
  IonInputOtp,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-input-otp length="2" color="primary"> Primary </ion-input-otp>
  <ion-input-otp length="2" color="secondary"> Secondary </ion-input-otp>
  <ion-input-otp length="2" color="tertiary"> Tertiary </ion-input-otp>
  <ion-input-otp length="2" color="success"> Success </ion-input-otp>
  <ion-input-otp length="2" color="warning"> Warning </ion-input-otp>
  <ion-input-otp length="2" color="danger"> Danger </ion-input-otp>
  <ion-input-otp length="2" color="light"> Light </ion-input-otp>
  <ion-input-otp length="2" color="medium"> Medium </ion-input-otp>
  <ion-input-otp length="2" color="dark"> Dark </ion-input-otp>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInputOtp } from '@ionic/vue';
<\/script>`;

</script>
