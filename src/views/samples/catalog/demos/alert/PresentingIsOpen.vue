<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Alert / Presenting IsOpen</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">isOpen プロパティを使ってアラートの表示/非表示をリアクティブに制御する例。</p>
      <ion-button @click="setOpen(true)">Click Me</ion-button>
        <ion-alert
          :is-open="isOpen"
          header="A Short Title Is Best"
          sub-header="A Sub Header Is Optional"
          message="A message should be a short, complete sentence."
          :buttons="alertButtons"
          @didDismiss="setOpen(false)"
        ></ion-alert>
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
  IonAlert,
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
  <ion-button @click="setOpen(true)">Click Me</ion-button>
  <ion-alert
    :is-open="isOpen"
    header="A Short Title Is Best"
    sub-header="A Sub Header Is Optional"
    message="A message should be a short, complete sentence."
    :buttons="alertButtons"
    @didDismiss="setOpen(false)"
  ></ion-alert>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { ref } from 'vue';
  import { IonAlert, IonButton } from '@ionic/vue';

  const isOpen = ref(false);
  const alertButtons = ['Action'];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
<\/script>`;


  const isOpen = ref(false);
  const alertButtons = ['Action'];

  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
</script>
