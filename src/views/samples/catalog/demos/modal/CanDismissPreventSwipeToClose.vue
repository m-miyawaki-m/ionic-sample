<template>

  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
        <ion-title>Modal / Can Dismiss Prevent Swipe To Close</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">スワイプによるモーダルのクローズを無効化する例。canDismiss と組み合わせた設定を確認できる。</p>
      <ion-button id="open-modal" expand="block">Open</ion-button>

      <ion-modal ref="modal" trigger="open-modal" :can-dismiss="canDismiss" :presenting-element="page?.$el">
        <ion-header>
          <ion-toolbar>
            <ion-title>Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="dismiss">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>
            To close this modal, please use the "Close" button provided. Note that swiping the modal will not dismiss
            it.
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
  <ion-page ref="page">
    <ion-header>
      <ion-toolbar>
        <ion-title>App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-button id="open-modal" expand="block">Open</ion-button>

      <ion-modal ref="modal" trigger="open-modal" :can-dismiss="canDismiss" :presenting-element="page?.$el">
        <ion-header>
          <ion-toolbar>
            <ion-title>Modal</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="dismiss">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <p>
            To close this modal, please use the "Close" button provided. Note that swiping the modal will not dismiss
            it.
          </p>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonPage } from '@ionic/vue';
  import { ref } from 'vue';

  const page = ref(null);
  const modal = ref(null);

  function dismiss() {
    modal.value.$el.dismiss();
  }

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
<\/script>`;


  const page = ref(null);
  const modal = ref(null);

  function dismiss() {
    modal.value.$el.dismiss();
  }

  async function canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
</script>
