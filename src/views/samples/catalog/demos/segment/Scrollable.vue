<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Segment / Scrollable</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">scrollable プロパティで多数のセグメントを横スクロールで表示する例。</p>
      <ion-segment :scrollable="true" value="heart">
          <ion-segment-button value="home">
            <ion-icon :icon="home"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="heart">
            <ion-icon :icon="heart"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="pin">
            <ion-icon :icon="pin"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="star">
            <ion-icon :icon="star"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="call">
            <ion-icon :icon="call"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="globe">
            <ion-icon :icon="globe"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="basket">
            <ion-icon :icon="basket"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="barbell">
            <ion-icon :icon="barbell"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="trash">
            <ion-icon :icon="trash"></ion-icon>
          </ion-segment-button>
          <ion-segment-button value="person">
            <ion-icon :icon="person"></ion-icon>
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
  IonMenuButton,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';
  import { home, heart, pin, star, call, globe, basket, barbell, trash, person } from 'ionicons/icons';

const sourceCode = `<template>
  <ion-segment :scrollable="true" value="heart">
    <ion-segment-button value="home">
      <ion-icon :icon="home"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="heart">
      <ion-icon :icon="heart"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="pin">
      <ion-icon :icon="pin"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="star">
      <ion-icon :icon="star"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="call">
      <ion-icon :icon="call"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="globe">
      <ion-icon :icon="globe"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="basket">
      <ion-icon :icon="basket"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="barbell">
      <ion-icon :icon="barbell"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="trash">
      <ion-icon :icon="trash"></ion-icon>
    </ion-segment-button>
    <ion-segment-button value="person">
      <ion-icon :icon="person"></ion-icon>
    </ion-segment-button>
  </ion-segment>
</template>

<script setup lang="ts">
// @ts-nocheck
  import { IonIcon, IonSegment, IonSegmentButton } from '@ionic/vue';
  import { home, heart, pin, star, call, globe, basket, barbell, trash, person } from 'ionicons/icons';
<\/script>`;

</script>
