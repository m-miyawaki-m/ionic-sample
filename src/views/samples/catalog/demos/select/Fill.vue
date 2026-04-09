<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Select / Fill</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">fill プロパティでセレクトボックスの外観を solid / outline に切り替える例。</p>
      <ion-select label="Solid select" label-placement="floating" fill="solid">
          <ion-select-option value="apple">Apple</ion-select-option>
          <ion-select-option value="banana">Banana</ion-select-option>
          <ion-select-option value="orange">Orange</ion-select-option>
        </ion-select>
      
        <br />
      
        <ion-select label="Outline select" label-placement="floating" fill="outline">
          <ion-select-option value="apple">Apple</ion-select-option>
          <ion-select-option value="banana">Banana</ion-select-option>
          <ion-select-option value="orange">Orange</ion-select-option>
        </ion-select>
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
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-select label="Solid select" label-placement="floating" fill="solid">
    <ion-select-option value="apple">Apple</ion-select-option>
    <ion-select-option value="banana">Banana</ion-select-option>
    <ion-select-option value="orange">Orange</ion-select-option>
  </ion-select>

  <br />

  <ion-select label="Outline select" label-placement="floating" fill="outline">
    <ion-select-option value="apple">Apple</ion-select-option>
    <ion-select-option value="banana">Banana</ion-select-option>
    <ion-select-option value="orange">Orange</ion-select-option>
  </ion-select>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSelect, IonSelectOption } from '@ionic/vue';
<\/script>`;

</script>
