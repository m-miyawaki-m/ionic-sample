<template>
  <ion-page>
    <ion-header><ion-toolbar>
      <ion-buttons slot="start"><ion-menu-button /></ion-buttons>
      <ion-title>Segment / Swipeable</ion-title>
    </ion-toolbar></ion-header>
    <ion-content class="ion-padding">
      <p style="color:var(--ion-color-medium);font-size:14px;margin:0 0 16px">セグメントをスワイプ操作で切り替える例。swipeGesture プロパティの利用。</p>
      <ion-segment>
          <ion-segment-button value="first" content-id="first">
            <ion-label>First</ion-label>
          </ion-segment-button>
          <ion-segment-button value="second" content-id="second">
            <ion-label>Second</ion-label>
          </ion-segment-button>
          <ion-segment-button value="third" content-id="third">
            <ion-label>Third</ion-label>
          </ion-segment-button>
        </ion-segment>
        <ion-segment-view>
          <ion-segment-content id="first">First</ion-segment-content>
          <ion-segment-content id="second">Second</ion-segment-content>
          <ion-segment-content id="third">Third</ion-segment-content>
        </ion-segment-view>
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
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
 } from '@ionic/vue';

const sourceCode = `<template>
  <ion-segment>
    <ion-segment-button value="first" content-id="first">
      <ion-label>First</ion-label>
    </ion-segment-button>
    <ion-segment-button value="second" content-id="second">
      <ion-label>Second</ion-label>
    </ion-segment-button>
    <ion-segment-button value="third" content-id="third">
      <ion-label>Third</ion-label>
    </ion-segment-button>
  </ion-segment>
  <ion-segment-view>
    <ion-segment-content id="first">First</ion-segment-content>
    <ion-segment-content id="second">Second</ion-segment-content>
    <ion-segment-content id="third">Third</ion-segment-content>
  </ion-segment-view>
</template>

<style>
  ion-segment-view {
    height: 150px;
  }

  ion-segment-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ion-segment-content:nth-of-type(1) {
    background: lightpink;
  }
  ion-segment-content:nth-of-type(2) {
    background: lightblue;
  }
  ion-segment-content:nth-of-type(3) {
    background: lightgreen;
  }
</style>

<script setup lang="ts">
// @ts-nocheck
  import { IonLabel, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView } from '@ionic/vue';
<\/script>`;

</script>

<style>
  ion-segment-view {
    height: 150px;
  }

  ion-segment-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ion-segment-content:nth-of-type(1) {
    background: lightpink;
  }
  ion-segment-content:nth-of-type(2) {
    background: lightblue;
  }
  ion-segment-content:nth-of-type(3) {
    background: lightgreen;
  }
</style>
