<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Datetime / HighlightedDates Array</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">特定の日付を配列で指定してカレンダー上でハイライト表示する例。</p>
      <ion-datetime presentation="date" value="2023-01-01" :highlighted-dates="highlightedDates"></ion-datetime>
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
  <ion-datetime presentation="date" value="2023-01-01" :highlighted-dates="highlightedDates"></ion-datetime>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonDatetime } from '@ionic/vue';

  const highlightedDates = [
    {
      date: '2023-01-05',
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
      border: '1px solid #e91e63',
    },
    {
      date: '2023-01-10',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
      border: '1px solid #4caf50',
    },
    {
      date: '2023-01-20',
      textColor: 'var(--ion-color-secondary)',
      backgroundColor: 'rgb(var(--ion-color-secondary-rgb), 0.18)',
      border: '1px solid var(--ion-color-secondary-shade)',
    },
    {
      date: '2023-01-23',
      textColor: 'rgb(68, 10, 184)',
      backgroundColor: 'rgb(211, 200, 229)',
      border: '1px solid rgb(103, 58, 183)',
    },
  ];
<\/script>`;


  const highlightedDates = [
    {
      date: '2023-01-05',
      textColor: '#800080',
      backgroundColor: '#ffc0cb',
      border: '1px solid #e91e63',
    },
    {
      date: '2023-01-10',
      textColor: '#09721b',
      backgroundColor: '#c8e5d0',
      border: '1px solid #4caf50',
    },
    {
      date: '2023-01-20',
      textColor: 'var(--ion-color-secondary)',
      backgroundColor: 'rgb(var(--ion-color-secondary-rgb), 0.18)',
      border: '1px solid var(--ion-color-secondary-shade)',
    },
    {
      date: '2023-01-23',
      textColor: 'rgb(68, 10, 184)',
      backgroundColor: 'rgb(211, 200, 229)',
      border: '1px solid rgb(103, 58, 183)',
    },
  ];
</script>
