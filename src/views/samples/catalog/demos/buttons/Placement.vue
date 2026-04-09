<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Buttons / Placement</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">start / end / secondary などのスロットを使って ion-buttons の配置を変える例。</p>
      <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button>Start</ion-button>
          </ion-buttons>
          <ion-title>Buttons</ion-title>
          <ion-buttons slot="end">
            <ion-button>End</ion-button>
          </ion-buttons>
        </ion-toolbar>
      
        <ion-toolbar>
          <ion-buttons slot="secondary">
            <ion-button>Secondary</ion-button>
          </ion-buttons>
          <ion-title>Buttons</ion-title>
          <ion-buttons slot="primary">
            <ion-button>Primary</ion-button>
          </ion-buttons>
        </ion-toolbar>
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
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button>Start</ion-button>
    </ion-buttons>
    <ion-title>Buttons</ion-title>
    <ion-buttons slot="end">
      <ion-button>End</ion-button>
    </ion-buttons>
  </ion-toolbar>

  <ion-toolbar>
    <ion-buttons slot="secondary">
      <ion-button>Secondary</ion-button>
    </ion-buttons>
    <ion-title>Buttons</ion-title>
    <ion-buttons slot="primary">
      <ion-button>Primary</ion-button>
    </ion-buttons>
  </ion-toolbar>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonButton, IonButtons, IonTitle, IonToolbar } from '@ionic/vue';
<\/script>`;

</script>
