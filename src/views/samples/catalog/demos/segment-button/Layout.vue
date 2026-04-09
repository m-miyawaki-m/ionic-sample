<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Segment Button / Layout</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">layout プロパティでアイコンとラベルの配置（icon-top / icon-bottom など）を変更する例。</p>
      <ion-segment value="heart">
          <ion-segment-button value="call">
            <ion-icon :icon="call"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="heart">
            <ion-icon :icon="heart"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="pin">
            <ion-icon :icon="pin"></ion-icon>
          </ion-segment-button>
        </ion-segment>
      
        <ion-segment value="heart">
          <ion-segment-button value="call">
            <ion-label>Call</ion-label>
            <ion-icon :icon="call"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="heart">
            <ion-label>Heart</ion-label>
            <ion-icon :icon="heart"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="pin">
            <ion-label>Pin</ion-label>
            <ion-icon :icon="pin"></ion-icon>
          </ion-segment-button>
        </ion-segment>
      
        <ion-segment value="heart">
          <ion-segment-button value="call" layout="icon-bottom">
            <ion-label>Call</ion-label>
            <ion-icon :icon="call"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="heart" layout="icon-bottom">
            <ion-label>Heart</ion-label>
            <ion-icon :icon="heart"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="pin" layout="icon-bottom">
            <ion-label>Pin</ion-label>
            <ion-icon :icon="pin"></ion-icon>
          </ion-segment-button>
        </ion-segment>
      
        <ion-segment value="heart">
          <ion-segment-button value="call" layout="icon-start">
            <ion-label>Call</ion-label>
            <ion-icon :icon="call"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="heart" layout="icon-start">
            <ion-label>Heart</ion-label>
            <ion-icon :icon="heart"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="pin" layout="icon-start">
            <ion-label>Pin</ion-label>
            <ion-icon :icon="pin"></ion-icon>
          </ion-segment-button>
        </ion-segment>
      
        <ion-segment value="heart">
          <ion-segment-button value="call" layout="icon-end">
            <ion-label>Call</ion-label>
            <ion-icon :icon="call"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="heart" layout="icon-end">
            <ion-label>Heart</ion-label>
            <ion-icon :icon="heart"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="pin" layout="icon-end">
            <ion-label>Pin</ion-label>
            <ion-icon :icon="pin"></ion-icon>
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
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { call, heart, pin } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-segment value="heart">
    <ion-segment-button value="call">
      <ion-icon :icon="call"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="heart">
      <ion-icon :icon="heart"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="pin">
      <ion-icon :icon="pin"></ion-icon>
    </ion-segment-button>
  </ion-segment>

  <ion-segment value="heart">
    <ion-segment-button value="call">
      <ion-label>Call</ion-label>
      <ion-icon :icon="call"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="heart">
      <ion-label>Heart</ion-label>
      <ion-icon :icon="heart"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="pin">
      <ion-label>Pin</ion-label>
      <ion-icon :icon="pin"></ion-icon>
    </ion-segment-button>
  </ion-segment>

  <ion-segment value="heart">
    <ion-segment-button value="call" layout="icon-bottom">
      <ion-label>Call</ion-label>
      <ion-icon :icon="call"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="heart" layout="icon-bottom">
      <ion-label>Heart</ion-label>
      <ion-icon :icon="heart"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="pin" layout="icon-bottom">
      <ion-label>Pin</ion-label>
      <ion-icon :icon="pin"></ion-icon>
    </ion-segment-button>
  </ion-segment>

  <ion-segment value="heart">
    <ion-segment-button value="call" layout="icon-start">
      <ion-label>Call</ion-label>
      <ion-icon :icon="call"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="heart" layout="icon-start">
      <ion-label>Heart</ion-label>
      <ion-icon :icon="heart"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="pin" layout="icon-start">
      <ion-label>Pin</ion-label>
      <ion-icon :icon="pin"></ion-icon>
    </ion-segment-button>
  </ion-segment>

  <ion-segment value="heart">
    <ion-segment-button value="call" layout="icon-end">
      <ion-label>Call</ion-label>
      <ion-icon :icon="call"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="heart" layout="icon-end">
      <ion-label>Heart</ion-label>
      <ion-icon :icon="heart"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="pin" layout="icon-end">
      <ion-label>Pin</ion-label>
      <ion-icon :icon="pin"></ion-icon>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonIcon, IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
  import { call, heart, pin } from 'ionicons/icons';
<\/script>`;

</script>
