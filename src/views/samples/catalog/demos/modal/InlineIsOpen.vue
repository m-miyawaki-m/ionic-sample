<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Modal / Inline Is Open</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">isOpen プロパティを使ってモーダルの表示/非表示をリアクティブに制御する例。</p>
        <ion-button expand="block" @click="setOpen(true)">Open</ion-button>
    
        <ion-modal :is-open="isOpen">
          <ion-header>
            <ion-toolbar>
              <ion-title>Modal</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="setOpen(false)">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
              reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
              dicta.
            </p>
          </ion-content>
        </ion-modal>
      
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
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { ref } from 'vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inline Modal</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button expand="block" @click="setOpen(true)">Open</ion-button>

    <ion-modal :is-open="isOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Modal</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setOpen(false)">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum quidem recusandae ducimus quos
          reprehenderit. Veniam, molestias quos, dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
          dicta.
        </p>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButtons, IonButton, IonModal, IonHeader, IonToolbar, IonContent, IonTitle } from '@ionic/vue';
  import { ref } from 'vue';

  const isOpen = ref(false);

  const setOpen = (open: boolean) => (isOpen.value = open);
<\/script>`;


  const isOpen = ref(false);

  const setOpen = (open: boolean) => (isOpen.value = open);
</script>
