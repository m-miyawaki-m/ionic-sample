<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Popover / Customization Positioning</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">side / alignment / arrow プロパティでポップオーバーの表示位置を詳細にカスタマイズする例。</p>
      <div class="container">
          <ion-button id="top-center">Side=Top, Alignment=Center</ion-button>
          <ion-popover trigger="top-center" side="top" alignment="center">
            <ion-content class="ion-padding">Hello World!</ion-content>
          </ion-popover>
      
          <ion-button id="bottom-start">Side=Bottom, Alignment=Start</ion-button>
          <ion-popover trigger="bottom-start" side="bottom" alignment="start">
            <ion-content class="ion-padding">Hello World!</ion-content>
          </ion-popover>
      
          <ion-button id="left-start">Side=Left, Alignment=Start</ion-button>
          <ion-popover trigger="left-start" side="left" alignment="start">
            <ion-content class="ion-padding">Hello World!</ion-content>
          </ion-popover>
      
          <ion-button id="right-end">Side=Right, Alignment=End</ion-button>
          <ion-popover trigger="right-end" side="right" alignment="end">
            <ion-content class="ion-padding">Hello World!</ion-content>
          </ion-popover>
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
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <div class="container">
    <ion-button id="top-center">Side=Top, Alignment=Center</ion-button>
    <ion-popover trigger="top-center" side="top" alignment="center">
      <ion-content class="ion-padding">Hello World!</ion-content>
    </ion-popover>

    <ion-button id="bottom-start">Side=Bottom, Alignment=Start</ion-button>
    <ion-popover trigger="bottom-start" side="bottom" alignment="start">
      <ion-content class="ion-padding">Hello World!</ion-content>
    </ion-popover>

    <ion-button id="left-start">Side=Left, Alignment=Start</ion-button>
    <ion-popover trigger="left-start" side="left" alignment="start">
      <ion-content class="ion-padding">Hello World!</ion-content>
    </ion-popover>

    <ion-button id="right-end">Side=Right, Alignment=End</ion-button>
    <ion-popover trigger="right-end" side="right" alignment="end">
      <ion-content class="ion-padding">Hello World!</ion-content>
    </ion-popover>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonContent, IonPopover } from '@ionic/vue';
<\/script>

<style>
  ion-popover {
    --width: 80px;
  }

  .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 80px;
  }
</style>`;

</script>

<style>
  ion-popover {
    --width: 80px;
  }

  .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 80px;
  }
</style>
