<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input OTP / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使った OTP フィールドのスタイルカスタマイズ例。</p>
      <ion-input-otp class="custom" separators="all"> Didn't get a code? <a href="#">Resend the code</a> </ion-input-otp>
        <ion-input-otp fill="solid" class="custom" separators="all">
          Didn't get a code? <a href="#">Resend the code</a>
        </ion-input-otp>
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
  <ion-input-otp class="custom" separators="all"> Didn't get a code? <a href="#">Resend the code</a> </ion-input-otp>
  <ion-input-otp fill="solid" class="custom" separators="all">
    Didn't get a code? <a href="#">Resend the code</a>
  </ion-input-otp>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInputOtp } from '@ionic/vue';
<\/script>

<style>
  ion-input-otp.custom {
    --separator-color: rgb(90, 23, 237, 0.12);
    --highlight-color-focused: #5a17ed;
  }

  .input-otp-fill-outline.custom {
    --border-color: rgb(90, 23, 237, 0.6);
    --color: #5a17ed;
  }

  .input-otp-fill-solid.custom {
    --border-color: rgb(90, 23, 237, 0.12);
    --background: rgb(90, 23, 237, 0.12);
  }
</style>`;

</script>

<style>
  ion-input-otp.custom {
    --separator-color: rgb(90, 23, 237, 0.12);
    --highlight-color-focused: #5a17ed;
  }

  .input-otp-fill-outline.custom {
    --border-color: rgb(90, 23, 237, 0.6);
    --color: #5a17ed;
  }

  .input-otp-fill-solid.custom {
    --border-color: rgb(90, 23, 237, 0.12);
    --background: rgb(90, 23, 237, 0.12);
  }
</style>
