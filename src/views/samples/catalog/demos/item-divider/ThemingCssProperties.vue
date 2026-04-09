<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item Divider / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったアイテム区切り線のスタイルカスタマイズ例。</p>
      <ion-item-divider>
          <ion-label> Item Divider </ion-label>
        </ion-item-divider>
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
  IonItemDivider,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item-divider>
    <ion-label> Item Divider </ion-label>
  </ion-item-divider>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItemDivider } from '@ionic/vue';
<\/script>

<style scoped>
  ion-item-divider {
    --background: #19422d;
    --color: #fff;

    --padding-top: 10px;
    --padding-bottom: 10px;
    --padding-start: 20px;
    --padding-end: 20px;
  }
</style>`;

</script>

<style scoped>
  ion-item-divider {
    --background: #19422d;
    --color: #fff;

    --padding-top: 10px;
    --padding-bottom: 10px;
    --padding-start: 20px;
    --padding-end: 20px;
  }
</style>
