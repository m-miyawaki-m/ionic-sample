<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Action Sheet / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったアクションシートのスタイルカスタマイズ例。</p>
      <ion-button id="open-action-sheet">Open</ion-button>
        <ion-action-sheet
          trigger="open-action-sheet"
          class="my-custom-class"
          header="Example header"
          sub-header="Example subheader"
          :buttons="actionSheetButtons"
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
  ion-action-sheet.my-custom-class {
    --background: #f58840;
    --backdrop-opacity: 0.6;
    --button-background-selected: #e97223;
    --button-color: #000000;
    --color: #fff;
    /* role: "destructive" button iOS styling override */
    --ion-color-danger: #000000;
  }
</style>

<template>
  <ion-button id="open-action-sheet">Open</ion-button>
  <ion-action-sheet
    trigger="open-action-sheet"
    class="my-custom-class"
    header="Example header"
    sub-header="Example subheader"
    :buttons="actionSheetButtons"
  ></ion-action-sheet>
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
</script>

<style>
  ion-action-sheet.my-custom-class {
    --background: #f58840;
    --backdrop-opacity: 0.6;
    --button-background-selected: #e97223;
    --button-color: #000000;
    --color: #fff;
    /* role: "destructive" button iOS styling override */
    --ion-color-danger: #000000;
  }
</style>
