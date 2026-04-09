<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Grid / Size Auto</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">size="auto" でカラム幅をコンテンツの幅に自動調整する例。</p>
      <b>Column 1 has <code>size</code> set to <code>"auto"</code></b>
        <ion-grid>
          <ion-row>
            <ion-col size="auto">1</ion-col>
            <ion-col>2</ion-col>
            <ion-col>3</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>Column 3 contains an input and has <code>size</code> set to <code>"auto"</code></b>
        <ion-grid>
          <ion-row>
            <ion-col>1</ion-col>
            <ion-col>2</ion-col>
            <ion-col size="auto">
              <ion-input placeholder="3"></ion-input>
            </ion-col>
            <ion-col>4</ion-col>
            <ion-col>5</ion-col>
            <ion-col>6</ion-col>
          </ion-row>
        </ion-grid>
      
        <b>Column 2 has <code>size</code> set to <code>"auto"</code> and a defined width</b>
        <ion-grid>
          <ion-row>
            <ion-col>1</ion-col>
            <ion-col size="auto">
              <div style="width: 150px">2</div>
            </ion-col>
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
  IonInput,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <b>Column 1 has <code>size</code> set to <code>"auto"</code></b>
  <ion-grid>
    <ion-row>
      <ion-col size="auto">1</ion-col>
      <ion-col>2</ion-col>
      <ion-col>3</ion-col>
    </ion-row>
  </ion-grid>

  <b>Column 3 contains an input and has <code>size</code> set to <code>"auto"</code></b>
  <ion-grid>
    <ion-row>
      <ion-col>1</ion-col>
      <ion-col>2</ion-col>
      <ion-col size="auto">
        <ion-input placeholder="3"></ion-input>
      </ion-col>
      <ion-col>4</ion-col>
      <ion-col>5</ion-col>
      <ion-col>6</ion-col>
    </ion-row>
  </ion-grid>

  <b>Column 2 has <code>size</code> set to <code>"auto"</code> and a defined width</b>
  <ion-grid>
    <ion-row>
      <ion-col>1</ion-col>
      <ion-col size="auto">
        <div style="width: 150px">2</div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonCol, IonGrid, IonInput, IonRow } from '@ionic/vue';
<\/script>

<style scoped>
  ion-col {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    background-color: #135d54;
    border: solid 1px #fff;
    color: #fff;
  }
</style>`;

</script>

<style scoped>
  ion-col {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    background-color: #135d54;
    border: solid 1px #fff;
    color: #fff;
  }
</style>
