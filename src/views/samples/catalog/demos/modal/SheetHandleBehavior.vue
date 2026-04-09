<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Modal / Sheet Handle Behavior</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">シートモーダルのハンドル部分の動作をカスタマイズする例。</p>
        <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>
    
        <ion-modal
          trigger="open-modal"
          :initial-breakpoint="0.25"
          :breakpoints="[0, 0.25, 0.5, 0.75]"
          handle-behavior="cycle"
        >
          <ion-content class="ion-padding">
            <div class="ion-margin-top">
              <ion-label>Click the handle above to advance to the next breakpoint.</ion-label>
            </div>
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
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>App</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button id="open-modal" expand="block">Open Sheet Modal</ion-button>

    <ion-modal
      trigger="open-modal"
      :initial-breakpoint="0.25"
      :breakpoints="[0, 0.25, 0.5, 0.75]"
      handle-behavior="cycle"
    >
      <ion-content class="ion-padding">
        <div class="ion-margin-top">
          <ion-label>Click the handle above to advance to the next breakpoint.</ion-label>
        </div>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonLabel } from '@ionic/vue';
<\/script>`;

</script>
