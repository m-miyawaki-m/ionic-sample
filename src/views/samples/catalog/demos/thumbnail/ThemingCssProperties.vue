<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Thumbnail / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったサムネイルのスタイルカスタマイズ例。</p>
      <ion-thumbnail>
          <img alt="Silhouette of mountains" src="@/assets/img/demos/thumbnail.svg" />
        </ion-thumbnail>
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
  IonThumbnail,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<style>
  ion-thumbnail {
    --size: 140px;
    --border-radius: 14px;
  }
</style>

<template>
  <ion-thumbnail>
    <img alt="Silhouette of mountains" src="@/assets/img/demos/thumbnail.svg" />
  </ion-thumbnail>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonThumbnail } from '@ionic/vue';
<\/script>`;

</script>

<style>
  ion-thumbnail {
    --size: 140px;
    --border-radius: 14px;
  }
</style>
