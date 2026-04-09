<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Datetime / Styling Calendar Days</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS を使ってカレンダーの日付セルのスタイルをカスタマイズする例。</p>
      <ion-datetime presentation="date" :value="datetime"></ion-datetime>
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
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-datetime presentation="date" :value="datetime"></ion-datetime>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonDatetime } from '@ionic/vue';
  import { ref } from 'vue';

  let datetime = ref('');

  const date = new Date();

  // Set the value of the datetime to 2 days
  // before the current day
  let dayChange = -2;

  // If the day we are going to set the value to
  // is in the previous month then set the day 2 days
  // later instead so it remains in the same month
  if (date.getDate() + dayChange <= 0) {
    dayChange = -dayChange;
  }

  // Set the value of the datetime to the day
  // calculated above
  date.setDate(date.getDate() + dayChange);
  datetime = date.toISOString();
<\/script>

<style scoped>
  /*
  * Custom Datetime Day Parts
  * -------------------------------------------
  */

  ion-datetime::part(calendar-day) {
    color: #da5296;
  }

  ion-datetime::part(calendar-day today) {
    color: #8462d1;
  }

  ion-datetime::part(calendar-day):focus {
    background-color: rgb(154 209 98 / 0.2);
    box-shadow: 0px 0px 0px 4px rgb(154 209 98 / 0.2);
  }

  /*
  * Custom Material Design Datetime Day Parts
  * -------------------------------------------
  */

  ion-datetime.md::part(calendar-day active),
  ion-datetime.md::part(calendar-day active):focus {
    background-color: #9ad162;
    border-color: #9ad162;
    color: #fff;
  }

  ion-datetime.md::part(calendar-day today) {
    border-color: #8462d1;
  }

  /*
  * Custom iOS Datetime Day Parts
  * -------------------------------------------
  */

  ion-datetime.ios::part(calendar-day active),
  ion-datetime.ios::part(calendar-day active):focus {
    background-color: rgb(154 209 98 / 0.2);
    color: #9ad162;
  }
</style>`;


  let datetime = ref('');

  const date = new Date();

  // Set the value of the datetime to 2 days
  // before the current day
  let dayChange = -2;

  // If the day we are going to set the value to
  // is in the previous month then set the day 2 days
  // later instead so it remains in the same month
  if (date.getDate() + dayChange <= 0) {
    dayChange = -dayChange;
  }

  // Set the value of the datetime to the day
  // calculated above
  date.setDate(date.getDate() + dayChange);
  datetime = date.toISOString();
</script>

<style scoped>
  /*
  * Custom Datetime Day Parts
  * -------------------------------------------
  */

  ion-datetime::part(calendar-day) {
    color: #da5296;
  }

  ion-datetime::part(calendar-day today) {
    color: #8462d1;
  }

  ion-datetime::part(calendar-day):focus {
    background-color: rgb(154 209 98 / 0.2);
    box-shadow: 0px 0px 0px 4px rgb(154 209 98 / 0.2);
  }

  /*
  * Custom Material Design Datetime Day Parts
  * -------------------------------------------
  */

  ion-datetime.md::part(calendar-day active),
  ion-datetime.md::part(calendar-day active):focus {
    background-color: #9ad162;
    border-color: #9ad162;
    color: #fff;
  }

  ion-datetime.md::part(calendar-day today) {
    border-color: #8462d1;
  }

  /*
  * Custom iOS Datetime Day Parts
  * -------------------------------------------
  */

  ion-datetime.ios::part(calendar-day active),
  ion-datetime.ios::part(calendar-day active):focus {
    background-color: rgb(154 209 98 / 0.2);
    color: #9ad162;
  }
</style>
