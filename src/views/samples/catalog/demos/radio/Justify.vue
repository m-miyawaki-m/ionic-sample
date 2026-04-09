<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Radio / Justify</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">justify プロパティでラジオボタンとラベルの水平配置を変更する例。</p>
      <ion-list>
          <ion-radio-group value="start">
            <ion-item>
              <ion-radio value="start" justify="start">Packed at the Start of Line</ion-radio>
            </ion-item>
          </ion-radio-group>
      
          <ion-radio-group value="end">
            <ion-item>
              <ion-radio value="end" justify="end">Packed at the End of Line</ion-radio>
            </ion-item>
          </ion-radio-group>
      
          <ion-radio-group value="space-between">
            <ion-item>
              <ion-radio value="space-between" justify="space-between">Space Between Label and Control</ion-radio>
            </ion-item>
          </ion-radio-group>
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
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-radio-group value="start">
      <ion-item>
        <ion-radio value="start" justify="start">Packed at the Start of Line</ion-radio>
      </ion-item>
    </ion-radio-group>

    <ion-radio-group value="end">
      <ion-item>
        <ion-radio value="end" justify="end">Packed at the End of Line</ion-radio>
      </ion-item>
    </ion-radio-group>

    <ion-radio-group value="space-between">
      <ion-item>
        <ion-radio value="space-between" justify="space-between">Space Between Label and Control</ion-radio>
      </ion-item>
    </ion-radio-group>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonList, IonRadio, IonRadioGroup } from '@ionic/vue';
<\/script>`;

</script>
