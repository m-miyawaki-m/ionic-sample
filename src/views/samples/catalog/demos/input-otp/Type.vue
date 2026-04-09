<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input OTP / Type</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">type プロパティで入力値の種類（テキスト・数値・パスワードなど）を変更する例。</p>
      <ion-input-otp> Numbers only </ion-input-otp>
        <ion-input-otp type="text"> Letters and numbers </ion-input-otp>
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
  <ion-input-otp> Numbers only </ion-input-otp>
  <ion-input-otp type="text"> Letters and numbers </ion-input-otp>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInputOtp } from '@ionic/vue';
<\/script>`;

</script>
