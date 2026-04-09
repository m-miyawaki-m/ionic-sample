<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Grid / Push Pull Responsive</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ブレークポイントごとにカラムの push / pull を変えるレスポンシブ設定の例。</p>
      <b>No change for xs breakpoint, push 1st column & pull 2nd column for sm and up</b>
        <ion-grid>
          <ion-row>
            <ion-col push-sm="6">1</ion-col>
            <ion-col pull-sm="6">2</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>No change for xs breakpoint, push middle columns & pull last column for md and up</b>
        <ion-grid>
          <ion-row>
            <ion-col>1</ion-col>
            <ion-col push-md="3">2</ion-col>
            <ion-col push-md="3">3</ion-col>
            <ion-col pull-md="6">4</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>Switch first and last 3 columns for xs breakpoints, reverse columns for lg and up</b>
        <ion-grid>
          <ion-row>
            <ion-col push="6" push-lg="10">1</ion-col>
            <ion-col push="6" push-lg="6">2</ion-col>
            <ion-col push="6" push-lg="2">3</ion-col>
            <ion-col pull="6" pull-lg="2">4</ion-col>
            <ion-col pull="6" pull-lg="6">5</ion-col>
            <ion-col pull="6" pull-lg="10">6</ion-col>
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
  <b>No change for xs breakpoint, push 1st column & pull 2nd column for sm and up</b>
  <ion-grid>
    <ion-row>
      <ion-col push-sm="6">1</ion-col>
      <ion-col pull-sm="6">2</ion-col>
    </ion-row>
  </ion-grid>

  <b>No change for xs breakpoint, push middle columns & pull last column for md and up</b>
  <ion-grid>
    <ion-row>
      <ion-col>1</ion-col>
      <ion-col push-md="3">2</ion-col>
      <ion-col push-md="3">3</ion-col>
      <ion-col pull-md="6">4</ion-col>
    </ion-row>
  </ion-grid>

  <b>Switch first and last 3 columns for xs breakpoints, reverse columns for lg and up</b>
  <ion-grid>
    <ion-row>
      <ion-col push="6" push-lg="10">1</ion-col>
      <ion-col push="6" push-lg="6">2</ion-col>
      <ion-col push="6" push-lg="2">3</ion-col>
      <ion-col pull="6" pull-lg="2">4</ion-col>
      <ion-col pull="6" pull-lg="6">5</ion-col>
      <ion-col pull="6" pull-lg="10">6</ion-col>
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
