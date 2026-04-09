<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Toolbar / Basic</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-footer>
        <ion-toolbar>
          <ion-title>Footer Toolbar</ion-title>
        </ion-toolbar>
      </ion-footer>
    <div style="padding:16px">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ツールバー（ion-toolbar）の基本的な使い方。タイトルやボタンを含む上部バーを確認できる。</p>
    </div>
    <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
      <details>
        <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
        <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
      </details>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonButtons,
  IonFooter,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Header Toolbar</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-footer>
    <ion-toolbar>
      <ion-title>Footer Toolbar</ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonFooter, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
