<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Segment Button / Basic</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">セグメントボタン（ion-segment-button）の基本的な使い方。タブ切り替え UI を確認できる。</p>
      <ion-segment value="buttons">
          <ion-segment-button value="default">
            <ion-label>Default</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
          <ion-segment-button value="buttons">
            <ion-label>Button</ion-label>
          </ion-segment-button>
        </ion-segment>
      
        <ion-segment value="buttons">
          <ion-segment-button value="disabled" :disabled="true">
            <ion-label>Disabled</ion-label>
          </ion-segment-button>
          <ion-segment-button value="segment">
            <ion-label>Segment</ion-label>
          </ion-segment-button>
          <ion-segment-button value="buttons">
            <ion-label>Button</ion-label>
          </ion-segment-button>
        </ion-segment>
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
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-segment value="buttons">
    <ion-segment-button value="default">
      <ion-label>Default</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
    <ion-segment-button value="buttons">
      <ion-label>Button</ion-label>
    </ion-segment-button>
  </ion-segment>

  <ion-segment value="buttons">
    <ion-segment-button value="disabled" :disabled="true">
      <ion-label>Disabled</ion-label>
    </ion-segment-button>
    <ion-segment-button value="segment">
      <ion-label>Segment</ion-label>
    </ion-segment-button>
    <ion-segment-button value="buttons">
      <ion-label>Button</ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
<\/script>`;

</script>
