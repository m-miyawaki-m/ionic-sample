<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Grid / Push Pull</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">push / pull プロパティでカラムの視覚的な順序を入れ替える例。</p>
      <b
          >Column 1 has <code>push</code> set to <code>"4"</code> and column 2 has <code>pull</code> set to
          <code>"4"</code></b
        >
        <ion-grid>
          <ion-row>
            <ion-col push="4">1</ion-col>
            <ion-col pull="4">2</ion-col>
            <ion-col>3</ion-col>
          </ion-row>
        </ion-grid>
      
        <b
          >Column 2 has <code>push</code> set to <code>"4"</code> and column 3 & 4 have <code>pull</code> set to
          <code>"2"</code></b
        >
        <ion-grid>
          <ion-row>
            <ion-col>1</ion-col>
            <ion-col push="4">2</ion-col>
            <ion-col pull="2">3</ion-col>
            <ion-col pull="2">4</ion-col>
            <ion-col>5</ion-col>
            <ion-col>6</ion-col>
          </ion-row>
        </ion-grid>
      
        <b
          >Column 1 has <code>push</code> set to <code>"3"</code> and column 2 has <code>pull</code> set to
          <code>"9"</code></b
        >
        <ion-grid>
          <ion-row>
            <ion-col size="9" push="3">1</ion-col>
            <ion-col size="3" pull="9">2</ion-col>
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
  <b
    >Column 1 has <code>push</code> set to <code>"4"</code> and column 2 has <code>pull</code> set to
    <code>"4"</code></b
  >
  <ion-grid>
    <ion-row>
      <ion-col push="4">1</ion-col>
      <ion-col pull="4">2</ion-col>
      <ion-col>3</ion-col>
    </ion-row>
  </ion-grid>

  <b
    >Column 2 has <code>push</code> set to <code>"4"</code> and column 3 & 4 have <code>pull</code> set to
    <code>"2"</code></b
  >
  <ion-grid>
    <ion-row>
      <ion-col>1</ion-col>
      <ion-col push="4">2</ion-col>
      <ion-col pull="2">3</ion-col>
      <ion-col pull="2">4</ion-col>
      <ion-col>5</ion-col>
      <ion-col>6</ion-col>
    </ion-row>
  </ion-grid>

  <b
    >Column 1 has <code>push</code> set to <code>"3"</code> and column 2 has <code>pull</code> set to
    <code>"9"</code></b
  >
  <ion-grid>
    <ion-row>
      <ion-col size="9" push="3">1</ion-col>
      <ion-col size="3" pull="9">2</ion-col>
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
