<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Toggle / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">トグルスイッチ（ion-toggle）の基本的な使い方。オン/オフの切り替えを確認できる。</p>
      <ion-toggle>Default Toggle</ion-toggle><br /><br />
        <ion-toggle :checked="true">Checked Toggle</ion-toggle><br /><br />
        <ion-toggle :disabled="true">Disabled Toggle</ion-toggle><br /><br />
        <ion-toggle :checked="true" :disabled="true">Disabled Checked Toggle</ion-toggle>
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
  <ion-toggle>Default Toggle</ion-toggle><br /><br />
  <ion-toggle :checked="true">Checked Toggle</ion-toggle><br /><br />
  <ion-toggle :disabled="true">Disabled Toggle</ion-toggle><br /><br />
  <ion-toggle :checked="true" :disabled="true">Disabled Checked Toggle</ion-toggle>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonToggle } from '@ionic/vue';
<\/script>`;

</script>
