<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Checkbox / Justify</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">justify プロパティでチェックボックスとラベルの水平配置を変更する例。</p>
      <ion-list>
          <ion-item>
            <ion-checkbox justify="start">Packed at the Start of Line</ion-checkbox>
          </ion-item>
      
          <ion-item>
            <ion-checkbox justify="end">Packed at the End of Line</ion-checkbox>
          </ion-item>
      
          <ion-item>
            <ion-checkbox justify="space-between">Space Between Label and Control</ion-checkbox>
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
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-checkbox justify="start">Packed at the Start of Line</ion-checkbox>
    </ion-item>

    <ion-item>
      <ion-checkbox justify="end">Packed at the End of Line</ion-checkbox>
    </ion-item>

    <ion-item>
      <ion-checkbox justify="space-between">Space Between Label and Control</ion-checkbox>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCheckbox, IonItem, IonList } from '@ionic/vue';
<\/script>`;

</script>
