<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Modal / Performance Mount</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">keepContentsMounted プロパティでモーダルの内容を事前マウントしてパフォーマンスを改善する例。</p>
        <ion-button id="open-modal" expand="block">Open Modal</ion-button>
        <ion-modal ref="modal" :keep-contents-mounted="true" trigger="open-modal">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button @click="close()">Cancel</ion-button>
              </ion-buttons>
              <ion-title>Modal</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding"> This content was mounted as soon as the modal was created. </ion-content>
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
      <ion-title>Example</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button id="open-modal" expand="block">Open Modal</ion-button>
    <ion-modal ref="modal" :keep-contents-mounted="true" trigger="open-modal">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="close()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Modal</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"> This content was mounted as soon as the modal was created. </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle } from '@ionic/vue';
  import { ref } from 'vue';

  const modal = ref();

  const close = () => modal.value.$el.dismiss();
<\/script>`;


  const modal = ref();

  const close = () => modal.value.$el.dismiss();
</script>
