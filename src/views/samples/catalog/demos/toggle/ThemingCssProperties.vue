<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toggle / Theming Css Properties</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">CSS カスタムプロパティを使ったトグルのスタイルカスタマイズ例。</p>
      <ion-toggle aria-label="Enable Notifications"></ion-toggle>
        <ion-toggle :checked="true" aria-label="Enable Notifications"></ion-toggle>
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
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-toggle aria-label="Enable Notifications"></ion-toggle>
  <ion-toggle :checked="true" aria-label="Enable Notifications"></ion-toggle>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonToggle } from '@ionic/vue';
<\/script>

<style scoped>
  ion-toggle {
    padding: 12px;

    --track-background: #ddd;
    --track-background-checked: #ddd;

    --handle-background: #eb7769;
    --handle-background-checked: #95c34e;

    --handle-width: 25px;
    --handle-height: 27px;
    --handle-max-height: auto;
    --handle-spacing: 6px;

    --handle-border-radius: 4px;
    --handle-box-shadow: none;
  }

  ion-toggle::part(track) {
    height: 10px;
    width: 65px;

    /* Required for iOS handle to overflow the height of the track */
    overflow: visible;
  }
</style>`;

</script>

<style scoped>
  ion-toggle {
    padding: 12px;

    --track-background: #ddd;
    --track-background-checked: #ddd;

    --handle-background: #eb7769;
    --handle-background-checked: #95c34e;

    --handle-width: 25px;
    --handle-height: 27px;
    --handle-max-height: auto;
    --handle-spacing: 6px;

    --handle-border-radius: 4px;
    --handle-box-shadow: none;
  }

  ion-toggle::part(track) {
    height: 10px;
    width: 65px;

    /* Required for iOS handle to overflow the height of the track */
    overflow: visible;
  }
</style>
