<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Toast / Inline Is Open</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">isOpen プロパティを使ってトーストの表示/非表示をリアクティブに制御する例。</p>
        <ion-button expand="block" @click="setOpen(true)">Open</ion-button>
        <ion-toast
          :is-open="isOpen"
          message="This toast will close in 5 seconds"
          :duration="5000"
          @didDismiss="setOpen(false)"
        ></ion-toast>
      
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
  IonToast,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inline Toast</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button expand="block" @click="setOpen(true)">Open</ion-button>
    <ion-toast
      :is-open="isOpen"
      message="This toast will close in 5 seconds"
      :duration="5000"
      @didDismiss="setOpen(false)"
    ></ion-toast>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonHeader, IonToolbar, IonContent, IonTitle, IonToast } from '@ionic/vue';
  import { ref } from 'vue';

  const isOpen = ref(false);
  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
<\/script>`;


  const isOpen = ref(false);
  const setOpen = (state: boolean) => {
    isOpen.value = state;
  };
</script>
