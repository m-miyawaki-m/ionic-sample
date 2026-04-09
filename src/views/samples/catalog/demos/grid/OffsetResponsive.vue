<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Grid / Offset Responsive</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ブレークポイントごとにカラムのオフセットを変えるレスポンシブオフセットの例。</p>
      <b>No offset for xs breakpoint, offset 1st column for sm and up</b>
        <ion-grid>
          <ion-row>
            <ion-col offset-sm="2">1</ion-col>
            <ion-col>2</ion-col>
            <ion-col>3</ion-col>
            <ion-col>4</ion-col>
            <ion-col>5</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>No offset for xs breakpoint, offset last 3 columns for md and up</b>
        <ion-grid>
          <ion-row>
            <ion-col>1</ion-col>
            <ion-col offset-md="2">2</ion-col>
            <ion-col offset-md="2">3</ion-col>
            <ion-col offset-md="2">4</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>Offset all columns by 6 for xs breakpoint, offset by 4 for md, offset by 2 for lg and up</b>
        <ion-grid>
          <ion-row>
            <ion-col offset="6" offset-md="4" offset-lg="2">1</ion-col>
            <ion-col offset="6" offset-md="4" offset-lg="2">2</ion-col>
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
  <b>No offset for xs breakpoint, offset 1st column for sm and up</b>
  <ion-grid>
    <ion-row>
      <ion-col offset-sm="2">1</ion-col>
      <ion-col>2</ion-col>
      <ion-col>3</ion-col>
      <ion-col>4</ion-col>
      <ion-col>5</ion-col>
    </ion-row>
  </ion-grid>

  <b>No offset for xs breakpoint, offset last 3 columns for md and up</b>
  <ion-grid>
    <ion-row>
      <ion-col>1</ion-col>
      <ion-col offset-md="2">2</ion-col>
      <ion-col offset-md="2">3</ion-col>
      <ion-col offset-md="2">4</ion-col>
    </ion-row>
  </ion-grid>

  <b>Offset all columns by 6 for xs breakpoint, offset by 4 for md, offset by 2 for lg and up</b>
  <ion-grid>
    <ion-row>
      <ion-col offset="6" offset-md="4" offset-lg="2">1</ion-col>
      <ion-col offset="6" offset-md="4" offset-lg="2">2</ion-col>
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
