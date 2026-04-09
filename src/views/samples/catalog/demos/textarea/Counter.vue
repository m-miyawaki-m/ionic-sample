<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Textarea / Counter</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">counter プロパティで文字数カウンターをテキストエリアに表示する例。</p>
      <ion-textarea label="Default counter" label-placement="floating" :counter="true" maxlength="20"></ion-textarea>
      
        <ion-textarea
          label="Custom Counter Format"
          label-placement="floating"
          :counter="true"
          maxlength="20"
          :counter-formatter="customFormatter"
        ></ion-textarea>
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
  IonTextarea,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-textarea label="Default counter" label-placement="floating" :counter="true" maxlength="20"></ion-textarea>

  <ion-textarea
    label="Custom Counter Format"
    label-placement="floating"
    :counter="true"
    maxlength="20"
    :counter-formatter="customFormatter"
  ></ion-textarea>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonTextarea } from '@ionic/vue';

  const customFormatter = (inputLength, maxLength) => {
    return \`\${maxLength - inputLength} characters remaining\`;
  };
<\/script>`;


  const customFormatter = (inputLength, maxLength) => {
    return `${maxLength - inputLength} characters remaining`;
  };
</script>
