<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Radio / Theming Css Shadow Parts</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS Shadow Parts を使ったラジオボタンの詳細なスタイリング例。</p>
      <ion-radio-group value="custom-checked">
          <ion-radio value="custom" aria-label="Custom checkbox"></ion-radio>
          <ion-radio value="custom-checked" aria-label="Custom checkbox that is checked"></ion-radio>
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
  <ion-radio-group value="custom-checked">
    <ion-radio value="custom" aria-label="Custom checkbox"></ion-radio>
    <ion-radio value="custom-checked" aria-label="Custom checkbox that is checked"></ion-radio>
  </ion-radio-group>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRadio, IonRadioGroup } from '@ionic/vue';
<\/script>

<style scoped>
  ion-radio::part(container) {
    width: 30px;
    height: 30px;

    border-radius: 8px;
    border: 2px solid #ddd;
  }

  ion-radio::part(mark) {
    background: none;
    transition: none;
    transform: none;
    border-radius: 0;
  }

  ion-radio.radio-checked::part(container) {
    background: #6815ec;
    border-color: transparent;
  }

  ion-radio.radio-checked::part(mark) {
    width: 6px;
    height: 10px;

    border-width: 0px 2px 2px 0px;
    border-style: solid;
    border-color: #fff;

    transform: rotate(45deg);
  }
</style>`;

</script>

<style scoped>
  ion-radio::part(container) {
    width: 30px;
    height: 30px;

    border-radius: 8px;
    border: 2px solid #ddd;
  }

  ion-radio::part(mark) {
    background: none;
    transition: none;
    transform: none;
    border-radius: 0;
  }

  ion-radio.radio-checked::part(container) {
    background: #6815ec;
    border-color: transparent;
  }

  ion-radio.radio-checked::part(mark) {
    width: 6px;
    height: 10px;

    border-width: 0px 2px 2px 0px;
    border-style: solid;
    border-color: #fff;

    transform: rotate(45deg);
  }
</style>
