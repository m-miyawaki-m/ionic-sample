<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Radio / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ラジオグループ（ion-radio-group）とラジオボタン（ion-radio）の基本的な使い方。</p>
      <ion-radio-group value="strawberries">
          <ion-radio value="grapes">Grapes</ion-radio><br />
          <ion-radio value="strawberries">Strawberries</ion-radio><br />
          <ion-radio value="pineapple">Pineapple</ion-radio><br />
          <ion-radio value="cherries">Cherries</ion-radio>
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
  <ion-radio-group value="strawberries">
    <ion-radio value="grapes">Grapes</ion-radio><br />
    <ion-radio value="strawberries">Strawberries</ion-radio><br />
    <ion-radio value="pineapple">Pineapple</ion-radio><br />
    <ion-radio value="cherries">Cherries</ion-radio>
  </ion-radio-group>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonRadio, IonRadioGroup } from '@ionic/vue';
<\/script>`;

</script>
