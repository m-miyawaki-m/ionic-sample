<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Thumbnail / Item</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-item 内にサムネイルを配置する例。リスト項目のビジュアルとして活用できる。</p>
      <ion-item>
          <ion-thumbnail slot="start">
            <img alt="Silhouette of mountains" src="@/assets/img/demos/thumbnail.svg" />
          </ion-thumbnail>
          <ion-label>Item Thumbnail</ion-label>
        </ion-item>
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
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-item>
    <ion-thumbnail slot="start">
      <img alt="Silhouette of mountains" src="@/assets/img/demos/thumbnail.svg" />
    </ion-thumbnail>
    <ion-label>Item Thumbnail</ion-label>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
<\/script>`;

</script>
