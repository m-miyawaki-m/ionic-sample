<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Datetime / Styling Calendar Header</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS を使ってカレンダーヘッダーのスタイルをカスタマイズする例。</p>
      <ion-datetime presentation="date"></ion-datetime>
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
  IonDatetime,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-datetime presentation="date"></ion-datetime>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonDatetime } from '@ionic/vue';
<\/script>

<style scoped>
  /*
   * Custom Datetime Calendar Header Part
   * -------------------------------------------
   */
  ion-datetime::part(calendar-header) {
    background-color: orange;
  }

  ion-datetime::part(month-year-button) {
    background-color: lightblue;
  }

  ion-datetime::part(navigation-button) {
    background-color: firebrick;
  }

  ion-datetime::part(previous-button) {
    color: white;
  }

  ion-datetime::part(next-button) {
    color: black;
  }

  ion-datetime::part(calendar-days-of-week) {
    background-color: #9ad162;
    color: white;
  }
</style>`;

</script>

<style scoped>
  /*
   * Custom Datetime Calendar Header Part
   * -------------------------------------------
   */
  ion-datetime::part(calendar-header) {
    background-color: orange;
  }

  ion-datetime::part(month-year-button) {
    background-color: lightblue;
  }

  ion-datetime::part(navigation-button) {
    background-color: firebrick;
  }

  ion-datetime::part(previous-button) {
    color: white;
  }

  ion-datetime::part(next-button) {
    color: black;
  }

  ion-datetime::part(calendar-days-of-week) {
    background-color: #9ad162;
    color: white;
  }
</style>
