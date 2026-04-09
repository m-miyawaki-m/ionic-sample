<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Breadcrumbs / Icons Icons On Items</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">各パンくずアイテムにアイコンを付ける例。start/end スロットを活用する。</p>
      <ion-label>Icons at Start</ion-label>
        <ion-breadcrumbs>
          <ion-breadcrumb href="#home">
            <ion-icon slot="start" :icon="home"></ion-icon>
            Home
          </ion-breadcrumb>
          <ion-breadcrumb href="#electronics">
            <ion-icon slot="start" :icon="flash"></ion-icon>
            Electronics
          </ion-breadcrumb>
          <ion-breadcrumb href="#cameras">
            <ion-icon slot="start" :icon="camera"></ion-icon>
            Cameras
          </ion-breadcrumb>
          <ion-breadcrumb href="#film">
            <ion-icon slot="start" :icon="film"></ion-icon>
            Film
          </ion-breadcrumb>
        </ion-breadcrumbs>
      
        <ion-label class="ion-margin-top">Icons at End</ion-label>
        <ion-breadcrumbs>
          <ion-breadcrumb href="#home">
            Home
            <ion-icon slot="end" :icon="home"></ion-icon>
          </ion-breadcrumb>
          <ion-breadcrumb href="#electronics">
            Electronics
            <ion-icon slot="end" :icon="flash"></ion-icon>
          </ion-breadcrumb>
          <ion-breadcrumb href="#cameras">
            Cameras
            <ion-icon slot="end" :icon="camera"></ion-icon>
          </ion-breadcrumb>
          <ion-breadcrumb href="#film">
            Film
            <ion-icon slot="end" :icon="film"></ion-icon>
          </ion-breadcrumb>
        </ion-breadcrumbs>
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
  IonBreadcrumb,
  IonBreadcrumbs,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { camera, film, flash, home } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-label>Icons at Start</ion-label>
  <ion-breadcrumbs>
    <ion-breadcrumb href="#home">
      <ion-icon slot="start" :icon="home"></ion-icon>
      Home
    </ion-breadcrumb>
    <ion-breadcrumb href="#electronics">
      <ion-icon slot="start" :icon="flash"></ion-icon>
      Electronics
    </ion-breadcrumb>
    <ion-breadcrumb href="#cameras">
      <ion-icon slot="start" :icon="camera"></ion-icon>
      Cameras
    </ion-breadcrumb>
    <ion-breadcrumb href="#film">
      <ion-icon slot="start" :icon="film"></ion-icon>
      Film
    </ion-breadcrumb>
  </ion-breadcrumbs>

  <ion-label class="ion-margin-top">Icons at End</ion-label>
  <ion-breadcrumbs>
    <ion-breadcrumb href="#home">
      Home
      <ion-icon slot="end" :icon="home"></ion-icon>
    </ion-breadcrumb>
    <ion-breadcrumb href="#electronics">
      Electronics
      <ion-icon slot="end" :icon="flash"></ion-icon>
    </ion-breadcrumb>
    <ion-breadcrumb href="#cameras">
      Cameras
      <ion-icon slot="end" :icon="camera"></ion-icon>
    </ion-breadcrumb>
    <ion-breadcrumb href="#film">
      Film
      <ion-icon slot="end" :icon="film"></ion-icon>
    </ion-breadcrumb>
  </ion-breadcrumbs>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBreadcrumb, IonBreadcrumbs, IonIcon, IonLabel } from '@ionic/vue';
  import { camera, film, flash, home } from 'ionicons/icons';
<\/script>`;

</script>
