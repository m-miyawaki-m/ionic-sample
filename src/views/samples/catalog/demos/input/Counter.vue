<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Counter</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">counter プロパティと maxlength を組み合わせて文字数カウンターを表示する例。</p>
      <ion-input label="Default counter" label-placement="floating" :counter="true" :maxlength="20"></ion-input>
      
        <ion-input
          id="custom-input"
          label="Custom Counter Format"
          label-placement="floating"
          :counter="true"
          :maxlength="20"
          :counter-formatter="customFormatter"
        ></ion-input>
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
  IonInput,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-input label="Default counter" label-placement="floating" :counter="true" :maxlength="20"></ion-input>

  <ion-input
    id="custom-input"
    label="Custom Counter Format"
    label-placement="floating"
    :counter="true"
    :maxlength="20"
    :counter-formatter="customFormatter"
  ></ion-input>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput } from '@ionic/vue';

  const customFormatter = (inputLength, maxLength) => {
    return \`\${maxLength - inputLength} characters remaining\`;
  };
<\/script>`;


  const customFormatter = (inputLength, maxLength) => {
    return `${maxLength - inputLength} characters remaining`;
  };
</script>
