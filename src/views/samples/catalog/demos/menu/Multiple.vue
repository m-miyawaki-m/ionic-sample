<template>

  <ion-menu menu-id="first-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
        <ion-title>Menu / Multiple</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">複数のサイドメニューを同一ページに設定する例。左右両側にメニューを持つ UI を確認できる。</p>This is the first menu content.</ion-content>
  </ion-menu>

  <ion-menu menu-id="second-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Second Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the second menu content.</ion-content>
  </ion-menu>

  <ion-menu side="end" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>End Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the end menu content.</ion-content>
  </ion-menu>

  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Tap a button below to open a specific menu.</p>

      <ion-button expand="block" @click="openFirstMenu()">Open First Menu</ion-button>
      <ion-button expand="block" @click="openSecondMenu()">Open Second Menu</ion-button>
      <ion-button expand="block" @click="openEndMenu()">Open End Menu</ion-button>
    
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
  IonPage,
  IonTitle,
  IonToolbar,
  menuController,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-menu menu-id="first-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>First Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the first menu content.</ion-content>
  </ion-menu>

  <ion-menu menu-id="second-menu" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Second Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the second menu content.</ion-content>
  </ion-menu>

  <ion-menu side="end" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>End Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">This is the end menu content.</ion-content>
  </ion-menu>

  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Tap a button below to open a specific menu.</p>

      <ion-button expand="block" @click="openFirstMenu()">Open First Menu</ion-button>
      <ion-button expand="block" @click="openSecondMenu()">Open Second Menu</ion-button>
      <ion-button expand="block" @click="openEndMenu()">Open End Menu</ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonContent, IonHeader, IonMenu, IonPage, IonTitle, IonToolbar, menuController } from '@ionic/vue';

  const openFirstMenu = async () => {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    await menuController.open('first-menu');
  };

  const openSecondMenu = async () => {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    await menuController.open('second-menu');
  };

  const openEndMenu = async () => {
    /**
     * Open the menu by side
     * We can refer to the menu by side
     * here because only one "end" menu exists
     */
    await menuController.open('end');
  };
<\/script>`;


  const openFirstMenu = async () => {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    await menuController.open('first-menu');
  };

  const openSecondMenu = async () => {
    /**
     * Open the menu by menu-id
     * We refer to the menu using an ID
     * because multiple "start" menus exist.
     */
    await menuController.open('second-menu');
  };

  const openEndMenu = async () => {
    /**
     * Open the menu by side
     * We can refer to the menu by side
     * here because only one "end" menu exists
     */
    await menuController.open('end');
  };
</script>
