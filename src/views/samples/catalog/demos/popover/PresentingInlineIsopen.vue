<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Popover / Presenting Inline Isopen</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">isOpen プロパティを使ってポップオーバーの表示/非表示をリアクティブに制御する例。</p>
      <ion-button @click="openPopover($event)">Click Me</ion-button>
        <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="popoverOpen = false">
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
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-button @click="openPopover($event)">Click Me</ion-button>
  <ion-popover :is-open="popoverOpen" :event="event" @didDismiss="popoverOpen = false">
    <ion-content class="ion-padding">Hello World!</ion-content>
  </ion-popover>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonContent, IonPopover } from '@ionic/vue';
  import { ref } from 'vue';

  const popoverOpen = ref(false);
  const event = ref(null);

  const openPopover = (e: Event) => {
    event.value = e;
    popoverOpen.value = true;
  };
<\/script>`;


  const popoverOpen = ref(false);
  const event = ref(null);

  const openPopover = (e: Event) => {
    event.value = e;
    popoverOpen.value = true;
  };
</script>
