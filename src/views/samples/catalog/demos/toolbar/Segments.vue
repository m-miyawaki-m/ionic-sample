<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-segment value="all">
            <ion-segment-button value="all">
              <ion-label>All</ion-label>
            </ion-segment-button>
            <ion-segment-button value="favorites">
              <ion-label>Favorites</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-header>
    <div style="padding:16px">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ツールバー内にセグメントコントロールを配置する例。</p>
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
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-segment value="all">
        <ion-segment-button value="all">
          <ion-label>All</ion-label>
        </ion-segment-button>
        <ion-segment-button value="favorites">
          <ion-label>Favorites</ion-label>
        </ion-segment-button>
      </ion-segment>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonHeader, IonLabel, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
