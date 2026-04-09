<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Header / Basic</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ヘッダー（ion-header）の基本的な使い方。画面上部に固定されるツールバー領域を確認できる。</p>
        <h1>Content</h1>
      
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
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Header</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <h1>Content</h1>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
