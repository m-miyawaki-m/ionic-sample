<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Action Sheet / Inline IsOpen</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">isOpen プロパティを使ってアクションシートの表示/非表示をリアクティブに制御する例。</p>
      <ion-button @click="setOpen(true)">Open</ion-button>
        <ion-action-sheet
          :is-open="isOpen"
          header="Actions"
          :buttons="actionSheetButtons"
          @didDismiss="setOpen(false)"
        ></ion-action-sheet>
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
  import { ref } from 'vue';
  import { 
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button @click="setOpen(true)">Open</ion-button>
  <ion-action-sheet
    :is-open="isOpen"
    header="Actions"
    :buttons="actionSheetButtons"
    @didDismiss="setOpen(false)"
  ></ion-action-sheet>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { IonActionSheet, IonButton } from '@ionic/vue';

  const isOpen = ref(false);
  const actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
<\/script>`;


  const isOpen = ref(false);
  const actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
</script>
