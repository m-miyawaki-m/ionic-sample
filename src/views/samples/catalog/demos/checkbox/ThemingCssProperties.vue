<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Checkbox / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったチェックボックスのスタイルカスタマイズ例。</p>
      <ion-checkbox>Themed checkbox</ion-checkbox>
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
  <ion-checkbox>Themed checkbox</ion-checkbox>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCheckbox } from '@ionic/vue';
<\/script>

<style>
  ion-checkbox {
    --size: 32px;
    --checkbox-background-checked: #6815ec;
  }

  ion-checkbox::part(container) {
    border-radius: 6px;
    border: 2px solid #6815ec;
  }
</style>`;

</script>

<style>
  ion-checkbox {
    --size: 32px;
    --checkbox-background-checked: #6815ec;
  }

  ion-checkbox::part(container) {
    border-radius: 6px;
    border: 2px solid #6815ec;
  }
</style>
