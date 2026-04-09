<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Badge / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">バッジ（ion-badge）の基本的な使い方。テキストやアイコンに数値や状態を重ねて表示する。</p>
      <ion-list>
          <ion-item>
            <ion-badge slot="start">11</ion-badge>
            <ion-label>Badge in start slot</ion-label>
          </ion-item>
          <ion-item>
            <ion-badge slot="end">22</ion-badge>
            <ion-label>Badge in end slot</ion-label>
          </ion-item>
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
  IonBadge,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-list>
    <ion-item>
      <ion-badge slot="start">11</ion-badge>
      <ion-label>Badge in start slot</ion-label>
    </ion-item>
    <ion-item>
      <ion-badge slot="end">22</ion-badge>
      <ion-label>Badge in end slot</ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBadge, IonItem, IonLabel, IonList } from '@ionic/vue';
<\/script>`;

</script>
