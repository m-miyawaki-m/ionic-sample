<template>

  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
        <ion-title>Menu / Toggle</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-menu-toggle を使ってメニューの開閉をトグルする例。</p>
      <ion-menu-toggle>
        <ion-button>Click to close the menu</ion-button>
      </ion-menu-toggle>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-menu-toggle>
        <ion-button>Click to open the menu</ion-button>
      </ion-menu-toggle>
    
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
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu Content</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-menu-toggle>
        <ion-button>Click to close the menu</ion-button>
      </ion-menu-toggle>
    </ion-content>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-menu-toggle>
        <ion-button>Click to open the menu</ion-button>
      </ion-menu-toggle>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonContent, IonHeader, IonMenu, IonMenuToggle, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
