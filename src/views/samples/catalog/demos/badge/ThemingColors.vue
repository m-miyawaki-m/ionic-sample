<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Badge / Theming Colors</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">color プロパティを使ったバッジの色のカスタマイズ例。</p>
      <ion-list>
          <ion-item>
            <ion-label>Followers</ion-label>
            <ion-badge color="primary">22k</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Likes</ion-label>
            <ion-badge color="secondary">118k</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Stars</ion-label>
            <ion-badge color="tertiary">34k</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Completed</ion-label>
            <ion-badge color="success">80</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Warnings</ion-label>
            <ion-badge color="warning">70</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Notifications</ion-label>
            <ion-badge color="danger">1000</ion-badge>
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
      <ion-label>Followers</ion-label>
      <ion-badge color="primary">22k</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Likes</ion-label>
      <ion-badge color="secondary">118k</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Stars</ion-label>
      <ion-badge color="tertiary">34k</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Completed</ion-label>
      <ion-badge color="success">80</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Warnings</ion-label>
      <ion-badge color="warning">70</ion-badge>
    </ion-item>
    <ion-item>
      <ion-label>Notifications</ion-label>
      <ion-badge color="danger">1000</ion-badge>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBadge, IonItem, IonLabel, IonList } from '@ionic/vue';
<\/script>`;

</script>
