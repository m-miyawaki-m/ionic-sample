<template>
  <ion-page>
    <ion-header id="header">
        <ion-toolbar>
          <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
          <ion-title>Toast / Position Anchor</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">positionAnchor プロパティでトーストの表示位置を特定要素に相対的に調整する例。</p>
        <ion-button id="headerAnchor">Anchor to Header</ion-button>
        <ion-button id="footerAnchor">Anchor to Footer</ion-button>
    
        <ion-toast
          trigger="headerAnchor"
          position="top"
          position-anchor="header"
          message="Hello World!"
          :duration="2000"
        ></ion-toast>
        <ion-toast
          trigger="footerAnchor"
          position="bottom"
          position-anchor="footer"
          message="Hello World!"
          :duration="2000"
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
          <ion-title>Footer</ion-title>
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
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-header id="header">
    <ion-toolbar>
      <ion-title>Header</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-button id="headerAnchor">Anchor to Header</ion-button>
    <ion-button id="footerAnchor">Anchor to Footer</ion-button>

    <ion-toast
      trigger="headerAnchor"
      position="top"
      position-anchor="header"
      message="Hello World!"
      :duration="2000"
    ></ion-toast>
    <ion-toast
      trigger="footerAnchor"
      position="bottom"
      position-anchor="footer"
      message="Hello World!"
      :duration="2000"
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
  import { IonButton, IonContent, IonFooter, IonHeader, IonTitle, IonToast, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
