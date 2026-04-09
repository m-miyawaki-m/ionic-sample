<template>
  <ion-page>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">swipeGesture プロパティでスワイプでトーストを閉じる操作を有効化する例。</p>
        <ion-button id="open-toast">Open Toast</ion-button>
        <ion-toast
          message="This toast can be swiped to dismiss"
          trigger="open-toast"
          swipe-gesture="vertical"
          position="bottom"
          position-anchor="footer"
        ></ion-toast>
      
    <div style="border-top:1px solid var(--ion-color-light-shade);margin-top:16px;padding-top:16px">
      <details>
        <summary style="cursor:pointer;color:var(--ion-color-medium);font-size:14px">Source</summary>
        <pre style="overflow-x:auto;background:var(--ion-color-light-tint);padding:12px;border-radius:8px;font-size:13px;margin-top:8px"><code>{{ sourceCode }}</code></pre>
      </details>
    </div>
    </ion-content>
      <ion-footer id="footer">
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Toast / Swipe Gesture</ion-title>
        </ion-toolbar>
      </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { 
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-content class="ion-padding">
    <ion-button id="open-toast">Open Toast</ion-button>
    <ion-toast
      message="This toast can be swiped to dismiss"
      trigger="open-toast"
      swipe-gesture="vertical"
      position="bottom"
      position-anchor="footer"
    ></ion-toast>
  </ion-content>
  <ion-footer id="footer">
    <ion-toolbar>
      <ion-title>Footer</ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonContent, IonFooter, IonTitle, IonToast, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
