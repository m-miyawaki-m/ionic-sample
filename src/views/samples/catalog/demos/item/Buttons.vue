<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Item / Buttons</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">ion-item 内にボタンを配置する例。アクションボタンを持つリスト項目を作る。</p>
      <ion-item>
          <ion-button slot="start"> Start </ion-button>
          <ion-label>Default Buttons</ion-label>
          <ion-button slot="end"> End </ion-button>
        </ion-item>
      
        <ion-item>
          <ion-button slot="start">
            Start
            <ion-icon :icon="home" slot="end"></ion-icon>
          </ion-button>
          <ion-label>Buttons with Icons</ion-label>
          <ion-button slot="end">
            <ion-icon :icon="star" slot="end"></ion-icon>
            End
          </ion-button>
        </ion-item>
      
        <ion-item>
          <ion-button slot="start">
            <ion-icon slot="icon-only" :icon="navigate"></ion-icon>
          </ion-button>
          <ion-label>Icon only Buttons</ion-label>
          <ion-button slot="end">
            <ion-icon slot="icon-only" :icon="star"></ion-icon>
          </ion-button>
        </ion-item>
      
        <ion-item>
          <ion-label>Button Sizes</ion-label>
          <ion-button slot="end" size="small"> Small </ion-button>
          <ion-button slot="end" size="default"> Default </ion-button>
          <ion-button slot="end" size="large"> Large </ion-button>
        </ion-item>
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
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { home, navigate, star } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-item>
    <ion-button slot="start"> Start </ion-button>
    <ion-label>Default Buttons</ion-label>
    <ion-button slot="end"> End </ion-button>
  </ion-item>

  <ion-item>
    <ion-button slot="start">
      Start
      <ion-icon :icon="home" slot="end"></ion-icon>
    </ion-button>
    <ion-label>Buttons with Icons</ion-label>
    <ion-button slot="end">
      <ion-icon :icon="star" slot="end"></ion-icon>
      End
    </ion-button>
  </ion-item>

  <ion-item>
    <ion-button slot="start">
      <ion-icon slot="icon-only" :icon="navigate"></ion-icon>
    </ion-button>
    <ion-label>Icon only Buttons</ion-label>
    <ion-button slot="end">
      <ion-icon slot="icon-only" :icon="star"></ion-icon>
    </ion-button>
  </ion-item>

  <ion-item>
    <ion-label>Button Sizes</ion-label>
    <ion-button slot="end" size="small"> Small </ion-button>
    <ion-button slot="end" size="default"> Default </ion-button>
    <ion-button slot="end" size="large"> Large </ion-button>
  </ion-item>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/vue';
  import { home, navigate, star } from 'ionicons/icons';
<\/script>`;

</script>
