<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input OTP / Pattern</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">pattern プロパティで入力可能な文字種（数字・英字など）を制限する例。</p>
      <ion-input-otp pattern="[1-4]" value="123"> Numbers 1-4 only </ion-input-otp>
        <ion-input-otp type="text" pattern="." value="!@#"> All characters allowed </ion-input-otp>
        <ion-input-otp type="text" pattern="[A-Z]" autocapitalize="on" value="ABC">
          Capital Latin letters only
        </ion-input-otp>
        <ion-input-otp type="text" pattern="[\p{Script=Greek}]" value="αβγ"> Greek characters only </ion-input-otp>
        <ion-input-otp type="text" pattern="[\p{Script=Arabic}]" value="ابت"> Arabic characters only </ion-input-otp>
        <ion-input-otp type="text" pattern="[\p{Script=Han}]" value="甲乙丙"> Chinese characters only </ion-input-otp>
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
  <ion-input-otp pattern="[1-4]" value="123"> Numbers 1-4 only </ion-input-otp>
  <ion-input-otp type="text" pattern="." value="!@#"> All characters allowed </ion-input-otp>
  <ion-input-otp type="text" pattern="[A-Z]" autocapitalize="on" value="ABC">
    Capital Latin letters only
  </ion-input-otp>
  <ion-input-otp type="text" pattern="[\\p{Script=Greek}]" value="αβγ"> Greek characters only </ion-input-otp>
  <ion-input-otp type="text" pattern="[\\p{Script=Arabic}]" value="ابت"> Arabic characters only </ion-input-otp>
  <ion-input-otp type="text" pattern="[\\p{Script=Han}]" value="甲乙丙"> Chinese characters only </ion-input-otp>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInputOtp } from '@ionic/vue';
<\/script>`;

</script>
