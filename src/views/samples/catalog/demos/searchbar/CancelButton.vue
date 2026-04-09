<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Searchbar / Cancel Button</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">showCancelButton プロパティでキャンセルボタンの表示タイミングを制御する例。</p>
      <ion-searchbar show-cancel-button="focus" placeholder="Show on Focus"></ion-searchbar>
        <ion-searchbar show-cancel-button="always" placeholder="Always Show"></ion-searchbar>
        <ion-searchbar show-cancel-button="never" placeholder="Never Show"></ion-searchbar>
        <ion-searchbar
          show-cancel-button="always"
          cancel-button-text="Custom Cancel"
          :cancel-button-icon="trash"
          placeholder="Custom Cancel Button"
        ></ion-searchbar>
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
  IonSearchbar,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { trash } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-searchbar show-cancel-button="focus" placeholder="Show on Focus"></ion-searchbar>
  <ion-searchbar show-cancel-button="always" placeholder="Always Show"></ion-searchbar>
  <ion-searchbar show-cancel-button="never" placeholder="Never Show"></ion-searchbar>
  <ion-searchbar
    show-cancel-button="always"
    cancel-button-text="Custom Cancel"
    :cancel-button-icon="trash"
    placeholder="Custom Cancel Button"
  ></ion-searchbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonSearchbar } from '@ionic/vue';
  import { trash } from 'ionicons/icons';
<\/script>`;

</script>
