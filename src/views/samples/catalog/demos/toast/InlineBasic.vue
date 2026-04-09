<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Toast / Inline Basic</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">trigger 属性を使い、ボタンクリックでインライントーストを表示する例。</p>
        <ion-button id="open-toast" expand="block">Open</ion-button>
        <p>This toast example uses triggers to automatically open a toast when the button is clicked.</p>
        <ion-toast trigger="open-toast" message="This toast will disappear after 5 seconds" :duration="5000"></ion-toast>
      
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

const sourceCode = `<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inline Toast</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-button id="open-toast" expand="block">Open</ion-button>
    <p>This toast example uses triggers to automatically open a toast when the button is clicked.</p>
    <ion-toast trigger="open-toast" message="This toast will disappear after 5 seconds" :duration="5000"></ion-toast>
  </ion-content>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonHeader, IonContent, IonToolbar, IonTitle, IonToast } from '@ionic/vue';
<\/script>`;

</script>
