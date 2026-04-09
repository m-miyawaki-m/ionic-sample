<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>App / Set Focus</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">Ion App の setFocus() メソッドを使ってプログラムからフォーカスを制御する例。</p>
      <ion-button id="buttonToFocus" fill="outline">Button</ion-button>
      
        <ion-radio-group value="a">
          <ion-radio id="radioToFocus" value="a">Radio</ion-radio>
        </ion-radio-group>
      
        <br />
      
        <ion-button @click="focusElement('#buttonToFocus')">Focus Button</ion-button>
        <ion-button @click="focusElement('#radioToFocus')">Focus Radio</ion-button>
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
  IonButton,
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
  <ion-button id="buttonToFocus" fill="outline">Button</ion-button>

  <ion-radio-group value="a">
    <ion-radio id="radioToFocus" value="a">Radio</ion-radio>
  </ion-radio-group>

  <br />

  <ion-button @click="focusElement('#buttonToFocus')">Focus Button</ion-button>
  <ion-button @click="focusElement('#radioToFocus')">Focus Radio</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonRadio, IonRadioGroup } from '@ionic/vue';

  const focusElement = (id) => {
    const el = document.querySelector(id);

    const app = el.closest('ion-app');
    if (app) {
      app.setFocus([el]);
    }
  };
<\/script>`;


  const focusElement = (id) => {
    const el = document.querySelector(id);

    const app = el.closest('ion-app');
    if (app) {
      app.setFocus([el]);
    }
  };
</script>
