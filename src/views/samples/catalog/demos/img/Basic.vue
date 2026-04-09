<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Image / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-img の基本的な使い方。画像の遅延ロードと適切な表示を確認できる。</p>
      <ion-img
          src="@/assets/img/demos/card-media.svg"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        ></ion-img>
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
  IonImg,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-img
    src="@/assets/img/demos/card-media.svg"
    alt="The Wisconsin State Capitol building in Madison, WI at night"
  ></ion-img>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonImg } from '@ionic/vue';
<\/script>`;

</script>
