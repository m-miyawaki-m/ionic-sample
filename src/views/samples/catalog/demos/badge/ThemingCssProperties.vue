<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Badge / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったバッジのスタイルカスタマイズ例。</p>
      <ion-list>
          <ion-item>
            <ion-label>Badges styled</ion-label>
            <ion-badge>1</ion-badge>
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
      <ion-label>Badges styled</ion-label>
      <ion-badge>1</ion-badge>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBadge, IonItem, IonLabel, IonList } from '@ionic/vue';
<\/script>

<style>
  ion-badge {
    --background: purple;
    --color: white;
    --padding-end: 20px;
    --padding-start: 20px;
  }
</style>`;

</script>

<style>
  ion-badge {
    --background: purple;
    --color: white;
    --padding-end: 20px;
    --padding-start: 20px;
  }
</style>
