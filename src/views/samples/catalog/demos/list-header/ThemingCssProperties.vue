<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>List Header / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったリストヘッダーのスタイルカスタマイズ例。</p>
      <ion-list-header>
          <ion-label>Custom List Header</ion-label>
        </ion-list-header>
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
  IonLabel,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list-header>
    <ion-label>Custom List Header</ion-label>
  </ion-list-header>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonLabel, IonListHeader } from '@ionic/vue';
<\/script>

<style scoped>
  ion-list-header {
    --background: #19422d;
    --color: #fff;

    --border-width: 0 0 4px 0;
    --border-color: #f24aec;
    --border-style: double;
  }
</style>`;

</script>

<style scoped>
  ion-list-header {
    --background: #19422d;
    --color: #fff;

    --border-width: 0 0 4px 0;
    --border-color: #f24aec;
    --border-style: double;
  }
</style>
