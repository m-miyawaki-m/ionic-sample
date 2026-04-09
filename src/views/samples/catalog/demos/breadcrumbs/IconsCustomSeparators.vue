<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Breadcrumbs / Icons Custom Separators</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">区切り文字（セパレーター）をカスタムアイコンに変更する例。</p>
      <ion-breadcrumbs>
          <ion-breadcrumb href="#home">
            Home
            <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
          </ion-breadcrumb>
          <ion-breadcrumb href="#electronics">
            Electronics
            <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
          </ion-breadcrumb>
          <ion-breadcrumb href="#cameras">
            Cameras
            <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
          </ion-breadcrumb>
          <ion-breadcrumb href="#film">
            Film
            <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
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
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { arrowForwardCircle } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-breadcrumbs>
    <ion-breadcrumb href="#home">
      Home
      <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
    </ion-breadcrumb>
    <ion-breadcrumb href="#electronics">
      Electronics
      <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
    </ion-breadcrumb>
    <ion-breadcrumb href="#cameras">
      Cameras
      <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
    </ion-breadcrumb>
    <ion-breadcrumb href="#film">
      Film
      <ion-icon slot="separator" :icon="arrowForwardCircle"></ion-icon>
    </ion-breadcrumb>
  </ion-breadcrumbs>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonBreadcrumb, IonBreadcrumbs, IonIcon } from '@ionic/vue';
  import { arrowForwardCircle } from 'ionicons/icons';
<\/script>`;

</script>
