<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Action Sheet / Role Info On Dismiss</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">各ボタンに role を設定し、dismissal 時にどのボタンが押されたか判定する例。</p>
      <div class="container">
          <ion-button id="open-action-sheet">Open</ion-button>
          <ion-action-sheet
            trigger="open-action-sheet"
            header="Example header"
            sub-header="Example subheader"
            :buttons="actionSheetButtons"
            @didDismiss="logResult($event)"
          ></ion-action-sheet>
        </div>
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

const sourceCode = `<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }
</style>

<template>
  <div class="container">
    <ion-button id="open-action-sheet">Open</ion-button>
    <ion-action-sheet
      trigger="open-action-sheet"
      header="Example header"
      sub-header="Example subheader"
      :buttons="actionSheetButtons"
      @didDismiss="logResult($event)"
    ></ion-action-sheet>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonActionSheet, IonButton } from '@ionic/vue';

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

  const logResult = (event: CustomEvent) => {
    console.log(JSON.stringify(event.detail, null, 2));
  };
<\/script>`;


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

  const logResult = (event: CustomEvent) => {
    console.log(JSON.stringify(event.detail, null, 2));
  };
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }
</style>
