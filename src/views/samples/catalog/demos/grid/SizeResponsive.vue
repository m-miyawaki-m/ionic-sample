<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Grid / Size Responsive</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ブレークポイントごとにカラムサイズを変えるレスポンシブレイアウトの例。</p>
      <b>Stacked for xs breakpoint, equal width for sm and up</b>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-sm="3">1</ion-col>
            <ion-col size="12" size-sm="3">2</ion-col>
            <ion-col size="12" size-sm="3">3</ion-col>
            <ion-col size="12" size-sm="3">4</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>Equal width until md breakpoint, last column takes full width for md and up</b>
        <ion-grid>
          <ion-row>
            <ion-col size-md="6">1</ion-col>
            <ion-col size-md="6">2</ion-col>
            <ion-col size-md="12">3</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>2 per row until md breakpoint, 3 per row for md, equal width for lg and up</b>
        <ion-grid>
          <ion-row>
            <ion-col size="6" size-md="4" size-lg="2">1</ion-col>
            <ion-col size="6" size-md="4" size-lg="2">2</ion-col>
            <ion-col size="6" size-md="4" size-lg="2">3</ion-col>
            <ion-col size="6" size-md="4" size-lg="2">4</ion-col>
            <ion-col size="6" size-md="4" size-lg="2">5</ion-col>
            <ion-col size="6" size-md="4" size-lg="2">6</ion-col>
          </ion-row>
        </ion-grid>
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
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <b>Stacked for xs breakpoint, equal width for sm and up</b>
  <ion-grid>
    <ion-row>
      <ion-col size="12" size-sm="3">1</ion-col>
      <ion-col size="12" size-sm="3">2</ion-col>
      <ion-col size="12" size-sm="3">3</ion-col>
      <ion-col size="12" size-sm="3">4</ion-col>
    </ion-row>
  </ion-grid>

  <b>Equal width until md breakpoint, last column takes full width for md and up</b>
  <ion-grid>
    <ion-row>
      <ion-col size-md="6">1</ion-col>
      <ion-col size-md="6">2</ion-col>
      <ion-col size-md="12">3</ion-col>
    </ion-row>
  </ion-grid>

  <b>2 per row until md breakpoint, 3 per row for md, equal width for lg and up</b>
  <ion-grid>
    <ion-row>
      <ion-col size="6" size-md="4" size-lg="2">1</ion-col>
      <ion-col size="6" size-md="4" size-lg="2">2</ion-col>
      <ion-col size="6" size-md="4" size-lg="2">3</ion-col>
      <ion-col size="6" size-md="4" size-lg="2">4</ion-col>
      <ion-col size="6" size-md="4" size-lg="2">5</ion-col>
      <ion-col size="6" size-md="4" size-lg="2">6</ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCol, IonGrid, IonRow } from '@ionic/vue';
<\/script>

<style scoped>
  ion-col {
    background-color: #135d54;
    border: solid 1px #fff;
    color: #fff;
    text-align: center;
  }
</style>`;

</script>

<style scoped>
  ion-col {
    background-color: #135d54;
    border: solid 1px #fff;
    color: #fff;
    text-align: center;
  }
</style>
