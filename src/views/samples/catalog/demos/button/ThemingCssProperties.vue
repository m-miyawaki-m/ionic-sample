<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Button / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったボタンのスタイルカスタマイズ例。</p>
      <ion-button>Custom Button</ion-button>
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
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-button>Custom Button</ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton } from '@ionic/vue';
<\/script>

<style scoped>
  ion-button {
    --background: #93e9be;
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be;

    --color: blue;

    --border-radius: 0;
    --border-color: #000;
    --border-style: solid;
    --border-width: 1px;

    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

    --ripple-color: deeppink;

    --padding-top: 10px;
    --padding-bottom: 10px;
  }
</style>`;

</script>

<style scoped>
  ion-button {
    --background: #93e9be;
    --background-hover: #9ce0be;
    --background-activated: #88f4be;
    --background-focused: #88f4be;

    --color: blue;

    --border-radius: 0;
    --border-color: #000;
    --border-style: solid;
    --border-width: 1px;

    --box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);

    --ripple-color: deeppink;

    --padding-top: 10px;
    --padding-bottom: 10px;
  }
</style>
