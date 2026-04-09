<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Popover / Presenting Inline Trigger</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">trigger 属性を使い、ボタンクリックでインラインポップオーバーを開くパターン。</p>
      <ion-button id="click-trigger">Left-Click Me</ion-button>
        <ion-popover trigger="click-trigger" trigger-action="click">
          <ion-content class="ion-padding">Hello World!</ion-content>
        </ion-popover>
      
        <ion-button id="context-menu-trigger">Right-Click Me</ion-button>
        <ion-popover trigger="context-menu-trigger" trigger-action="context-menu">
          <ion-content class="ion-padding">Hello World!</ion-content>
        </ion-popover>
      
        <ion-button id="hover-trigger">Hover Over Me</ion-button>
        <ion-popover trigger="hover-trigger" trigger-action="hover">
          <ion-content class="ion-padding">Hello World!</ion-content>
        </ion-popover>
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
  <ion-button id="click-trigger">Left-Click Me</ion-button>
  <ion-popover trigger="click-trigger" trigger-action="click">
    <ion-content class="ion-padding">Hello World!</ion-content>
  </ion-popover>

  <ion-button id="context-menu-trigger">Right-Click Me</ion-button>
  <ion-popover trigger="context-menu-trigger" trigger-action="context-menu">
    <ion-content class="ion-padding">Hello World!</ion-content>
  </ion-popover>

  <ion-button id="hover-trigger">Hover Over Me</ion-button>
  <ion-popover trigger="hover-trigger" trigger-action="hover">
    <ion-content class="ion-padding">Hello World!</ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonContent, IonPopover } from '@ionic/vue';
<\/script>`;

</script>
