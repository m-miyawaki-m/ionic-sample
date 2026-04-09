<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Datetime / HighlightedDates Callback</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">コールバック関数を使って動的に日付をハイライト表示する例。</p>
      <ion-datetime presentation="date" :highlighted-dates="highlightedDates"></ion-datetime>
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
  <ion-datetime presentation="date" :highlighted-dates="highlightedDates"></ion-datetime>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonDatetime } from '@ionic/vue';

  const highlightedDates = (isoString) => {
    const date = new Date(isoString);
    const utcDay = date.getUTCDate();

    if (utcDay % 5 === 0) {
      return {
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
        border: '1px solid #e91e63',
      };
    }

    if (utcDay % 3 === 0) {
      return {
        textColor: 'var(--ion-color-secondary)',
        backgroundColor: 'rgb(var(--ion-color-secondary-rgb), 0.18)',
        border: '1px solid var(--ion-color-secondary-shade)',
      };
    }

    return undefined;
  };
<\/script>`;


  const highlightedDates = (isoString) => {
    const date = new Date(isoString);
    const utcDay = date.getUTCDate();

    if (utcDay % 5 === 0) {
      return {
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
        border: '1px solid #e91e63',
      };
    }

    if (utcDay % 3 === 0) {
      return {
        textColor: 'var(--ion-color-secondary)',
        backgroundColor: 'rgb(var(--ion-color-secondary-rgb), 0.18)',
        border: '1px solid var(--ion-color-secondary-shade)',
      };
    }

    return undefined;
  };
</script>
