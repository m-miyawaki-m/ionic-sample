<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Datetime / Format Options</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">Intl.DateTimeFormat オプションを使って日付表示フォーマットをカスタマイズする例。</p>
      <ion-datetime value="2023-11-02T01:22:00" :format-options="formatOptions">
          <span slot="title">Select Date</span>
        </ion-datetime>
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
  <ion-datetime value="2023-11-02T01:22:00" :format-options="formatOptions">
    <span slot="title">Select Date</span>
  </ion-datetime>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonDatetime } from '@ionic/vue';

  const formatOptions = {
    time: { hour: '2-digit', minute: '2-digit' },
    date: { day: '2-digit', month: 'long' },
  };
<\/script>`;


  const formatOptions = {
    time: { hour: '2-digit', minute: '2-digit' },
    date: { day: '2-digit', month: 'long' },
  };
</script>
