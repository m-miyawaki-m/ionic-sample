<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Radio / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったラジオボタンの色のカスタマイズ例。</p>
      <ion-radio-group value="primary">
          <ion-radio aria-label="Primary" color="primary" value="primary"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="secondary">
          <ion-radio aria-label="Secondary" color="secondary" value="secondary"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="tertiary">
          <ion-radio aria-label="Tertiary" color="tertiary" value="tertiary"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="success">
          <ion-radio aria-label="Success" color="success" value="success"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="warning">
          <ion-radio aria-label="Warning" color="warning" value="warning"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="danger">
          <ion-radio aria-label="Danger" color="danger" value="danger"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="light">
          <ion-radio aria-label="Light" color="light" value="light"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="medium">
          <ion-radio aria-label="Medium" color="medium" value="medium"></ion-radio>
        </ion-radio-group>
        <ion-radio-group value="dark">
          <ion-radio aria-label="Dark" color="dark" value="dark"></ion-radio>
        </ion-radio-group>
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
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-radio-group value="primary">
    <ion-radio aria-label="Primary" color="primary" value="primary"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="secondary">
    <ion-radio aria-label="Secondary" color="secondary" value="secondary"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="tertiary">
    <ion-radio aria-label="Tertiary" color="tertiary" value="tertiary"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="success">
    <ion-radio aria-label="Success" color="success" value="success"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="warning">
    <ion-radio aria-label="Warning" color="warning" value="warning"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="danger">
    <ion-radio aria-label="Danger" color="danger" value="danger"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="light">
    <ion-radio aria-label="Light" color="light" value="light"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="medium">
    <ion-radio aria-label="Medium" color="medium" value="medium"></ion-radio>
  </ion-radio-group>
  <ion-radio-group value="dark">
    <ion-radio aria-label="Dark" color="dark" value="dark"></ion-radio>
  </ion-radio-group>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRadio, IonRadioGroup } from '@ionic/vue';
<\/script>`;

</script>
