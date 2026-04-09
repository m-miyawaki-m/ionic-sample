<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Checkbox / Alignment</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">alignment プロパティでチェックボックスとラベルの垂直揃えを変更する例。</p>
      <ion-list>
          <ion-item>
            <ion-checkbox label-placement="stacked" alignment="start">Aligned to the Start</ion-checkbox>
          </ion-item>
      
          <ion-item>
            <ion-checkbox label-placement="stacked" alignment="center">Aligned to the Center</ion-checkbox>
          </ion-item>
        </ion-list>
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
  IonCheckbox,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-checkbox label-placement="stacked" alignment="start">Aligned to the Start</ion-checkbox>
    </ion-item>

    <ion-item>
      <ion-checkbox label-placement="stacked" alignment="center">Aligned to the Center</ion-checkbox>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCheckbox } from '@ionic/vue';
<\/script>`;

</script>
