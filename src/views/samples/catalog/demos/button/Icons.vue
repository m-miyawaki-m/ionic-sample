<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Button / Icons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ボタンにアイコンを組み合わせる例。icon-only / icon-start / icon-end のレイアウトを確認できる。</p>
      <ion-button size="small">
          <ion-icon slot="icon-only" :ios="logoApple" :md="settingsSharp"></ion-icon>
        </ion-button>
      
        <ion-button>
          <ion-icon slot="icon-only" :ios="logoApple" :md="settingsSharp"></ion-icon>
        </ion-button>
      
        <ion-button size="large">
          <ion-icon slot="icon-only" :ios="logoApple" :md="settingsSharp"></ion-icon>
        </ion-button>
      
        <ion-button size="small">
          <ion-icon slot="start" :icon="star"></ion-icon>
          Left Icon
        </ion-button>
      
        <ion-button>
          <ion-icon slot="start" :icon="star"></ion-icon>
          Left Icon
        </ion-button>
      
        <ion-button size="large">
          <ion-icon slot="start" :icon="star"></ion-icon>
          Left Icon
        </ion-button>
      
        <ion-button size="small">
          Right Icon
          <ion-icon slot="end" :icon="heart"></ion-icon>
        </ion-button>
      
        <ion-button>
          Right Icon
          <ion-icon slot="end" :icon="heart"></ion-icon>
        </ion-button>
      
        <ion-button size="large">
          Right Icon
          <ion-icon slot="end" :icon="heart"></ion-icon>
        </ion-button>
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
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { heart, logoApple, settingsSharp, star } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-button size="small">
    <ion-icon slot="icon-only" :ios="logoApple" :md="settingsSharp"></ion-icon>
  </ion-button>

  <ion-button>
    <ion-icon slot="icon-only" :ios="logoApple" :md="settingsSharp"></ion-icon>
  </ion-button>

  <ion-button size="large">
    <ion-icon slot="icon-only" :ios="logoApple" :md="settingsSharp"></ion-icon>
  </ion-button>

  <ion-button size="small">
    <ion-icon slot="start" :icon="star"></ion-icon>
    Left Icon
  </ion-button>

  <ion-button>
    <ion-icon slot="start" :icon="star"></ion-icon>
    Left Icon
  </ion-button>

  <ion-button size="large">
    <ion-icon slot="start" :icon="star"></ion-icon>
    Left Icon
  </ion-button>

  <ion-button size="small">
    Right Icon
    <ion-icon slot="end" :icon="heart"></ion-icon>
  </ion-button>

  <ion-button>
    Right Icon
    <ion-icon slot="end" :icon="heart"></ion-icon>
  </ion-button>

  <ion-button size="large">
    Right Icon
    <ion-icon slot="end" :icon="heart"></ion-icon>
  </ion-button>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonIcon } from '@ionic/vue';
  import { heart, logoApple, settingsSharp, star } from 'ionicons/icons';
<\/script>`;

</script>
