<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Input / Counter Alignment</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">counter プロパティと counterFormatter を使って文字数カウンターの配置を調整する例。</p>
      <ion-list>
          <ion-item>
            <ion-input label="Text input" placeholder="Enter text"></ion-input>
          </ion-item>
      
          <div class="ion-padding-start">
            <ion-input label="Counter input" :counter="true" maxlength="20"></ion-input>
          </div>
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
  IonInput,
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
      <ion-input label="Text input" placeholder="Enter text"></ion-input>
    </ion-item>

    <div class="ion-padding-start">
      <ion-input label="Counter input" :counter="true" maxlength="20"></ion-input>
    </div>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonInput, IonItem, IonList } from '@ionic/vue';
<\/script>`;

</script>
