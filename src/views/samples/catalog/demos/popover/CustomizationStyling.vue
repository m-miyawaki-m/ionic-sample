<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Popover / Customization Styling</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティと Shadow Parts を使ったポップオーバーのスタイルカスタマイズ例。</p>
      <ion-button id="trigger-button">Click Me</ion-button>
        <ion-popover trigger="trigger-button">
          <ion-content>Hello Styled World!</ion-content>
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
  <ion-button id="trigger-button">Click Me</ion-button>
  <ion-popover trigger="trigger-button">
    <ion-content>Hello Styled World!</ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonPopover } from '@ionic/vue';
<\/script>

<style>
  ion-popover {
    --background: rgba(40, 173, 218, 0.6);
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
    --color: white;
    --width: 300px;
  }

  ion-popover ion-content {
    --background: rgba(40, 173, 218, 0.6);
  }

  ion-popover::part(backdrop) {
    background-color: rgb(6, 14, 106);
  }
</style>`;

</script>

<style>
  ion-popover {
    --background: rgba(40, 173, 218, 0.6);
    --backdrop-opacity: 0.6;
    --box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.6);
    --color: white;
    --width: 300px;
  }

  ion-popover ion-content {
    --background: rgba(40, 173, 218, 0.6);
  }

  ion-popover::part(backdrop) {
    background-color: rgb(6, 14, 106);
  }
</style>
