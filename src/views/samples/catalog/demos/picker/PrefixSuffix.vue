<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Picker / Prefix Suffix</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">カラムに prefix / suffix を追加して単位や記号を表示する例。</p>
      <ion-picker>
          <ion-picker-column :value="1">
            <div slot="prefix">$</div>
            <ion-picker-column-option value="" disabled="true">--</ion-picker-column-option>
            <ion-picker-column-option :value="1">1</ion-picker-column-option>
            <ion-picker-column-option :value="2">2</ion-picker-column-option>
            <ion-picker-column-option :value="3">3</ion-picker-column-option>
            <ion-picker-column-option :value="4">4</ion-picker-column-option>
            <ion-picker-column-option :value="5">5</ion-picker-column-option>
            <div slot="suffix">USD</div>
          </ion-picker-column>
        </ion-picker>
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
  IonPicker,
  IonPickerColumn,
  IonPickerColumnOption,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-picker>
    <ion-picker-column :value="1">
      <div slot="prefix">$</div>
      <ion-picker-column-option value="" disabled="true">--</ion-picker-column-option>
      <ion-picker-column-option :value="1">1</ion-picker-column-option>
      <ion-picker-column-option :value="2">2</ion-picker-column-option>
      <ion-picker-column-option :value="3">3</ion-picker-column-option>
      <ion-picker-column-option :value="4">4</ion-picker-column-option>
      <ion-picker-column-option :value="5">5</ion-picker-column-option>
      <div slot="suffix">USD</div>
    </ion-picker-column>
  </ion-picker>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/vue';
<\/script>`;

</script>
