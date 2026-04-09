<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Inputs</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">入力フィールドを ion-item 内に配置する例。フォームレイアウトとして活用できる。</p>
      <ion-item>
          <ion-input label="Default Input" placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-input label="Fixed Input" label-placement="fixed" placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-input label="Stacked Input" label-placement="stacked" placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-input label="Floating Input" label-placement="floating" placeholder="Enter text"></ion-input>
        </ion-item>
      
        <ion-item>
          <ion-select label="Select" placeholder="Make a Selection">
            <ion-select-option value="">No Game Console</ion-select-option>
            <ion-select-option value="nes">NES</ion-select-option>
            <ion-select-option value="n64">Nintendo64</ion-select-option>
            <ion-select-option value="ps">PlayStation</ion-select-option>
            <ion-select-option value="genesis">Sega Genesis</ion-select-option>
            <ion-select-option value="saturn">Sega Saturn</ion-select-option>
            <ion-select-option value="snes">SNES</ion-select-option>
          </ion-select>
        </ion-item>
      
        <ion-item>
          <ion-toggle> Toggle </ion-toggle>
        </ion-item>
      
        <ion-item>
          <ion-checkbox> Checkbox </ion-checkbox>
        </ion-item>
      
        <ion-item>
          <ion-range label-placement="start">
            <div slot="label">Range</div>
          </ion-range>
        </ion-item>
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
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item>
    <ion-input label="Default Input" placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-input label="Fixed Input" label-placement="fixed" placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-input label="Stacked Input" label-placement="stacked" placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-input label="Floating Input" label-placement="floating" placeholder="Enter text"></ion-input>
  </ion-item>

  <ion-item>
    <ion-select label="Select" placeholder="Make a Selection">
      <ion-select-option value="">No Game Console</ion-select-option>
      <ion-select-option value="nes">NES</ion-select-option>
      <ion-select-option value="n64">Nintendo64</ion-select-option>
      <ion-select-option value="ps">PlayStation</ion-select-option>
      <ion-select-option value="genesis">Sega Genesis</ion-select-option>
      <ion-select-option value="saturn">Sega Saturn</ion-select-option>
      <ion-select-option value="snes">SNES</ion-select-option>
    </ion-select>
  </ion-item>

  <ion-item>
    <ion-toggle> Toggle </ion-toggle>
  </ion-item>

  <ion-item>
    <ion-checkbox> Checkbox </ion-checkbox>
  </ion-item>

  <ion-item>
    <ion-range label-placement="start">
      <div slot="label">Range</div>
    </ion-range>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import {
    IonCheckbox,
    IonInput,
    IonItem,
    IonLabel,
    IonRange,
    IonSelect,
    IonSelectOption,
    IonToggle,
  } from '@ionic/vue';
<\/script>`;

</script>
